import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import {Router} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddDataModelComponent } from './add-data-model/add-data-model.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { EditDataModelComponent } from './edit-data-model/edit-data-model.component';
import { UserService } from './service/user.service';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { AuthGuard } from './auth/auth.guard';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { AuthInterceptor} from './auth/auth.interceptor';
import {MatMenuModule} from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoreModule } from '@ngrx/store';
import { empReducer } from './shared/reducers/emp.reducer';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './shared/effects/employee.effects';
import { AddEmployeeEffects } from './shared/effects/addEmployee.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DeleteEmployeeEffects } from './shared/effects/deleteEmp.effects';
import { UpdateEmployeeEffects } from './shared/effects/updateEmp.effects';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    LoginComponent,
    RegisterComponent,
    AddDataModelComponent,
    EditDataModelComponent,
    DeletePopupComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatGridListModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatSortModule,
    MatMenuModule,
    NgxPaginationModule,
    StoreModule.forRoot({EmpState:empReducer}),
    // StoreModule.forFeature('EmpState',{empReducer}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([EmployeeEffects]),
    EffectsModule.forFeature([AddEmployeeEffects]),
    EffectsModule.forFeature([DeleteEmployeeEffects]),
    EffectsModule.forFeature([UpdateEmployeeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),


],


  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },UserService,AuthGuard,BnNgIdleService],
  bootstrap: [AppComponent],
  entryComponents:[AddDataModelComponent]
})
export class AppModule { }
