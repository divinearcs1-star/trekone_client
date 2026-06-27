import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrl: './admin-bookings.component.css'
})
export class AdminBookingsComponent {

  bookings: any[] = [];
  filteredBookings: any[] = [];
  loading = true;

  searchText = '';
  statusFilter = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.adminService.getAllBookings().subscribe({
      next: (res: any) => {
        this.bookings = res;
        this.filteredBookings = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  filterBookings() {
    const search = this.searchText.trim().toLowerCase();

    this.filteredBookings = this.bookings.filter((booking) => {
      const matchesSearch =
        (booking.email || '').toLowerCase().includes(search) ||
        (booking.bookingid || '').toLowerCase().includes(search) ||
        (booking.eventname || '').toLowerCase().includes(search);

      const matchesStatus =
        !this.statusFilter ||
        booking.paymentstatus?.toLowerCase() === this.statusFilter.toLowerCase() ||
        booking.bookingstatus?.toLowerCase() === this.statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }
}