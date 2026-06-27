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
    images: '',
    availableSeats: '',
    totalSeats: '',
    departurefrom: '',
    trekfrom: '',
    trekroute: '',
    trektime: '',
    specialEvent: false
  };

  isEditMode = false;
  trekId = '';
  trekType = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const type = params.get('type');

      if (id && type) {
        this.isEditMode = true;
        this.trekId = id;
        this.trekType = type;

        this.adminService.getTrekById(id, type).subscribe({
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

  // saveTrek() {
  //   this.adminService.addTrek(this.trekData).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       this.router.navigate(['/admin/treks']);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  saveTrek() {

    if (this.isEditMode) {
      this.adminService.updateTrek(
        this.trekId,
        this.trekType,
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
