import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import * as EmpAction from '../actions/employee.action';

@Injectable()
export class EmployeeEffects {

    constructor(private actions$:Actions,private userService:UserService){}

    loadEmployee$=createEffect(()=> {
        return this.actions$.pipe(
            ofType(EmpAction.LoadEmp),
            concatMap((actions)=> this.userService.getEmployeeSortData(actions.name,actions.direction,actions.Offset1,actions.Size1).pipe(
                map((emp)=>EmpAction.LoadEmpSuccess({data:emp.data,total:emp.total})),
                catchError(error=>of(EmpAction.LoadEmpFailure({error})))
               
            ))
            
        )

    });

    sortEmployee$=createEffect(()=> {
        return this.actions$.pipe(
            ofType(EmpAction.SortData),
            concatMap((actions)=> this.userService.getEmployeeSortData(actions.name,actions.direction,actions.Offset1,actions.Size1).pipe(
                map((empDetails)=>EmpAction.LoadEmpSuccess({data:empDetails.data,total:empDetails.total})),
                catchError(error=>of(EmpAction.SortEmpFailure({error})))
               
            ))
            
        )

    });
    PageEmployee$=createEffect(()=> {
        return this.actions$.pipe(
            ofType(EmpAction.pageChange),
            concatMap((actions)=> this.userService.getEmployeeSortData(actions.name,actions.direction,actions.Offset1,actions.Size1).pipe(
                map((empDetails)=>EmpAction.LoadEmpSuccess({data:empDetails.data,total:empDetails.total})),
                catchError(error=>of(EmpAction.LoadEmpFailure({error})))
               
            ))
            
        )

    });

    FilterEmployee$=createEffect(()=> {
        return this.actions$.pipe(
            ofType(EmpAction.filterData),
            concatMap((actions)=> this.userService.getEmployeeSortData(actions.name,actions.direction,actions.Offset1,actions.Size1,actions.filter).pipe(
                map((empDetails)=>EmpAction.LoadEmpSuccess({data:empDetails.data,total:empDetails.total})),
                catchError(error=>of(EmpAction.LoadEmpFailure({error})))
               
            ))
            
        )

    });



}