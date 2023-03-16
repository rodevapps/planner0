import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { ToastService, AngularToastifyModule } from 'angular-toastify';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularToastifyModule
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
