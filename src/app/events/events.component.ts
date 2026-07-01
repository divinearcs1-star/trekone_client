import { Component } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: any = []
  allevents: any = []
  loading = true;

  constructor(private eventservice: EventService) {
  }
  ngOnInit() {
    this.eventservice.getFilterByDateEvents().subscribe(
      res => {
        this.events = res
        this.allevents = this.events
        // console.log("aray" , this.allevents[0].eventDate)
        this.loading = false;
      },
      err => (console.log(err))
    );
  }

}
