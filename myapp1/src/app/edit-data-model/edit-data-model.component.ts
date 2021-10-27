import { Component, OnInit, Injector, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as EmpAction from '../shared/actions/employee.action';
import { Store } from '@ngrx/store';
import { getEmpParams, State } from '../shared/reducers/emp.reducer';
@Component({
  selector: 'app-edit-data-model',
  templateUrl: './edit-data-model.component.html',
  styleUrls: ['./edit-data-model.component.css']
})
export class EditDataModelComponent implements OnInit {
  employeeForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'address': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'state': new FormControl('', Validators.required),
    'city': new FormControl('', Validators.required),
    'd_id': new FormControl(null, Validators.required)
  });

  local_data: any;
  dialogRef: any;
  route: any;
  found: any;
  router: any;
  params: any;
  constructor(private injector: Injector, private employeeService: UserService,private store:Store<State>) {
    this.dialogRef = this.injector.get(MatDialogRef, null);
    this.router = this.injector.get(ActivatedRoute, null);
    this.route = this.injector.get(Router, null);

  }
  ngOnInit(): void {
    this.local_data = {
      id: this.router.snapshot.params['id']

    }
    this.store.select(getEmpParams).subscribe( emp=>{      
      this.params=emp;
      
    
    });
 
    this.employeeService.getData1(this.local_data.id)
      .subscribe(data => {
        this.found = data;
        console.log(this.found);
        this.employeeForm.patchValue(this.found[0]);
        // this.employeeForm.patchValue({'d_id':this.found[0].d_id});
      }
      )
  }
  onSubmit() {
   
     {
      console.log(this.employeeForm.value)
      this.store.dispatch(EmpAction.updateEmp({
        empId:this.local_data.id,
        data:this.employeeForm.value
      }));
      // this.employeeService.updateEmployee(this.local_data.id,this.employeeForm.value).subscribe();
      this.employeeForm.reset();
      this.store.dispatch(EmpAction.LoadEmp({name:this.params.sortField,direction:this.params.sortDirection,Offset1:this.params.pageIndex,Size1:this.params.pageSize}));


      this.route.navigate(['\details']);
      // this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        // this.route.navigate(['\details']);
        // console.log("refreshed");
      // });

    }
  }
  cancelDialog() {
    if (this.route.url == "/details")
      this.dialogRef.close()
    else
      this.route.navigate(['\details'])
  }
}
