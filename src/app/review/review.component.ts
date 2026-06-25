import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  bookingData: any = ""

  constructor(private router: Router, private route: ActivatedRoute, private bookingservice: BookingService,
    private toastr: ToastrService) {
  }
  ngOnInit() {
    this.bookingData = history.state.bookingData;
  }

  payment() {

    this.bookingservice.createOrder(this.bookingData).subscribe((order: any) => {
      console.log("order =>", order);
      const options: any = {
         key: environment.razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'TrekOne Booking',
        description: 'TrekOne Registration',
        order_id: order.id,
        prefill: {
          name: this.bookingData.customername,
          email: this.bookingData.email,
          contact: this.bookingData.mobile
        },
        theme: {
          color: '#3395ff'
        },
        handler: (response: any) => {
          console.log(response);
          this.bookingservice.getverifysignature(response).subscribe((response: any) => {
            console.log(response);
            this.toastr.success('Payment successful');
            this.bookingData.bookingid = order.bookingid;
            sessionStorage.setItem('bookingData', JSON.stringify(this.bookingData));
            this.router.navigate(['/greeting']);
          }, err => {
            console.log(err);
            this.toastr.error('Payment verification failed');
          });
        }
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', (response: any) => {
        console.log('Payment Failed:', response);
        this.toastr.error(response.error.description);
      });
    });
  }
}
