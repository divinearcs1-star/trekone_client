import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  /* ==========================
      TREKS
  ========================== */
  events: any[] = [];
  filteredEvents: any[] = [];
  searchText = '';
  intervalId: any;
  days = 0;
  hours = 0;
  minutes = 0;
  treksCompleted = 0;
  happyTrekkers = 0;
  destinations = 0;
  customerRating = 0;
  currentIndex = 0;
  visibleCount = 4; // 4 images visible
  intervalId1: any;
  constructor(private service: EventService, private router: Router) {
  }
  ngOnInit(): void {
    this.loadEvents();
    this.startCounters();
    this.startAutoScroll();
  }
  ngOnDestroy() {
    clearInterval(this.intervalId);
    clearInterval(this.intervalId1);
  }
  /* ==========================
      LOAD EVENTS
  ========================== */
  loadEvents(): void {
    this.service.getEvents().subscribe({
      next: (data: any) => {
        console.log('Events => ', data);
        this.events = data || [];
        this.filteredEvents = [...this.events];
        this.startCountdown();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  /* ==========================
      SEARCH TREK
  ========================== */
  filterTreks(): void {
    const search =
      this.searchText.trim().toLowerCase();
    if (!search) {
      this.filteredEvents = [...this.events];
      return;
    }
    this.filteredEvents = this.events.filter((event: any) =>
      event.eventname?.toLowerCase().includes(search));
  }
  // to clear search box
  clearSearch(): void {
    this.searchText = '';
    this.filteredEvents = [...this.events];
  }
  openTrek(trek: any): void {
    this.searchText = '';
    this.filteredEvents = [...this.events];
    this.router.navigate([
      '/trek-details',
      trek.eventname
    ]);
  }
  exploreTreks(inputvalue: string): void {
    switch (inputvalue) {
      case "Monsoon":
        this.searchText = 'Monsoon';
        break;
      case "Night":
        this.searchText = 'Night';
        break;
      case "Family":
        this.searchText = 'Family';
        break;
      case "Camping":
        this.searchText = 'Camping';
        break;
      case "blank":
        this.searchText = '';
        break;
      default:
        this.searchText = '';
    }
    this.router.navigate(
      ['/search-treks'],
      {
        queryParams: { search: this.searchText }
      }
    );
  }
  startCountdown() {
    console.log(new Date(this.events[0].eventdate));
    if (this.events.length) {
      const trekDate = new Date(this.events[0].eventdate);
      this.intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = trekDate.getTime() - now;
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      }, 1000);
    }
  }
  /* ==========================
      REVIEWS
  ========================== */
  reviews = [
    {
      name: 'Rahul Patil',
      message: 'Amazing trek management. The guides were friendly and the entire journey was well organized.'
    },
    {
      name: 'Sneha Kulkarni',
      message: 'Loved the Kalsubai Night Trek experience. Safe, fun and unforgettable sunrise views.'
    },
    {
      name: 'Amit Jadhav',
      message: 'Perfect planning, punctual pickup and great food arrangements throughout the trek.'
    },
    {
      name: 'Pooja Deshmukh',
      message: 'My first trekking experience and TrekOne made it memorable. Highly recommended.'
    },
    {
      name: 'Vikram More',
      message: 'Professional team, beautiful locations and excellent support during the entire trek.'
    }
  ];
  /* ==========================
      GALLERY (OPTIONAL)
  ========================== */
  galleryImages = [
    '/assets/images/group/gp1.jpg',
    'assets/images/group/gp2.jpg',
    'assets/images/group/gp3.jpg',
    'assets/images/group/gp4.jpg',
    'assets/images/group/gp5.jpg',
    'assets/images/group/gp6.jpg',
    'assets/images/group/gp7.jpg',
    'assets/images/group/gp8.jpg'
  ];
  startCounters() {
    this.animateValue('treksCompleted', 150, 4);
    this.animateValue('happyTrekkers', 5000, 100);
    this.animateValue('destinations', 50, 1);
    this.animateValue('customerRating', 4.9, 0.1);
  }
  animateValue(property: string, target: number, step: number) {
    const timer = setInterval(() => {
      (this as any)[property] += step;
      if ((this as any)[property] >= target) {
        (this as any)[property] = target;
        clearInterval(timer);
      }
      if (property === 'customerRating') {
        (this as any)[property] =
          Number((this as any)[property].toFixed(1));
      }
    }, 100);
  }
  startAutoScroll() {
    this.intervalId = setInterval(() => { this.next(); }, 2500);
  }
  next() {
    // loop safely
    if (this.currentIndex < this.galleryImages.length - this.visibleCount) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
  nextt() {
    if (this.currentIndex < this.galleryImages.length - this.visibleCount) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // loop back
    }
  }
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.galleryImages.length - this.visibleCount; // go to last view
    }
  }

//   scrollTo(sectionId: string) {
//   const element = document.getElementById(sectionId);

//   if (element) {
//     element.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     });
//   }
// }
}
