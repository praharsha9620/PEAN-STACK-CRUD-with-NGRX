import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import * as EmpAction from '../actions/employee.action';

@Injectable()
export class UpdateEmployeeEffects {

    constructor(private actions$:Actions,private userService:UserService){}

    
    updateEmployee$=createEffect(()=> {
        return this.actions$.pipe(
            ofType(EmpAction.updateEmp),
            concatMap((action)=> this.userService.updateEmployee(action.empId,action.data).pipe(
                map((employee)=>EmpAction.updateEmpSuccess({data:employee})),
                catchError(error=>of(EmpAction.updateEmpFailure({error:error})))
               
            ))
            
        )

    })

}