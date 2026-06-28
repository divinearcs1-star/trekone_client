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
  seatForm = {
    totalSeats: 0
  };

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadTreks();
  }

  loadTreks() {
    this.adminService.getTreks().subscribe({
      next: (res: any) => {
        this.treks = res;
        console.log(this.treks);
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
      next: (res: any) => {
        console.log(res);

        this.treks = this.treks.filter(
          trek => !(trek._id === id)
        );
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editSeats(trek: any) {
    this.selectedTrek = trek;
    this.seatForm.totalSeats = trek.totalSeats;
  }

  closeSeatModal() {
    this.selectedTrek = null;
  }

  saveSeats() {
    this.adminService.updateSeats(
      this.selectedTrek._id,
      this.seatForm
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
}
