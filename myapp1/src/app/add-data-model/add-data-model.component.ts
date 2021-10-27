import { Component, Inject, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { EmployeeComponent } from '../employee/employee.component';
import { props, Store, StoreModule } from '@ngrx/store';
import {empState, getEmpDetails, getEmpParams, State} from '../shared/reducers/emp.reducer';
import * as EmpActions from "../shared/actions/employee.action";
import { EmployeeEffects } from '../shared/effects/employee.effects';
import { AddEmployeeEffects } from '../shared/effects/addEmployee.effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {MatFormFieldModule} from '@angular/material/form-field';  


@Component({
  selector: 'app-add-data-model',
  templateUrl: './add-data-model.component.html',
  styleUrls: ['./add-data-model.component.css'],


})
export class AddDataModelComponent implements OnInit {

  employeeForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'address': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'state': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'd_id': new FormControl(null, Validators.required)
  });

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  local_data: any;
  dialogRef: any;
  found: any;
  router:any;
  route:any;
  params: any;

  constructor(private injector: Injector, private employeeService: UserService, private addEmpEffect:AddEmployeeEffects, private store:Store<State>) {
    this.router = this.injector.get(ActivatedRoute, null);
    this.route = this.injector.get(Router, null);
   }
    
 

  ngOnInit(): void {
    console.log(this.route.url);
    this.store.select(getEmpParams).subscribe( emp=>{      
      this.params=emp;
      
    
    });

  }

  onSubmit() {
    console.log(this.employeeForm.value);
    // this.employeeService.postData(this.employeeForm.value).subscribe();
    this.store.dispatch(EmpActions.addEmp({data: this.employeeForm.value}));

      this.employeeForm.reset();
      this.store.dispatch(EmpActions.LoadEmp({name:this.params.sortField,direction:this.params.sortDirection,Offset1:this.params.pageIndex,Size1:this.params.pageSize}));

      // let currentUrl = this.route.url;
      // this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        // this.route.navigate([currentUrl]);
        // console.log("refreshed");
      // });
    }
  
  // reloadCurrentRoute() {
  //   let currentUrl = this.router.url;
  //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //       this.router.navigate([currentUrl]);
  //   });

  onReset(){
    this.employeeForm.reset();

  }

  
}

 
