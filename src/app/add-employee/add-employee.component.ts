import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridAngular } from 'ag-grid-angular';
import { EmployeeService } from '../services/employee.service';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-employee',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, AgGridAngular],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  employees: any[] = [];
  isAdmin = false;
  departments = [
    { label: 'HR', value: 'HR' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Sales', value: 'Sales' }
  ];
  genderOptions = ['Male', 'Female', 'Other'];
  showModal = false;
  isEditMode = false;
  editingIndex: number | null = null;
  columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'department' },
    { field: 'salary' },
    { field: 'age' },
    { field: 'gender' },
    {
      field: 'isActive',
      valueFormatter: p => p.value ? 'Yes' : 'No'
    },
    {
      headerName: 'Actions',
      cellRenderer: () =>
        `<button class='btn btn-outline-primary btn-sm me-1'>Edit</button>
        <button class='btn btn-outline-secondary btn-sm'>View</button>`
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    editable: true,
    resizable: true
  };

  constructor(private fb: FormBuilder, private empService: EmployeeService, private auth: AuthService) { }

  async ngOnInit() {
    this.isAdmin = this.auth.getRole() === 'admin';
    this.initAddEmployeeForm();
    await this.empService.loadEmployeesFirtTime();
    this.employees = this.empService.getEmployees();
  }

  initAddEmployeeForm() {
    this.addEmployeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      age: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      department: [null, Validators.required],
      gender: ['', Validators.required],
      bio: [''],
      isActive: [false],
    });
  }

  onCellClicked(event: CellClickedEvent): void {
    const target = event.event?.target as HTMLElement;
    if (!target || !(target instanceof HTMLElement)) return;

    const action = target.innerText.trim();

    if (action === 'Edit') {
      this.openModal(event.data, event.rowIndex);
    } else if (action === 'View') {
      this.onView(event.data);
    }
  }

  openModal(emp: any = null, index: number | null = null): void {
    this.isEditMode = !!emp;
    this.editingIndex = index;

    if (emp) {
      this.addEmployeeForm.patchValue(emp);
    } else {
      this.addEmployeeForm.reset();
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.addEmployeeForm.reset();
    this.editingIndex = null;
    this.isEditMode = false;
  }

  onSubmit(): void {
    if (this.addEmployeeForm.invalid) return;
    console.log('this.addEmployeeForm.value', this.addEmployeeForm.value)
    this.addEmployeeForm.value.age = Number(this.addEmployeeForm.value.age);
    this.addEmployeeForm.value.salary = Number(this.addEmployeeForm.value.salary);
    if (this.isEditMode && this.editingIndex !== null) {
      this.employees[this.editingIndex] = {...this.addEmployeeForm.value, id: Number(this.employees.length)};
      this.employees = [...this.employees];
    } else {
      this.employees = [...this.employees, this.addEmployeeForm.value];
    }
    this.empService.updateEmployee(this.addEmployeeForm.value);
    this.closeModal();
  }

  onView(emp: any): void {
    alert(JSON.stringify(emp, null, 2));
  }
}
