import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-treks',
  templateUrl: './search-treks.component.html',
  styleUrl: './search-treks.component.css'
})
export class SearchTreksComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  searchText = '';
  originalEvents: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: EventService
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['search'] || '';
      this.loadTreks();
    });
  }
  loadTreks(): void {
    this.service.getEvents().subscribe((data: any) => {
      this.events = data;
      if (!this.searchText.trim()) {
        this.filteredEvents = [...this.events];
      } else {
        const search = this.searchText.toLowerCase();
        this.filteredEvents = this.events.filter((event: any) =>
          event.eventname?.toLowerCase().includes(search)
        );
      }
      this.events = data;
      this.originalEvents = [...data];
    });
  }
  applySearch(): void {
    const search =
      this.searchText.trim().toLowerCase();
    if (!search) {
      this.filteredEvents =
        [...this.originalEvents];
      return;
    }
    this.filteredEvents = this.originalEvents.filter(
      (event: any) =>
        event.eventname
          ?.toLowerCase()
          .includes(search)
        ||
        event.difficulty
          ?.toLowerCase()
          .includes(search)
    );
  }
}