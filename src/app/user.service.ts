import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  

reacvingData(data:any){

  
return this.http.post<string>("http://localhost:4700/register",data)
  

}


userLogin(data:any){

return this.http.post<string>("http://localhost:4700/login",data);

}

adminLogin(adminVerify:any){
  return this.http.post<string>("http://localhost:4700/addproducts",adminVerify);
}


idLoggedIn(){

  return !!localStorage.getItem("loggeduser")

}

getCategories(){
  return this.http.get<any[]>("http://localhost:4700/getCategories");
}


findUserName(userCheck:any){

  return this.http.get<any[]>("http://localhost:4700/registers",userCheck);

}

getMyCartItems(){

  return this.http.get<any[]>("http://localhost:4700/myCart");

}


getUserToken(){
  return localStorage.getItem("loggeduser");
}

isAdminLogin(){
 return !!localStorage.getItem("adminLogin");
}

getAdminToken(){
  return localStorage.getItem("adminLogin");
}

}
