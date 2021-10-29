import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getEmpParams, State } from '../shared/reducers/emp.reducer';
import * as EmpAction from '../shared/actions/employee.action';
@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  params:any;

  constructor(public dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id:number},
    private employeeService: UserService,
    private route:Router,private store:Store<State>) { }

  ngOnInit(): void {
    this.store.select(getEmpParams).subscribe( emp=>{      
      this.params=emp;
      
    
    });
  }
  onDelete(id:number){
    this.store.dispatch(EmpAction.deleteEmp({empId: id}));
    // this.employeeService.deleteEmployee(id).subscribe();
    this.dialogRef.close()
    this.store.dispatch(EmpAction.LoadEmp({name:this.params.sortField,direction:this.params.sortDirection,Offset1:this.params.pageIndex,Size1:this.params.pageSize}));
    this.store.dispatch(EmpAction.pageChange({name:this.params.sortField,direction:this.params.sortDirection,Offset1:this.params.pageIndex,Size1:this.params.pageSize}))

    // let currentUrl = this.route.url;
    // this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        // this.route.navigate([currentUrl]);
    // });

  }

}
