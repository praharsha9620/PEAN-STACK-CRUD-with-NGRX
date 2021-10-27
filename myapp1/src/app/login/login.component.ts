import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { identity } from 'rxjs';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result: any;
  constructor(private userService: UserService,private router : Router) { }

  btnClick() {
        this.router.navigateByUrl('/details');
  };
  model ={
    username :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  serverErr:any
  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/details');
  }
  onLogin(){
    this.router.navigateByUrl("/");

  }

  onSubmit(form : NgForm){
    console.log(form.value);
    // var token=this.userService.login(form.value);
    
    
    this.userService.login(form.value).subscribe(
      res => {   
        this.result=res;   
          this.userService.setTimer(this.result['expires']);
          this.userService.setToken(this.result['token']);
          this.router.navigateByUrl('/details')
        

      },
      err => {
        this.serverErr=err['error']
        this.serverErrorMessages = this.serverErr['error'];
        console.log(this.serverErr['error']);
        
      }
    );

  }

}
