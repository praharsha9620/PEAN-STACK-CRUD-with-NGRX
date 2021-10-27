import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import * as EmpAction from '../actions/employee.action';

@Injectable()
export class DeleteEmployeeEffects {

    constructor(private actions$:Actions,private userService:UserService){}

    
    deleteEmployee$=createEffect(()=> {
        return this.actions$.pipe(
            ofType(EmpAction.deleteEmp),
            concatMap((action)=> this.userService.deleteEmployee(action.empId).pipe(
                map((employee)=>EmpAction.deleteEmpSuccess({empId:employee})),
                catchError(error=>of(EmpAction.deleteEmpFailure({error:error})))
               
            ))
            
        )

    })

}