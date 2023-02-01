import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingAPIService {

  constructor(private http: HttpClient) { }

  sendFiles(customers: File | null, products: File | null, orders: File | null) {
    if (customers === null || products === null || orders === null) {
      return null;
    }
    const formData: FormData = new FormData();
    formData.append('customers', customers);
    formData.append('products', products);
    formData.append('orders', orders);
    
    return this.http.post<any>(environment.baseBackendURL + '/api/generateReports', formData);
  }
}
