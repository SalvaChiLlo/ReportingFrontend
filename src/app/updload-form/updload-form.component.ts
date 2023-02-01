import { Component, Output } from '@angular/core';
import { ReportingAPIService } from '../reporting-api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private reportingService: ReportingAPIService, private router: Router) {
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
    console.log(this.customers, this.products, this.orders)
    this.reportingService.sendFiles(this.customers, this.products, this.orders)?.subscribe(
      (msg:any) => {

      // console.log(msg);
      
      this.router.navigate(['showReports'])
    },(error: HttpErrorResponse) => {
      console.log(error);
      this.error = true;
      this.errorMessage = error.error
    })
  }
}
