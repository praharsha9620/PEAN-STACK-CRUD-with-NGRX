import { Component, OnInit, Output, EventEmitter, InjectionToken } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {MatDialogConfig,MatDialog} from '@angular/material/dialog';
import { AddDataModelComponent } from '../add-data-model/add-data-model.component';
import { EditDataModelComponent } from '../edit-data-model/edit-data-model.component';
import {ELEMENT_DATA } from '../service/mock-data';
import {signin, User} from '../models/user.model';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { Observable, of } from 'rxjs';
import { props, Store, StoreModule } from '@ngrx/store';
import {empState, getEmpCount, getEmpDetails, getEmpParams, State} from '../shared/reducers/emp.reducer';
import * as EmpActions from "../shared/actions/employee.action";
import { EmployeeEffects } from '../shared/effects/employee.effects';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [UserService]
})

export class EmployeeComponent implements AfterViewInit {
  employee:any=[];
  employee1:any=[];

  dataSource = new MatTableDataSource<User>(this.employee);
  @ViewChild(MatPaginator) paginator:any;
  @ViewChild(MatSort) sort: any;
  displayedColumns: string[] = ['name', 'address', 'email', 'state','city','department','action'];


  pageIndex: any;
  @ViewChild(PageEvent) pageEvent: any;
  pageSize: any;
  length: any;
  user: string;
  user1: User[];
  user2: User;
  userName:any
  authDetails:signin
  public pageSlice=this.employee.slice(0,2);
  sortState: boolean
  x:any
  params: any;

  constructor(private router: Router,
    private dialog:MatDialog,
    private userservice:UserService,private route:Router,private store:Store<State>,private empEffects:EmployeeEffects,private overlay: Overlay) { 
      this.sortState=true
      this.paginator = MatPaginator;
    }



    


  btnAdd() {

    let dialogRef = this.dialog.open(AddDataModelComponent, {
      panelClass: 'trend-dialog',
      autoFocus:true,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
    });
   

    
  };

  // onPageChange(event:PageEvent){
  //   console.log(PageEvent);
  //   const startIndex=event.pageIndex * event.pageSize;
  //   let endIndex=event.pageSize +startIndex;
  //   console.log(startIndex);
  //   console.log(endIndex);
    
    
  //   if(endIndex> this.employee.length){
  //     endIndex=this.employee.length;
  //   }
  //   this.pageSlice=this.employee.slice(startIndex,endIndex);
  // }


  ngOnInit(): void {
    this.store.select(getEmpParams).subscribe(emp=>{
        this.params=emp;
    });
    this.store.dispatch(EmpActions.LoadEmp({name:this.params.sortField,direction:this.params.sortDirection,Offset1:this.params.pageIndex,Size1:this.params.pageSize}));

    this.userName=this.userservice.getName();
    // this.initializeData();
    // this.getData2();

    this.store.select(getEmpDetails).subscribe( emp=>{      
      this.dataSource=new MatTableDataSource(emp);
      

});
this.store.select(getEmpParams).subscribe( emp=>{      
  this.params=emp;
  

});
this.store.select(getEmpCount).subscribe( emp=>{      
    this.length=emp;
});





 }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      

  }


  // getData2() {
  //   this.userservice.getEmployees(0, 5)
  //     .subscribe(employees => {
  //       this.dataSource = new MatTableDataSource(employees);
  //     });
  // }

  pageChanged(event: PageEvent) {
    let offset = event.pageIndex;
    let size = event.pageSize;
    this.store.dispatch(EmpActions.pageChange({name:this.params.sortField,direction:this.params.sortDirection,Offset1:offset,Size1:size}))
    // this.userservice.getEmployees(offset, size).subscribe(employees => {
    //   this.dataSource = new MatTableDataSource(employees);
    // });
    
    this.store.select(getEmpDetails).subscribe( emp=>{      
      this.dataSource=new MatTableDataSource(emp);
      

});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    // const filterData = filterValue.trim().toLowerCase();
    // this.store.dispatch(EmpActions.filterData({name:this.params.sortField,direction:this.params.sortDirection,Offset1:this.params.pageIndex,Size1:this.params.pageSize,filter:filterData}))

  }
  onLogin(){
    this.router.navigateByUrl("/Login");

  }


  
  customSort(event:any){
    this.store.dispatch(EmpActions.SortData({
      name:event.active,
      direction:event.direction,
      Offset1:this.params.pageIndex,
      Size1:this.params.pageSize

    }))

    

  //   this.userservice.sortEmployee(event.active,event.direction)
  //   .subscribe(employees => {
  //     this.dataSource = new MatTableDataSource(employees);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }

  // initializeData(){
  //   this.userservice.getData().subscribe(employees=>{
  //     this.employee=employees;
  //     this.dataSource=new MatTableDataSource(this.employee);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })

  }
  onEdit(emp: User) {
    this.userservice.Employee = emp;
    // this.userservice.changeEmp(emp);
    // console.log(this.userservice.globalData);
    this.router.navigateByUrl("/editDetails");

    // console.log(emp);

  }

  openDelete(id: any) {
    this.dialog.open(DeletePopupComponent, {
      width: '250px', data: { id: id }
    });
  }


  onLogout(){
    this.userservice.deleteToken();
     this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
   this.route.navigate(['\login']);
   console.log("refreshed");
 });
  }
}

