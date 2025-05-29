import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgDatagridLibComponent } from './ag-datagrid-lib.component';

describe('AgDatagridLibComponent', () => {
  let component: AgDatagridLibComponent;
  let fixture: ComponentFixture<AgDatagridLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgDatagridLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgDatagridLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
