import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-trek',
  templateUrl: './add-trek.component.html',
  styleUrl: './add-trek.component.css'
})
export class AddTrekComponent {


   constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  trekData: any = {
    eventname: '',
    description: '',
    eventTag: '',
    eventTagline: '',
    category: '',
    trekType: '',
    region: '',
    state: '',
    district: '',
    distance: '',
    duration: '',
    fees: 0,
    difficulty: 'Moderate',
    altitude: '',
    guide: {
      name: '',
      experience: ''
    },
    coverImage: '',
    images: [],
    includes: [],
    inclusions: [],
    exclusions: [],
    thingsToCarry: [],
    pickupLocation: [],
    majorAttraction: [],
    itinerary: [{
      day: 1,
      title: '',
      description: ''
    }],
    season: [],
    refundPolicy: '',
    trekBaseVillage: '',
    departureFrom: '',
    trekFrom: '',
    trekRoute: '',
    popular: false,
    subtitlevisible: false,
    specialEvent: false,
    status: 'Active',
    batches: []
  };

  imagesInput = '';
  includesInput = '';
  inclusionsInput = '';
  exclusionsInput = '';
  thingsInput = '';
  pickupInput = '';
  attractionInput = '';
  seasonInput = '';

  isEditMode = false;
  trekId = '';

  difficultyOptions = [
    'Easy',
    'Moderate',
    'Difficult'
  ];

  trekStatusOptions = [
    'Active',
    'Cancelled',
    'Completed',
    'Hidden'
  ];

  batchStatusOptions = [
    'Active',
    'Full',
    'Cancelled',
    'Completed'
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.isEditMode = true;
        this.trekId = id;

        this.adminService.getTrekById(id).subscribe({
          next: (res: any) => {
            this.trekData = res;

            this.imagesInput = res.images?.join(', ') || '';
            this.includesInput = res.includes?.join(', ') || '';
            this.inclusionsInput = res.inclusions?.join(', ') || '';
            this.exclusionsInput = res.exclusions?.join(', ') || '';
            this.thingsInput = res.thingsToCarry?.join(', ') || '';
            this.pickupInput = res.pickupLocation?.join(', ') || '';
            this.attractionInput = res.majorAttraction?.join(', ') || '';
            this.seasonInput = res.season?.join(', ') || '';

            if (res.itinerary?.length) {
              this.trekData.itinerary = res.itinerary.map((item: any) => ({
                day: item.day,
                title: item.title,
                description: item.details || ''
              }));
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }

  addBatch() {
    const batchNo = this.trekData.batches.length + 1;

    const trekName = this.trekData.eventname
      ? this.trekData.eventname.split(' ')[0]
      : 'TREK';

    this.trekData.batches.push({
      batchId: `${trekName}-DATE-B${batchNo}`,
      eventDate: '',
      endDate: '',
      reportingTime: '',
      totalSeats: 0,
      availableSeats: 0,
      fees: this.trekData.fees,
      discountFee: 0,
      status: 'Active'
    });
  }

  updateBatchId(batch: any, index: number) {
    const trekName = this.trekData.eventname
      ? this.trekData.eventname.split(' ')[0]
      : 'TREK';

    const formattedDate = batch.eventDate
      ? batch.eventDate.replace(/-/g, '')
      : 'DATE';

    batch.batchId = `${trekName}-${formattedDate}-B${index + 1}`;
  }

  removeBatch(index: number) {
    this.trekData.batches.splice(index, 1);
  }

  addItinerary() {
    this.trekData.itinerary.push({
      day: this.trekData.itinerary.length + 1,
      title: '',
      description: ''
    });
  }

  removeItinerary(index: number) {
    this.trekData.itinerary.splice(index, 1);
  }

  saveTrek() {
    this.trekData.images = this.imagesInput.split(',').map((x: string) => x.trim());
    this.trekData.includes = this.includesInput.split(',').map((x: string) => x.trim());
    this.trekData.inclusions = this.inclusionsInput.split(',').map((x: string) => x.trim());
    this.trekData.exclusions = this.exclusionsInput.split(',').map((x: string) => x.trim());
    this.trekData.thingsToCarry = this.thingsInput.split(',').map((x: string) => x.trim());
    this.trekData.pickupLocation = this.pickupInput.split(',').map((x: string) => x.trim());
    this.trekData.majorAttraction = this.attractionInput.split(',').map((x: string) => x.trim());
    this.trekData.season = this.seasonInput.split(',').map((x: string) => x.trim());

    this.trekData.itinerary = this.trekData.itinerary.map((item: any) => ({
      day: item.day,
      title: item.title,
      description: item.description
    }));

    if (this.isEditMode) {
      this.adminService.updateTrek(this.trekId, this.trekData)
        .subscribe(() => {
          this.router.navigate(['/admin/treks']);
        });
    } else {
      this.adminService.addTrek(this.trekData)
        .subscribe(() => {
          this.router.navigate(['/admin/treks']);
        });
    }
  }
}