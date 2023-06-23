import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightsListComponent } from './components/flights/flights-list/flights-list.component';
import { AddflightComponent } from './components/flights/addflight/addflight.component';
import { FormsModule } from '@angular/forms';
import { EditflightComponent } from './components/flights/editflight/editflight.component';
import { LoginComponent } from './components/login/login.component';
import { FileComponent } from './components/file/file.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightsListComponent,
    AddflightComponent,
    EditflightComponent,
    LoginComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
