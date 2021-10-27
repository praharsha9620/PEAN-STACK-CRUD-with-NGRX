import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import * as EmpAction from '../actions/employee.action';

@Injectable()
export class AddEmployeeEffects {

    constructor(private actions$:Actions,private userService:UserService){}

    
    addEmployee$=createEffect(()=> {
        return this.actions$.pipe(
            ofType(EmpAction.addEmp),
            mergeMap((action)=> this.userService.postData(action.data).pipe(
                map((employee)=>EmpAction.addEmpSuccess({empDetails:employee})),
                catchError(error=>of(EmpAction.addEmpFailure({error})))
               
            ))
            
        )

    })

}