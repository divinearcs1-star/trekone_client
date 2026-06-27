import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrl: './admin-payments.component.css'
})
export class AdminPaymentsComponent {
  payments: any[] = [];
  loading = true;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.adminService.getPayments().subscribe({
      next: (res: any) => {
        this.payments = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }
}
