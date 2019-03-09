import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { IsRider } from './services/is-rider.service';
import { TripService } from './services/trip.service';
import { TripListResolver } from './services/trip-list.resolver';
import { TripDetailResolver } from './services/trip-detail.resolver';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { RiderComponent } from './components/rider/rider.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';
import { RiderRequestComponent } from './components/rider-request/rider-request.component';
import { RiderDetailComponent } from './components/rider-detail/rider-detail.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    LandingComponent,
    RiderComponent,
    RiderDashboardComponent,
    RiderRequestComponent,
    RiderDetailComponent,
    TripCardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'sign-up', component: SignUpComponent },
      { path: 'log-in', component: LogInComponent },
      {
        path: 'rider',
        component: RiderComponent,
        canActivate: [ IsRider ],
        children: [
          {
            path: 'request',
            component: RiderRequestComponent
          },
          {
            path: ':id',
            component: RiderDetailComponent,
            resolve: { trip: TripDetailResolver }
          },
          {
            path: '',
            component: RiderDashboardComponent,
            resolve: { trips: TripListResolver }
          }
        ]
      },
      { path: '', component: LandingComponent }
    ], { useHash: true })
  ],
  providers: [
    AuthService,
    IsRider,
    TripService,
    TripListResolver,
    TripDetailResolver
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
