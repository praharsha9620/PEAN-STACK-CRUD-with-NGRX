import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  

})
export class AppComponent {
  title = 'myapp1';

  
  constructor(private router: Router,private userservice:UserService){}
  

  
  onLogin(){
    this.router.navigateByUrl("/");

  }

  onLogout(){
    this.userservice.deleteToken();
    this.router.navigate(['/login']);
    console.log("LogOut");
  }
 
}
