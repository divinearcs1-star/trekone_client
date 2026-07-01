import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-premium-details',
  templateUrl: './premium-details.component.html',
  styleUrl: './premium-details.component.css'
})
export class PremiumDetailsComponent {

  event: any = {};
  trek: any;
  trekImages: string[] = [];
  currentImageIndex = 0;
  sliderInterval: any;

  selectedBatch: any;
  sortedEvent: any;

  constructor(private route: ActivatedRoute, private service: EventService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const eventId = this.route.snapshot.paramMap.get('id');
    this.service.getEvents().subscribe((data: any) => {
      this.event = data.find((x: any) => x._id === eventId);

       console.log('event =>', this.event);
      this.trek = this.event;
      this.trekImages = this.event.images || [];
      // console.log('trekImages =>', this.trekImages);
      if (this.trekImages.length > 1) {
        this.startSlider();
      }
      this.sortedEvent = this.filterAndSortBatches(this.event);
      if (this.event.batches.length > 0) {
        this.selectedBatch = this.event.batches[0];
      }
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

  filterAndSortBatches(event: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    event.batches = event.batches
      .filter((batch: any) => {
        return new Date(batch.eventDate) >= today;
      })
      .sort((a: any, b: any) => {
        return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
      });
    return event;
  }

  booknow() {
    console.log("Inside booknow");
    console.log("selectedBatch: ", this.selectedBatch?.fees)
    console.log("selectedBatch: ", this.selectedBatch?.eventDate)
    console.log("selectedBatch: ", this.selectedBatch?.batchId)
    if (!this.sortedEvent?.batches?.length) {
      console.log("No Upcoming Dates'");
      this.toastr.error("No Upcoming Dates");
    } else {
      this.toastr.success("Bookings are Open");
      this.router.navigate([
        '/admission', this.event.eventName, this.event._id, this.selectedBatch?.fees, this.selectedBatch?.eventDate, this.selectedBatch?.batchId, this.event.pickupLocation.join(',')
      ]);
    }
  }
}
