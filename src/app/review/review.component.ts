import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  bookingData: any = ""

  constructor(private router: Router, private route: ActivatedRoute, private bookingservice: BookingService, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.bookingData = history.state.bookingData;
    //    console.log(data.name);
    // console.log(data.fees);
  }

  payment() {

    this.bookingservice.getbookingdata(this.bookingData).subscribe((order: any) => {
      console.log("order =>", order);
      const options: any = {
        key: 'rzp_test_T1bKRGsWtKElGO',
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
          /*
            response.razorpay_payment_id
            response.razorpay_order_id
            response.razorpay_signature
          */
          alert('Payment Successful');
          //
          this.bookingservice.getverifysignature(response, order.bookingid).subscribe((response: any) => {
            console.log(response);
            // this.toastr.warning('Payment Veified & booking Completed')
            this.toastr.success('Booking successfully Completed');
            //  
            this.bookingData.bookingid = order.bookingid;
            sessionStorage.setItem('bookingData', JSON.stringify(this.bookingData));

            this.router.navigate(['/greeting']);
          });
        }

      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      rzp.on('payment.failed', function (response: any) {
        console.log('Payment Failed:', response);
        
        alert(response.error.description);

        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
      });
    });

    // res => {
    //   console.log(res)
    //   if (res.status === '200') {
    //     console.log("Booking data submitted");
    //     this.toastr.success(res.message);
    //   }
    //   else {
    //     console.log(res.status);
    //     //   show toast message
    //     this.toastr.error(res.message);
    //   }
    // },
    // err => {
    //   console.log(err.error.message)
    //   this.toastr.error(err.error.message);
    //   console.log(err)
    // }
  }
}
