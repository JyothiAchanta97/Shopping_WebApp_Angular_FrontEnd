import { Injectable } from '@angular/core';
import { Products } from './products.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://localhost:7174/api/Products';
    constructor(private http: HttpClient) { }

  
  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.apiUrl);
  }
 

  addProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(this.apiUrl, product);
 
  }

  editProduct(id: number, product: Products): Observable<Products> {
    console.log(id);
    console.log(product);
    return this.http.put<Products>(`${this.apiUrl}/${id}`, product);
   
  }

  deleteProduct(id: number): Observable<Products> {
    return this.http.delete<Products>(`${this.apiUrl}/${id}`); 
  }


  

 
 
}
