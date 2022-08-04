import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private Http:HttpClient) { }

postProduct(data : any){
  return this.Http.post<any>("http://localhost:3000/productList",data)
}
getProduct(){
  return this.Http.get<any>("http://localhost:3000/productList");
}
putProduct(data:any ,id:number){
  return this.Http.put<any>("http://localhost:3000/productList/"+id,data)
}
deleteProduct(id:number){
  return this.Http.delete<any>("http://localhost:3000/productList/"+id)
}
}


