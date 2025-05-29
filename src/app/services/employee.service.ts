import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private key = 'employees';
  private dataUrl = 'assets/employees.json';
  constructor(private http: HttpClient) {}

  async loadEmployeesFirtTime() {
    if (!localStorage.getItem(this.key)){
      const employees = await firstValueFrom(this.http.get<any[]>(this.dataUrl));
      if (employees.length){
        localStorage.setItem(this.key, JSON.stringify(employees));
      }
    }
  }

  getEmployees(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  updateEmployee(empUpdated: any): void {
    const employees = this.getEmployees().map(emp=>emp.id === empUpdated.id ? empUpdated : emp );
    localStorage.setItem(this.key, JSON.stringify(employees));
  }
}
