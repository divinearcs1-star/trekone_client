import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-refunds',
  templateUrl: './admin-refunds.component.html',
  styleUrl: './admin-refunds.component.css'
})
export class AdminRefundsComponent {

  refunds: any[] = [];
  loading = true;
  response:any  = []

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadRefunds();
  }

  loadRefunds() {
    this.adminService.getRefundRequests().subscribe({
      next: (res: any) => {
        this.refunds = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  approveRefund(bookid: string) {
    this.adminService.approveRefundRequests(bookid).subscribe({
      next: (res: any) => {
        this.response = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
  rejectRefund(bookid: string) {
    console.log("bookid", bookid);
    this.adminService.rejectRefundRequests(bookid).subscribe({
      next: (res: any) => {
        this.response = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}