import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { ReportService } from '../report.service';

// import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent {

  bookings: any[] = [];
  payments: any[] = [];
  refunds: any[] = [];

  fromDate = '';
  toDate = '';
  paymentStatus = '';

  totalBookings = 0;
  totalRevenue = 0;
  totalRefunds = 0;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadReports();
  }

  // Load all reports data
  loadReports() {
    this.reportService.getBookingsReport().subscribe({
      next: (res: any) => {
        this.bookings = res;
        this.totalBookings = res.length;
        this.totalRevenue = res
          .filter((b: any) => b.paymentStatus === 'Paid')
          .reduce((sum: number, b: any) => sum + b.amount, 0);
        this.payments = res.filter((b: any) =>
          ['Paid', 'Pending', 'Refunded', 'Refund Initiated']
            .includes(b.paymentStatus)
        );
        this.refunds = res.filter((b: any) =>
          ['Refunded', 'Initiated']
            .includes(b.refundStatus)
        );
        this.totalRefunds = this.refunds.length;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Filter data
  getFilteredData(data: any[]) {
    return data.filter(item => {
      const bookingDate = new Date(item.bookingDate);
      const matchFrom = !this.fromDate || bookingDate >= new Date(this.fromDate);
      const matchTo = !this.toDate || bookingDate <= new Date(this.toDate);
      const matchPayment = !this.paymentStatus || item.paymentstatus === this.paymentStatus;
      return matchFrom && matchTo && matchPayment;
    });
  }

  // Export Excel
  exportToExcel(data: any[], fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer = XLSX.write(
      workbook,
      {
        bookType: 'xlsx',
        type: 'array'
      }
    );
    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );
    FileSaver.saveAs(fileData, `${fileName}.xlsx`);
  }

  // Export PDF
  exportToPDF(data: any[], title: string, fileName: string) {
    const doc = new jsPDF();
    doc.text(title, 14, 15);
    const tableData = data.map(item => [
      item.bookingId,
      item.customerName,
      item.eventName,
      item.amount,
      item.paymentStatus,
      item.bookingStatus,
      item.refundStatus
    ]);
    autoTable(doc, {
      head: [[
        'Booking ID',
        'Customer',
        'Trek',
        'Amount(Rs.)',
        'Payment',
        'Booking',
        'Refund'
      ]],
      body: tableData,
      startY: 25
    });

    doc.save(`${fileName}.pdf`);
  }
  // Booking exports
  exportBookingsExcel() {
    const filteredData = this.getFilteredData(this.bookings);
    this.exportToExcel(filteredData, 'bookings-report');
  }
  exportBookingsPDF() {
    const filteredData = this.getFilteredData(this.bookings);
    this.exportToPDF(
      filteredData,
      'Bookings Report',
      'bookings-report'
    );
  }
  // Payment exports
  exportPaymentsExcel() {
    const filteredData = this.getFilteredData(this.payments);
    this.exportToExcel(filteredData, 'payments-report');
  }
  exportPaymentsPDF() {
    const filteredData = this.getFilteredData(this.payments);
    this.exportToPDF(
      filteredData,
      'Payments Report',
      'payments-report'
    );
  }
  // Refund exports
  exportRefundsExcel() {
    const filteredData = this.getFilteredData(this.refunds);
    this.exportToExcel(filteredData, 'refunds-report');
  }
  exportRefundsPDF() {
    const filteredData = this.getFilteredData(this.refunds);
    this.exportToPDF(
      filteredData,
      'Refunds Report',
      'refunds-report'
    );
  }
}