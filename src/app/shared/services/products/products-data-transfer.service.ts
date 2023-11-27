import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {

  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null); // cria um novo observable para receber os dados da api e enviar para o componente

  public productsDatas: Array<GetAllProductsResponse> = []; // para receber os dados da api

  setProductsData(products: Array<GetAllProductsResponse>): void { // recebe os dados da api e envia para o observable
    if(products) {
      this.productsDataEmitter$.next(products); // envia os dados para o observable 
      this.getProductsData(); // pega os dados do observable e envia para o componente

    }
    
  }
  getProductsData() { // pega os dados do observable e envia para o componente 
    this.productsDataEmitter$.pipe(
      take(1), // pega os dados apenas uma vez e encerra o observable
      map((data) => data?.filter((product)=> product.amount > 0))  // filtra os dados e envia para o componente 
    )
    .subscribe({ // envia os dados para o componente 
      next:(response) => { // se der tudo certo envia os dados para o componente 
        if(response) {
          this.productsDatas = response; // envia os dados para o componente 
        }
      },      
    });
    return this.productsDatas; // envia os dados para o componente 
  }

}
