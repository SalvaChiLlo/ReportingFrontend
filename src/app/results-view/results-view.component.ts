import { Component } from '@angular/core';
import { StateService } from '../service/state-service.service';
import { Reports } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.css']
})
export class ResultsViewComponent {

  data!: ResultViewData;

  constructor(
    private stateService: StateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data = {
      header: '',
      list: [],
      name: ''
    }

    this.stateService.changeEmitted.subscribe((data) => {
      this.data = data;
    })
    
    if (this.data.header === '') {
      this.router.navigate(['loadFiles'])
    }
  }

  selectOrderPrices() {
    this.stateService.setList('order_prices');
  }
  selectProductsCustomers() {
    this.stateService.setList('product_customers');
  }
  selectCustomersRanking() {
    this.stateService.setList('customer_ranking');
  }

  downloadReport() {
    let data = [...this.data.list]
    data.unshift(this.data.header);

    const blob = new Blob([data.join('\n').trim()], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    let fileLink = document.createElement('a')
    fileLink.href = url
    fileLink.download = this.data.name
    fileLink.click()
  }

  goBack() {
    this.router.navigate(['loadFiles'])
  }
}

export interface ResultViewData {
  header: string;
  list: string[];
  name: string;
}