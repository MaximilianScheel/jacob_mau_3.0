import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-legacy',
  standalone: true,
  imports: [
    HeaderComponent,
  ],
  templateUrl: './legacy.component.html',
  styleUrl: './legacy.component.scss'
})
export class LegacyComponent {

}
