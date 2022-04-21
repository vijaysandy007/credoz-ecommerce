import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdserService {


  updateCart = new Subject();
  pdtName: any;

 
  private Subject = new Subject<string>();

  constructor(public https:HttpClient) { }

  getProductsLists(){

  return this.https.get<any[]>("http://localhost:4700/addproducts");

  }

  addProductsH(data:any){

    return this.https.post<string>("http://localhost:4700/addproductses", data);
  }

  getProductByCatwise(catid:number){
    return this.https.get("http://localhost:4700/getpdtcatwise/"+ catid);
  }

 
  getProductDetials(id:any){
    
    return this.https.get<any[]>("http://localhost:4700/proddetial/"+ id)

  }

  addToMyCartItems(cartPdtId:number, cartpdtPrice:number){

    return this.https.post<string>("http://localhost:4700/myCart",{cartPdtId:cartPdtId,cartpdtPrice:cartpdtPrice })
  }

  getCartCount(){
    return this.https.get<number>("http://localhost:4700/myCartCount");
  }
 
  updateMyCartItem(cartId:number, cartPdtQty:number, pdtPrice:number){
    return this.https.put<string>("http://localhost:4700/updatecart", {cartId:cartId, cartPdtQty:cartPdtQty, pdtPrice:pdtPrice});
  }

  minusupdateMyCartItem(cartId:number, cartPdtQty:number, pdtPrice:number){
    return this.https.put<string>("http://localhost:4700/minuscart", {cartId:cartId, cartPdtQty:cartPdtQty, pdtPrice:pdtPrice });
  }

  removeCartItem(cartId:number){

    return this.https.delete<string>("http://localhost:4700/removecart/"+cartId);
  }

  sendMessage(message:string){

    this.Subject.next(message)
  }

  reaceviedMessage():Observable<string>{

    return this.Subject.asObservable();
  }

  orderCount(){

    return this.https.get<number>("http://localhost:4700/orders");
  }

  customerCount(){

    return this.https.get<number>("http://localhost:4700/customer");
  }
}
