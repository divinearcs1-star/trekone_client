import { Component } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrl: './special-events.component.css'
})
export class SpecialEventsComponent {

  events: any[] = [];
   allevents: any = []

  constructor(private eventService: EventService) { }

  ngOnInit(): void {

    this.eventService.getSpecialevents().subscribe(
      (data: any) => {

        // filter only premium events
        this.events = data.filter((event: any) => event.specialEvent === true
        );
        // const today = new Date().toISOString().split('T')[0];
        this.allevents = this.events;
      }
    );

  }

}
