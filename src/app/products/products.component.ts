import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
 a = "Satya"
 products: Products[] = [];
 

 newProduct: Products = { 
  id: 0,
  sku: '',
  name: '',
  description: '',
  price: 0,
  isAvailable: false,
  categoryId: 0
};

ProductToEdit: Products = { 
  id: 0,
  sku: '',
  name: '',
  description: '',
  price: 0,
  isAvailable: false,
  categoryId: 0
};

 ShowAllProducts = true;
 ShowAvailProducts = false;
 showAddProductForm = false;
 isEditModalOpen = false;

 constructor (private productsService:ProductsService){

 }
 ngOnInit():void{
 this.productsService.getProducts().subscribe((data)=>{
this.products=data;
});
}
addNewProduct(){
  this.productsService.addProduct(this.newProduct).subscribe((data)=>{
    this.products.push(data);
    this.newProduct = { id: 0, sku: '', name: '', description: '', price: 0, isAvailable: false, categoryId: 0 };
    alert('Product added successfully');
    this.showAddProductForm = false;
    });
}
openEditModal(product: Products): void {
  this.ProductToEdit = product;
  this.isEditModalOpen = true; 
  this.showAddProductForm= false;
}

updateProduct(){
  
  this.productsService.editProduct(this.ProductToEdit.id, this.ProductToEdit).subscribe((data)=>{
    const index = this.products.findIndex(p => p.id === this.ProductToEdit.id);
    if(index != -1){
      this.products[index]=data;
        }
  });
  alert('Product updated successfully');
  this.isEditModalOpen = false; 
}

deleteOneProduct(id: number): void {
  this.productsService.deleteProduct(id).subscribe(() => {
    this.products = this.products.filter(p => p.id !== id);
  }
);
alert('Product deleted successfully');
}


ShowProducts(){
  this.ShowAvailProducts = false;
  this.ShowAllProducts = true;
  this.showAddProductForm = false;
}
ShowAvailableProducts(){
  this.ShowAvailProducts = true;
  this.ShowAllProducts = false;
  this.showAddProductForm = false;
}
toggleAddProductForm() {
  this.showAddProductForm = !this.showAddProductForm;
}

}




