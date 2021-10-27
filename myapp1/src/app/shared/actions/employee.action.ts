import { Actions } from "@ngrx/effects";
import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const LoadEmp=createAction('[Employee] Load Data',
props<{name:any,direction:any,Offset1:any,Size1:any}>()
);





export const LoadEmpSuccess=createAction(
    '[Employee] Load Data Success',
    props<{data:any,total:any}>()

);

export const LoadEmpFailure=createAction(
    '[Employee] Load Data Failure',
    props<{error:String}>()

);

export const addEmp=createAction(
    '[Employee] Add Data',
props<{data:any}>()
);


export const addEmpSuccess=createAction(
    '[Employee] Add Employee Data Success',
    props<{empDetails:any}>()



);

export const addEmpFailure=createAction(
    '[Employee] Add Employee Data Failure',
    props<{error:String}>()

);


export const updateEmp=createAction(
    '[Employee] Update Data',
props<{empId:number,data:User}>()
);


export const updateEmpSuccess=createAction(
    '[Employee] Update Employee Data Success',
    props<{data:any}>()
);

export const updateEmpFailure=createAction(
    '[Employee] Update Employee Data Failure',
    props<{error:String}>()

);

export const deleteEmp=createAction(
    '[Employee] Delete Data',
    props<{empId:number}>()
);


export const deleteEmpSuccess=createAction(
    '[Employee] Delete Employee Data Success',
    props<{empId:any}>()
);

export const deleteEmpFailure=createAction(
    '[Employee] Delete Employee Data Failure',
    props<{error:String}>()

);

export const SortData=createAction(
    '[Employee] Sort Data',
    props<{name:any,direction:any,Offset1:any,Size1:any}>()

);

export const pageChange=createAction(
    '[Employee] Pagination',
    props<{name:any,direction:any,Offset1:any,Size1:any}>()

);
export const PageSuccess=createAction(
    '[Employee] Pagination Success',
    props<{empDetails:any}>()

);
export const SortEmpSuccess=createAction(
    '[Employee] Sort Data Success',
    props<{empDetails:any}>()

);

export const SortEmpFailure=createAction(
    '[Employee] Sort Data Failure',
    props<{error:any}>()

);

export const filterData=createAction('[Employee] Filter Data',
props<{name:any,direction:any,Offset1:any,Size1:any,filter:any}>()
);

export const FilterSuccess=createAction(
    '[Employee]  Data Success',
    props<{empDetails:any}>()

);

