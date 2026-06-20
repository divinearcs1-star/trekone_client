import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trek-details',
  templateUrl: './trek-details.component.html',
  styleUrl: './trek-details.component.css'
})
export class TrekDetailsComponent implements OnInit {

  event: any = {};
  trek: any;
  trekImages: string[] = [];
  currentImageIndex = 0;
  sliderInterval: any;
  availabledates: any = {};
  validDates: string[] = [];

  constructor(private route: ActivatedRoute, private service: EventService, private router: Router,private toastr: ToastrService) {
  }

  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const eventname = this.route.snapshot.paramMap.get('eventname');
    this.service.getEvents().subscribe((data: any) => {
      this.event = data.find((x: any) => x.eventname === eventname);

      // console.log('event =>', this.event);
      this.trek = this.event;
      this.trekImages = this.event.imagearray || [];
      // console.log('trekImages =>', this.trekImages);
      if (this.trekImages.length > 1) {
        this.startSlider();
      }

      this.validDates = this.getValidSortedDates(this.event.eventdate);
      // console.log(this.validDates);
    });
  }

  ngOnDestroy(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  startSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.trekImages.length;
    }, 5000);
  }

  getValidSortedDates(dates: string[]): string[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const validDates = dates
      .filter(date => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d >= today;
      })
      .sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });
    return validDates.length > 0 ? validDates : ['Not available'];
  }

  booknow() {
    console.log("Inside booknow");
    if (this.validDates[0] === 'Not available') {
      console.log("No Upcoming Dates'");
      this.toastr.error("No Upcoming Dates");
    } else { 
      this.toastr.success("Bookings are Open");
      this.router.navigate([
        '/admission', this.event.eventname, this.event.fees, this.validDates.join(','), this.event.picklocation.join(',')
      ]);
    }
  }
}