import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AdmissionComponent } from './admission/admission.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { GreetingComponent } from './greeting/greeting.component';
import { RegisterComponent } from './register/register.component';
import { TermsComponent } from './terms/terms.component';
import { ReviewComponent } from './review/review.component';
import { HomeComponent } from './home/home.component';
import { TrekDetailsComponent } from './trek-details/trek-details.component';
import { SearchTreksComponent } from './search-treks/search-treks.component';
import { PremiumDetailsComponent } from './premium-details/premium-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MybookingComponent } from './mybooking/mybooking.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin.guard';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AdminTreksComponent } from './admin-treks/admin-treks.component';
import { AddTrekComponent } from './add-trek/add-trek.component';
import { AdminRefundsComponent } from './admin-refunds/admin-refunds.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminPaymentsComponent } from './admin-payments/admin-payments.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';

const routes: Routes = [
  //  {path : '', redirectTo:'events', pathMatch:'full'},
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  {
    path: 'special',
    canActivate: [authGuard],
    component: SpecialEventsComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/treks',
    component: AdminTreksComponent
    ,canActivate: [adminGuard]
  },
  {
    path: 'admin/add-trek',
    component: AddTrekComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/edit-trek/:id',
    component: AddTrekComponent
    ,canActivate: [adminGuard]
  },
  {
    path: 'admin/bookings',
    component: AdminBookingsComponent
    ,canActivate: [adminGuard]
  },
  {
    path: 'admin/refunds',
    component: AdminRefundsComponent
    ,canActivate: [adminGuard]
  },
  {
  path: 'admin/users',
  component: AdminUsersComponent
  ,canActivate: [adminGuard]
},
{
   path: 'admin/payments',
   component: AdminPaymentsComponent
   ,canActivate: [adminGuard]
},
  { path: 'login', component: LoginComponent },
  { path: 'admission/:name/:id/:fees/:eventDate/:batchId/:pickup', component: AdmissionComponent },
  { path: 'greeting', component: GreetingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'trek-details/:id', component: TrekDetailsComponent },
  { path: 'premium-details/:id', component: PremiumDetailsComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'search-treks', component: SearchTreksComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'terms-and-conditions', component: TermsComponent },
  { path: 'mybooking', component: MybookingComponent },
  { path: 'admin/reports', component: AdminReportsComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
