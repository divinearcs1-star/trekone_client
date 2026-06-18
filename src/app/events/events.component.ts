import { Component } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
 events : any =[]

  constructor(private eventservice : EventService){
  }
  ngOnInit(){
    this.eventservice.getEvents().subscribe(
        res => {
          this.events = res
        },
        err => (console.log(err))
      );
  }
}
