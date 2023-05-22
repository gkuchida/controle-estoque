import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BemvindoComponent } from './bemvindo/bemvindo.component';
import { CardAddComponent } from './card-add/card-add.component';

@NgModule({
  declarations: [
    AppComponent,
    BemvindoComponent,
    CardAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
