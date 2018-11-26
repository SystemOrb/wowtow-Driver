import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MainComponent } from './components/pages/main.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { StaticModule } from './components/static/static.module';
import { PublicComponent } from './components/pages/public/public.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    APP_ROUTES,
    StaticModule,
    BrowserAnimationsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
