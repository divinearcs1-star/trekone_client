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
        // this.allevents = this.events.map(
        //   (event: any) => ({
        //     ...event,
        //     eventdate: event.eventdate.sort(
        //       (a: string, b: string) =>
        //         new Date(a).getTime() - new Date(b).getTime()
        //     )
        //   })
        // );
        const today = new Date().toISOString().split('T')[0];
        this.allevents = this.events.map((event: any) => ({
          ...event,
          eventdate: event.eventdate
            .filter((date: string) => date >= today)
            .sort(
              (a: string, b: string) =>
                new Date(a).getTime() - new Date(b).getTime()
            )
        }));
        // console.log("aray" , this.allevents[0].eventdate)
        this.loading = false;
      },
      err => (console.log(err))
    );
  }

}
