import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit {

  public productsList: Array<GetAllProductsResponse> = []; // Lista de produtos

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
      .subscribe({
        next: (response) => { // se der tudo certo retorna a lista de produtos
         if(response.length > 0){
          this.productsList   = response; // armazena a lista de produtos na variável productsList
          this.productsDtrService.setProductsData(this.productsList);  // envia os dados para o serviço de transferência         
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

}


