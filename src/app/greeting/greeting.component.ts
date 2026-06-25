import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  username: string = ""
  eventname = ""
  bookingData: any;

  constructor(private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookingData = JSON.parse(sessionStorage.getItem('bookingData') || '{}');
    });
  };

  downloadPdf() {
    console.log("inside download")
    // const data = document.getElementById('receipt-content');
    // if (!data) return;
    // html2canvas(data).then(canvas => {
    //   const imgWidth = 210;
    //   const pageHeight = 295;
    //   const imgHeight = canvas.height * imgWidth / canvas.width;
    //   const contentDataURL = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
    //   pdf.save('TrekOne-Receipt-'+ this.bookingData.bookingid + '.pdf');
    // });
    // }

    // const pdf = new jsPDF();
    // pdf.setFontSize(18);
    // pdf.text('TREKONE ADVENTURES', 20, 20);
    // pdf.setFontSize(12);
    // pdf.text('Booking ID: TRK20260619375103', 20, 40);
    // pdf.text('Customer: Pankaj B', 20, 50);
    // pdf.text('Trek: Torna Trek', 20, 60);
    // pdf.text('Date: 11 Jul 2026', 20, 70);
    // pdf.text('Amount Paid: ₹2598', 20, 80);

    // pdf.save('TrekOne-Receipt-' + this.bookingData.bookingid + '.pdf');
  }

  downloadReceipt() {
    const pdf = new jsPDF();
    const booking = this.bookingData;
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
