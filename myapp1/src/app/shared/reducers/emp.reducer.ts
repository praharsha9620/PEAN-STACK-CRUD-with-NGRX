import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { UserService } from "src/app/service/user.service";
import { User } from "../../models/user.model";
import * as AppState from "../state/app.state";
import * as EmpActions from "../actions/employee.action"
import { state } from "@angular/animations";
import { Actions } from "@ngrx/effects";

export interface State extends AppState.State{
    EmpState:empState
}
export interface dataParams {
    filter: string;
    sortDirection: 'asc' | 'desc'| '';
    sortField: string;
    pageIndex: number;
    pageSize: number;
  }
  

export interface empState {
    currentEmp:any;
    empDetails: User[];
    error: String;
    total:number;
    params:dataParams;
        
    
}
export const defaultparams:dataParams={
    filter: '',
    pageIndex: 0,
    pageSize:5,
    sortDirection:'',
    sortField:''
  }
  

const initialState: empState= {
    currentEmp: null,
    empDetails: [],
    error:'',
    total:0,
    params:defaultparams,
}

export const selectEmpFeature=(state:State)=>state.EmpState;
// export const selectEmpFeature=createFeatureSelector<empState>('EmpState');
export const getEmpDetails=createSelector(
    selectEmpFeature,
    (state:empState)=>state.empDetails
);


export const getEmpParams=createSelector(
    selectEmpFeature,
    (state:empState)=>state.params
);

export const getEmpCount=createSelector(
    selectEmpFeature,
    (state:empState)=>state.total
);




export const getEmpError=createSelector(
    selectEmpFeature,
    (state:empState)=>state.error
);

export const empReducer= createReducer<empState>(
    initialState,    
    on(EmpActions.LoadEmp,(state,actions) :empState =>{
        console.log("[Employee] Loading Data");
        return {
            ...state,
            params:{...state.params,pageIndex:actions.Offset1,pageSize:actions.Size1,sortDirection:actions.direction,sortField:actions.name},


        };
    }),
    on(EmpActions.LoadEmpSuccess,(state,actions) :empState =>{
        console.log("[Employee] Load Data Success");
        console.log(actions.data.length);
        return {
            ...state,
            empDetails: actions.data,
            error:'',
            total:actions.total,

        };
        
    }),
    on(EmpActions.LoadEmpFailure,(state,action) :empState =>{
        console.log("[Employee] Load Data Failure");
        return {
            ...state,
            empDetails:[],
            error:action.error
        };
    }),   
    on(EmpActions.addEmp,(state) :empState =>{
        console.log("[Employee] Adding Data");
        return {
            ...state,
        };
    }),
    on(EmpActions.addEmpSuccess,(state,actions) :empState =>{
        console.log("[Employee] Add Data Success");
        return {
            ...state,
            empDetails:[...state.empDetails,actions.empDetails],
            currentEmp:null,
            error:'',
            total:state.empDetails.length,
            
         };
    }),
    on(EmpActions.addEmpFailure,(state,action) :empState =>{
        console.log("[Employee] Add Data Failure");
        return {
            ...state,
            error: action.error
        };
    }),

    on(EmpActions.deleteEmp,(state) :empState =>{
        console.log("[Employee] Delete Data");
        return {
            ...state,
        };
    }),
    on(EmpActions.deleteEmpSuccess,(state,action) :empState =>{
        console.log("[Employee] Delete Data Success");
        const updatedEmp=state.empDetails.filter(emp=>emp.id !=action.empId)
        return {
            ...state,
            empDetails:updatedEmp,
            currentEmp:null,
            error:'',
            total:updatedEmp.length

            
            
        };
    }),
    on(EmpActions.deleteEmpFailure,(state,action) :empState =>{
        console.log("[Employee] Delete Data Failure");
        return {
            ...state,
            currentEmp:null,
            error:action.error
            
            
        };
    }),

    on(EmpActions.updateEmp,(state) :empState =>{
        console.log("[Employee] Update Data");
        return {
            ...state,
            
        };
    }),
    on(EmpActions.updateEmpSuccess,(state,action) :empState =>{
        console.log("[Employee] Update Data Success");
        const updatedEmp=state.empDetails.map(emp=>emp.id ===action.data.id?action.data:emp)
        return {
            ...state,
            empDetails:updatedEmp,
            currentEmp:null,
            error:'',
            total:updatedEmp.length
            
            
            
        };
    }),
    on(EmpActions.updateEmpFailure,(state,action) :empState =>{
        console.log("[Employee] Update Data Failure");
        return {
            ...state,
            currentEmp:null,
            error:action.error
            
            
        };
    }),
    on(EmpActions.SortData,(state,actions) :empState =>{
        console.log("[Employee] Sort Data ");
        return {
            ...state,
            params:{...state.params,pageIndex:actions.Offset1,pageSize:actions.Size1,sortDirection:actions.direction,sortField:actions.name},
        
            
        };
    }),
    
    on(EmpActions.pageChange,(state,actions) :empState =>{
        return {
            ...state,
            params:{...state.params,pageIndex:actions.Offset1,pageSize:actions.Size1},

         
            
            
        };
    }),
    on(EmpActions.PageSuccess,(state,action) :empState =>{
        console.log("[Employee] Page Change Success");
        return {
            ...state,
            empDetails: action.empDetails,
            error:''
            
            
        };
    }),
    on(EmpActions.SortEmpSuccess,(state,action) :empState =>{
        console.log("[Employee] Sort Data Success ");
        return {
            ...state,
            empDetails: action.empDetails,
            error:''
            
            
        };
    }),
    on(EmpActions.SortEmpFailure,(state,action) :empState =>{
        console.log("[Employee] Sort Data Failure ");
        return {
            ...state,
            empDetails: [],
            error:action.error
            
            
            
        };
    }),
    on(EmpActions.filterData,(state,actions) :empState =>{
        return {
            ...state,
            params:{...state.params,pageIndex:actions.Offset1,pageSize:actions.Size1,filter:actions.filter},

         
            
            
        };
    }),
    on(EmpActions.FilterSuccess,(state,action) :empState =>{
        console.log("[Employee] Filter Success");
        return {
            ...state,
            empDetails: action.empDetails,
            error:''
            
            
        };
    }),

);