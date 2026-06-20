import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { __values } from 'tslib';
import { BookingService } from '../booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.css'
})
export class AdmissionComponent implements OnInit {

  submitted = false;
  eventname = ""
  fees = ""
  eventdatearray: string []=[]
  pickuparray: string []=[]
  bookingData: any = ""

  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  today: string = new Date().toISOString().split('T')[0];

  // Inject FormBuilder service
  constructor(private FB: FormBuilder, private router: Router, private route: ActivatedRoute) {
    console.log('Constructor Called');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventname = params.get('name') || '';
      this.fees = params.get('fees') || '';
      this.eventdatearray = (params.get('bookdate') || '').split(',');
      this.pickuparray = (params.get('pickup') || '').split(',');
      this.MForm.patchValue({
      trekdate: ''
    });
    this.MForm.patchValue({
      pickuplocation: ''
    });

      // console.log("aray"+ this.eventdatearray);
      this.updateAmount();
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  MForm = this.FB.group
    (
      {
        // Add Multiple validations
        fname: ['', [Validators.required, Validators.pattern('^[a-zA-Z .-]+$')]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9-]+$'), Validators.minLength(10), Validators.maxLength(11)]],
        email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,}$')]],
        phone2: ['', [Validators.required, Validators.pattern('^[0-9-]+$'), Validators.minLength(10), Validators.maxLength(11)]],
        address: ['', [Validators.required, Validators.minLength(5)]],
        terms: [false, [Validators.required, Validators.requiredTrue]],
        city: ['', [Validators.required, Validators.pattern('^[a-zA-Z- ]+$'), Validators.minLength(4)]],
        pickuplocation: ['', [Validators.required]],
        trekdate: ['', [Validators.required]],
        noofperson: ['1', [Validators.required, Validators.min(1), Validators.max(10)]],
        amount: ['0', []]
      }
    );

  firstname = ""
  lastname = ""
  email = ""
  phone = ""
  address = ""

  setData() {
    this.bookingData = {
      eventname: this.eventname,
      eventfee: this.fees,
      customername: this.MForm.get('fname')?.value,
      mobile: this.MForm.get('phone')?.value,
      email: this.MForm.get('email')?.value,
      noofpersons: this.MForm.get('noofperson')?.value,
      amount: this.MForm.get('amount')?.value,
      eventdate: this.MForm.get('trekdate')?.value,

      emergencymobile: this.MForm.get('phone2')?.value,
      address: this.MForm.get('address')?.value,
      terms: this.MForm.get('terms')?.value,
      city: this.MForm.get('city')?.value,
      pickuplocation: this.MForm.get('pickuplocation')?.value
    }

    this.router.navigate(['/review'], { state: { bookingData: this.bookingData } });
    
    // this.bookingservice.getbookingdata(this.bookingData).subscribe(
    //   res => {
    //     console.log(res)
    //     if (res.status === '200') {
    //       console.log("Booking data submitted");
    //       this.toastr.success(res.message);
          
    //     }
    //     else {
    //       console.log(res.status);
    //       //   show toast message
    //       this.toastr.error(res.message);
    //     }
    //   },
    //   err => {
    //     console.log(err.error.message)
    //     this.toastr.error(err.error.message);
    //     console.log(err)
    //   }
    // );
  }

  increasePerson() {
    const control = this.MForm.get('noofperson');
    let value = Number(control?.value);
    if (value < 10) {
      control?.setValue(String(value + 1));
      this.updateAmount();
    }
  }
  decreasePerson() {
    const control = this.MForm.get('noofperson');
    let value = Number(control?.value);
    if (value > 1) {
      control?.setValue(String(value - 1));
      this.updateAmount();
    }
  }

  updateAmount() {
    const persons = Number(this.MForm.get('noofperson')?.value);
    const fees = Number(this.fees);
    this.MForm.patchValue({
      amount: String(fees * persons)
    });
  }


}
