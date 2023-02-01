import { Component, EventEmitter, Output } from '@angular/core';
import { ReportingAPIService } from '../service/reporting-api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Reports } from '../models/models';
import { StateService } from '../service/state-service.service';

@Component({
  selector: 'app-updload-form',
  templateUrl: './updload-form.component.html',
  styleUrls: ['./updload-form.component.css']
})
export class UpdloadFormComponent {
  customers: File | null = null;
  products: File | null = null;
  orders: File | null = null;
  error: boolean = false;
  errorMessage: string = '';

  constructor(
    private reportingService: ReportingAPIService,
    private stateService: StateService,
    private router: Router
    ) {
    this.customers = null;
    this.products = null;
    this.orders = null;
  }

  onFileSelectedCustomers(event: any) {
    if (event.target.files.length > 0) {
      this.customers = event.target.files.item(0);
    } else {
      this.customers = null;
    }
  }

  onFileSelectedProducts(event: any) {
    if (event.target.files.length > 0) {
      this.products = event.target.files.item(0);
    } else {
      this.products = null;
    }
  }

  onFileSelectedOrders(event: any) {
    if (event.target.files.length > 0) {
      this.orders = event.target.files.item(0);
    } else {
      this.orders = null;
    }
  }

  submit() {
    this.reportingService.sendFiles(this.customers, this.products, this.orders)?.subscribe({
      next: (msg: any) => {
        this.stateService.addReports(msg)

        this.router.navigate(['showReports'])
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.error = true;
        if (error.error instanceof ProgressEvent) {
          this.errorMessage = error.name
        } else {
          this.errorMessage = error.error
        }
      }})
  }
}
