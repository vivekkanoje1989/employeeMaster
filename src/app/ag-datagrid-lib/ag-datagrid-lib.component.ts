import { Component, OnInit } from '@angular/core';
import { DynamicGridComponent } from 'dynamic-grid';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-ag-datagrid-lib',
  standalone: true,
  imports: [DynamicGridComponent],
  templateUrl: './ag-datagrid-lib.component.html',
  styleUrl: './ag-datagrid-lib.component.scss'
})
export class AgDatagridLibComponent implements OnInit {
  employees: any[] = [];
  gridConfig = {
    columns: [
      {
        headerName: 'Name',
        field: 'name',
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
      },
      {
        headerName: 'Department',
        field: 'department',
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
      },
      {
        headerName: 'Salary',
        field: 'salary',
        sortable: true,
        filter: true,
        editable: true,
        resizable: true
      },
      { field: 'age' },
      { field: 'gender' },
      {
        field: 'isActive',
        valueFormatter: (p:any) => p.value ? 'Yes' : 'No'
      }
    ],
    pagination: true,
    isFullscreen: false // to make grid fullscreen
  };

  constructor(private empService: EmployeeService) { }

  async ngOnInit() {
    await this.empService.loadEmployeesFirtTime();
    this.employees = this.empService.getEmployees();
    console.log('To make grid fullscreen make isFullscreen=true');
  }

  getCellChangedData(e: any) {
    console.log('getCellChangedData: e:', e);
    this.empService.updateEmployee(e);
  }

}
