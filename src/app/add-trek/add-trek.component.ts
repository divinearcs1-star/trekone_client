import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-trek',
  templateUrl: './add-trek.component.html',
  styleUrl: './add-trek.component.css'
})
export class AddTrekComponent {

  trekData = {
    eventname: '',
    description: '',
    eventdate: '',
    eventTagline: '',
    duration: '',
    fees: '',
    difficulty: '',
    altitude: '',
    guide: '',
    coverImage: '',
    availableSeats: '',
    totalSeats: '',
    departureFrom: '',
    trekFrom: '',
    trekRoute: '',
    trektime: '',
    specialEvent: false
  };

  isEditMode = false;
  trekId = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.isEditMode = true;
        this.trekId = id;

        this.adminService.getTrekById(id).subscribe({
          next: (res: any) => {
            this.trekData = res;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  saveTrek() {

    if (this.isEditMode) {
      this.adminService.updateTrek(
        this.trekId,
        this.trekData
      ).subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/admin/treks']);
        },
        error: (err) => {
          console.log(err);
        }
      });

    } else {
      this.adminService.addTrek(this.trekData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/admin/treks']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
