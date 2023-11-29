import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  
  private destroy$ = new Subject<void>();
  public productsList: Array<GetAllProductsResponse> = []; // Lista de produtos

  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private productsDtrService: ProductsDataTransferService
  ) { }
  ngOnInit(): void {
    this.getProductsDatas(); // chama o método para buscar todos os produtos
  }
  getProductsDatas(): void { // Busca todos os produtos e armazena na variável productsList
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => { // se der tudo certo retorna a lista de produtos
         if(response.length > 0){
          this.productsList   = response; // armazena a lista de produtos na variável productsList
          //console.log(this.productsList);
          this.productsDtrService.setProductsData(this.productsList);  // envia os dados para o serviço de transferência         
          this.setProductsChartConfig();
        }         
        },
        error: (error) => { // se der erro retorna o erro
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar os produtos',
            life: 2500,
          })          
        }
      });    
  }

  // Método para gerar o gráfico de barras

  setProductsChartConfig(): void {   
    if(this.productsList.length > 0){
    const documentStyle = getComputedStyle(document.documentElement); 
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.productsChartDatas = {
      labels: this.productsList.map((element) => element.name),
      datasets: [
        {
          label: 'Quantidade',
          data: this.productsList.map((element) => element.amount),
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          borderWidth: 2,
        },
      ],      
    };
    this.productsChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: '500',              
            },
          }, 
          grid: {
            color: surfaceBorder,            
          }        
          },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        },     
    };
  }
}
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


