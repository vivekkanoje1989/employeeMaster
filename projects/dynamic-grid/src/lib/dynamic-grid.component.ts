import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

@Component({
  selector: 'lib-dynamic-grid',
  imports: [CommonModule, AgGridModule],
  template: `
  <div #gridContainer class="ag-theme-alpine grid-wrapper" [class.fullscreen]="isFullscreen">
      <ag-grid-angular
        [ngStyle]="{ height: '50vh', width: '100%' }"
        [rowData]="rowData"
        [columnDefs]="config?.columns"
        [defaultColDef]="defaultColDef"
        [pagination]="config?.pagination"        
        [rowSelection]="config?.rowSelection || 'single'"
        (cellValueChanged)="onCellValueChanged($event)">
      </ag-grid-angular>
  </div>
  `,
  styles: `
  .grid-wrapper {
    width: 100%;
    height: 500px;
    transition: all 0.3s ease;
  }
  .grid-wrapper.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 1050;
    background: white;
  }
`
})
export class DynamicGridComponent implements OnInit, AfterViewInit {
  @Input() config: any;
  @Input() rowData: any[] = [];
  @Output() cellValueChanged = new EventEmitter<any>();
  @ViewChild('gridContainer') gridContainer!: ElementRef;
  isFullscreen: boolean = false;

  defaultColDef = {
    sortable: true,
    filter: true,
    editable: true,
    resizable: true
  };

  constructor(private cdRef: ChangeDetectorRef){}

  ngOnInit() {
    if (!this.config) {
      console.error('Grid config is required');
    }
  }

  ngAfterViewInit(): void {
    // check for config fullscreen
    if (this.config?.isFullscreen) {
      this.toggleFullscreen();
    }
  }

  onCellValueChanged(event: any) {
    console.log('Cell Changed', event);
    this.cellValueChanged.emit(event.data);
  }

  toggleFullscreen(): void {
    const elem = this.gridContainer.nativeElement;

    if (!this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen(); // Safari
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen(); // IE11
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    this.isFullscreen = !this.isFullscreen;
    this.cdRef.detectChanges();
  }
}
