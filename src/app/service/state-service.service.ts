import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Reports } from '../models/models';
import { ResultViewData } from '../results-view/results-view.component';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  header: string = '';
  currentList: string[] = [];
  currentReportName: string = '';
  private reports!: Reports;
  private orderPrices: string[] = [];
  private productCustomers: string[] = [];
  private customersRanking: string[] = [];

  private emitChangeSource = new ReplaySubject<ResultViewData>();
  changeEmitted = this.emitChangeSource.asObservable();

  private emitChange() {
    this.emitChangeSource.next({header: this.header, list: this.currentList, name: this.currentReportName});
  }

  addReports(reports: Reports) {
    this.reports = reports
    this.setList('order_prices')
  }

  setList(reportName: string) {
    if (reportName === 'order_prices') {
      this.currentList = this.reports.orderPrices.trim().split('\n')
    } else if (reportName === 'product_customers') {
      this.currentList = this.reports.productCustomers.trim().split('\n')
    } else if (reportName === 'customer_ranking') {
      this.currentList = this.reports.customersRanking.trim().split('\n')
    }

    this.header = this.currentList[0]
    this.currentList = [...this.currentList.splice(1)]
    this.currentReportName = reportName

    this.emitChange()
  }
}