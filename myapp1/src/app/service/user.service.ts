import { Injectable } from '@angular/core';
import {ELEMENT_DATA} from './mock-data';
import { User,Login, signin } from '../models/user.model';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap} from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class UserService {
    x:any;
    selectedUser: Login = {
      name: '',
      email: '',
      password: ''
    }

    Employee: User = {
      id:0,
      name: '',
      address: '',
      email: '',
      state: '',
      city:'',
      d_id:0,
    }


    
    // globalData = new BehaviorSubject<User>(this.userX);
    // currentEmp=this.globalData.asObservable();
    // x:any;

  constructor(private http: HttpClient,private route:Router) {
    

   }
   

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
   REST_API='http://localhost:3000/employee';
   REST_API1='http://localhost:3000/authenticate';



  //  changeEmp(newEmp:User){
  //    this.globalData.next(newEmp);
  //  }

   httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


   getData1(id: number): Observable<User> {
    const api=`${this.REST_API}/${id}`
    return this.http.get<User>(api)
      .pipe(
        tap(data =>
        console.log((data)))
      );
  }
  getEmployee(): User[]{
    return ELEMENT_DATA;
  }
//For signup
  postUser(login: Login){
    return this.http.post(environment.apiBaseUrl+'/register',login,{ 'headers': this.httpHeaders });
  }

//for login
  login(authCredentials: signin) {
    return this.http.post(environment.apiBaseUrl1 + '/', authCredentials,this.noAuthHeader);
  }


  //get Details
  getData(){
    return this.http.get(this.REST_API + '/');
  }
  // getData1(x:any) {
  //   return this.http.get(environment.apiBaseUrl + '/x');
  // }

  updateEmployee(id:number,data: User):Observable<User> {
    console.log(data);
    return this.http.put<User>(`${this.REST_API}/${id}`, JSON.stringify(data), { 'headers': this.httpHeaders });
  }
  deleteEmployee(id: number) :Observable<User>{
    return this.http.delete<User>(`${this.REST_API}/${id}`);
  }
    //add details
  postData(user: User):Observable<User>{
    return this.http.post<User>(environment.apiBaseUrl+'/',user,this.noAuthHeader);
  }
  verifyToken(token:any){
    return this.http.get(environment.apiBaseUrl1+'/verify',token);
  }




  //edit details
  editData(user:User){
    return this.http.post(environment.apiBaseUrl+'/',user,this.noAuthHeader);

  }

  getEmployees(offset?:any, limit?:any): Observable<{data:User[],total:number}> {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    return this.http.get<{data:User[],total:number}>(`${this.REST_API}?`+params.toString());
  }


  //Helper Methods
  setTimer(time1:number){
      
      this.x=Date.now()+time1;
      // console.log(this.x);

      
  }

  setToken(token: string) {
    localStorage.setItem('token',token);
  }

  getToken() {
    // console.log(localStorage.getItem('token'));

    return localStorage.getItem('token');
    
    
  }
  getName() {
    return localStorage.getItem('uname');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    userPayload
    localStorage.setItem('uname',userPayload.username);
    
    if (userPayload)
    {        
          // return true;
        return this.x > Date.now() / 1000;
    }
    else
      return false;
  }


  sortAsc(column:string){
    console.log(column);
    
    return this.http.post('http://localhost:3000/authenticate/sortasc',column,this.noAuthHeader);
}

  sortDesc(name:any){
    console.log(name);

  }

  getEmployeeSortData(column?:any,direction?:any,offset?:any, limit?:any,filter?:any):Observable<{data:User[],total:number}>{
    let params = new HttpParams();
    params=params.set('filter',filter)
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    params = params.set('column', column);
    params = params.set('direction', direction);
    return this.http.get<{data:User[],total:number}>(`${this.REST_API}/sort?`+params.toString());
  }

}
