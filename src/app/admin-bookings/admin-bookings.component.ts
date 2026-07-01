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
        (booking.bookingId || '').toLowerCase().includes(search) ||
        (booking.eventName || '').toLowerCase().includes(search);

      const matchesStatus =
        !this.statusFilter ||
        booking.paymentStatus?.toLowerCase() === this.statusFilter.toLowerCase() ||
        booking.bookingStatus?.toLowerCase() === this.statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }
}