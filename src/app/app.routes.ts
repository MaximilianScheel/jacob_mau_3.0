import { Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { LegacyComponent } from './legacy/legacy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'datenschutz', component: LegacyComponent },
];


