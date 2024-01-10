import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, NgbModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

  slides = [
    { img: "/assets/BER_AKTUELLES_1.jpeg", caption: "Beschreibung 1" },
    { img: "/assets/BER_AKTUELLES_2.jpeg", caption: "Beschreibung 2" },
    { img: "/assets/BER_AKTUELLES_3.jpeg", caption: "Beschreibung 2" }
  ];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": false,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "arrows": false,
    "responsive": [
      {
        "breakpoint": 1024,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "dots": true
        }
      },
      {
        "breakpoint": 600,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 2
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]
  };
}
