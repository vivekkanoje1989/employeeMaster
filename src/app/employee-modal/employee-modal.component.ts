import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.scss'
})
export class EmployeeModalComponent {
  @Input() employee: any;
  @Output() close = new EventEmitter<boolean>();

  constructor(private empService: EmployeeService) {}

  save(form: NgForm): void {
    if (form.valid){
      this.empService.updateEmployee(this.employee);
      this.close.emit(true);
    }
  }

  cancel(e:boolean): void {
    this.close.emit(e);
  }
}
