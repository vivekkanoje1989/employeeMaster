import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, AgGridAngular, EmployeeModalComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit{
  employees: any[]=[];
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'department', headerName: 'Department' },
    { field: 'salary', headerName: 'Salary' }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  selectedEmployee: any = null;
  isAdmin = false;
  showEmpModal = false;

  constructor(private auth: AuthService , private empService: EmployeeService){
    this.isAdmin = this.auth.getRole() === 'admin';
  }

  async ngOnInit() {
    await this.empService.loadEmployeesFirtTime();
    this.employees = this.empService.getEmployees();
  }

  onSelectEmployee(e:any):void {
    this.selectedEmployee = e.data;
  }

  openModal(): void {
    if (this.selectedEmployee){
      this.showEmpModal = true;
    }
  }

  onModalClose(updated: boolean):void {
    if (updated){
      this.employees = this.empService.getEmployees();
    }
    this.showEmpModal = false;
  }

}
