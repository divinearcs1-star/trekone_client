import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private service: EventService) {
  }

  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const eventname = this.route.snapshot.paramMap.get('eventname');
    this.service.getEvents().subscribe((data: any) => {
      this.event = data.find((x: any) => x.eventname === eventname);

      console.log('event =>', this.event);
      this.trek = this.event;
      this.trekImages = this.event.imagearray || [];
      console.log('trekImages =>', this.trekImages);
      if (this.trekImages.length > 1) {
        this.startSlider();
      }

      console.log('route eventname =>', eventname);
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

}