import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrl: './mybooking.component.css'
})
export class MybookingComponent implements OnInit {

  bookings: any[] = [];
  loading = true;
  bookingData: any;
  email = ""
  // email = "divinearcs1@gmail.com";

  constructor(private eventService: EventService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.email = params.get('email') || '';
      console.log("email:", this.email)
      this.getBookingData();
      // this.bookingData = JSON.parse(sessionStorage.getItem('bookingData') || '{}');
    });
  }

  getBookingData() {
    this.eventService.getBookings(this.email).subscribe({
      next: (res: any) => {
        this.bookings = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  isRefundEligible(booking: any): boolean {

    const trekDate = new Date(booking.eventdate);
    const now = new Date();

    const diffInMs = trekDate.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return (
      trekDate > now &&                  // trek in future
      diffInHours >= 48 &&               // minimum 48 hours
      booking.paymentstatus === 'Paid' &&
      booking.refundstatus !== 'Refunded' &&
      booking.bookingstatus !== 'Cancelled'
    );
  }

  cancelBooking(bookingid: string) {

    this.eventService.cancelBooking(bookingid).subscribe({
      next: (res: any) => {
        console.log(res);

        const booking = this.bookings.find(
          x => x.bookingid === bookingid
        );

        if (booking) {
          booking.bookingstatus = "Cancelled";
        }
        if (res.success == false) {
          this.toastr.warning(res.message);
        }
        else {
          this.toastr.success(res.message);
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    });
  }

  // canCancelBooking(booking: any): boolean {
  //   return (
  //     booking.bookingstatus !== 'Cancelled' &&
  //     booking.refundstatus !== 'Refunded'
  //   );
  // }

  cancelAndRefund(booking: any) {

    const payload = {
      bookingid: booking.bookingid,
      paymentid: booking.paymentid,
      amount: booking.amount
    };

    console.log('Refund request:', payload);

    this.eventService.cancelAndRefund(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        booking.paymentstatus = "Refunded";
        booking.refundstatus = "Refunded";
        if (res.success == false) {
          this.toastr.warning(res.message);
        }
        else {
          this.toastr.success(res.message);
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    });
  }

  downloadReceipt(bid: any) {
    //
    const booking = this.bookings.find(
      x => x.bookingid === bid
    );
    //
    console.log("booking id :", bid);
    const pdf = new jsPDF();
    // Header
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TREKONE ADVENTURES', 105, 20, { align: 'center' });

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Booking Confirmation Receipt', 105, 28, { align: 'center' });

    // Divider
    pdf.line(15, 35, 195, 35);

    // Booking ID
    pdf.setFont('helvetica', 'bold');
    pdf.text('Booking ID:', 15, 45);

    pdf.setFont('helvetica', 'normal');
    pdf.text(booking.bookingid, 55, 45);

    // Table
    autoTable(pdf, {
      startY: 55,
      theme: 'grid',
      head: [['Field', 'Details']],
      body: [
        ['Customer Name', booking.customername],
        ['Mobile', booking.mobile],
        ['Email', booking.email],
        ['Trek Name', booking.eventname],
        ['Trek Date', booking.eventdate],
        ['No. of Persons', booking.noofpersons],
        ['Pick-up Point', booking.pickuplocation],
        ['Amount Paid', 'Rs. ' + booking.amount]
      ]
    });

    // Footer Note
    const finalY = (pdf as any).lastAutoTable.finalY + 15;
    pdf.setFontSize(11);
    pdf.text(
      'Please carry a valid ID proof and reach the pickup location on time.',
      15,
      finalY
    );
    pdf.setFontSize(10);
    pdf.text(
      'Thank you for booking with TrekOne Adventures.',
      15,
      finalY + 15
    );
    pdf.save('TrekOne-Booking-Receipt_' + booking.bookingid + '.pdf');
  }

}