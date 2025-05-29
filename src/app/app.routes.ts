import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { authGuard } from './guard/auth.guard';
import { AgDatagridLibComponent } from './ag-datagrid-lib/ag-datagrid-lib.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'employee', component: EmployeesComponent, canActivate: [authGuard]
    },
    {
        path: 'lib-ag-grid', component: AgDatagridLibComponent, canActivate: [authGuard]
    },
    {
        path: 'add-employee', component: AddEmployeeComponent, canActivate: [authGuard]
    }
];
