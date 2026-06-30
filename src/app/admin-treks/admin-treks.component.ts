import { Component } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-treks',
  templateUrl: './admin-treks.component.html',
  styleUrl: './admin-treks.component.css'
})
export class AdminTreksComponent {

  treks: any[] = [];
  loading = true;

  selectedTrek: any = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadTreks();
  }

  loadTreks() {
    this.adminService.getTreks().subscribe({
      next: (res: any) => {
        this.treks = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  deleteTrek(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete this trek?');

    if (!confirmDelete) return;

    this.adminService.deleteTrek(id).subscribe({
      next: () => {
        this.treks = this.treks.filter(
          trek => trek._id !== id
        );
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editSeats(trek: any) {
    this.selectedTrek = JSON.parse(JSON.stringify(trek));
  }

  closeSeatModal() {
    this.selectedTrek = null;
  }

  saveSeats() {
    for (let batch of this.selectedTrek.batches) {
      if (batch.availableSeats > batch.totalSeats) {
        alert(`${batch.batchId}: Available seats cannot exceed total seats`);
        return;
      }

      if (batch.availableSeats < 0 || batch.totalSeats < 0) {
        alert(`${batch.batchId}: Seats cannot be negative`);
        return;
      }
    }
    this.adminService.updateTrek(
      this.selectedTrek._id,
      this.selectedTrek
    ).subscribe({
      next: () => {
        this.loadTreks();
        this.closeSeatModal();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getTotalSeats(trek: any) {
    return trek.batches.reduce(
      (sum: number, batch: any) => sum + batch.totalSeats,
      0
    );
  }

  getAvailableSeats(trek: any) {
    return trek.batches.reduce(
      (sum: number, batch: any) => sum + batch.availableSeats,
      0
    );
  }

  getBookedSeats(trek: any) {
    return this.getTotalSeats(trek) - this.getAvailableSeats(trek);
  }
}