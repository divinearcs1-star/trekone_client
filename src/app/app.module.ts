import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './token-interceptor.service';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AdmissionComponent } from './admission/admission.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AstrictDirective } from './astrict.directive';
import { GreetingComponent } from './greeting/greeting.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsComponent } from './terms/terms.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MY_DATE_FORMATS } from '../date-format';
import { ReviewComponent } from './review/review.component';
import { HomeComponent } from './home/home.component';
import { TrekDetailsComponent } from './trek-details/trek-details.component';
import { SearchTreksComponent } from './search-treks/search-treks.component';
import { PremiumDetailsComponent } from './premium-details/premium-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MybookingComponent } from './mybooking/mybooking.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    SpecialEventsComponent,
    LoginComponent,
    AdmissionComponent,
    PagenotfoundComponent,
    AstrictDirective,
    GreetingComponent,
    RegisterComponent,
    TermsComponent,
    ReviewComponent,
    HomeComponent,
    TrekDetailsComponent,
    SearchTreksComponent,
    PremiumDetailsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    MybookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,HttpClientModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    provideClientHydration(), AuthService, EventService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },{provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
