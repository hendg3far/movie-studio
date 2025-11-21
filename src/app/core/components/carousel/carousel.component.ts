import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { StarIcon } from '@hugeicons/core-free-icons';
register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive, HugeiconsIconComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {
  @Input() title!: string;
  @Input() id!: number | string;
  @Input() exploreLink!: string;
  @Input() items: any[] = [];
  @Input() infoLink!: string;
  @Input() isCastCarousel = false;
  @Input() isDefaultCarousel = true;
  @Input() isExplore = true;
  @Input() isDefaultExplore = false;

  StarIcon = StarIcon;

  swiperConfig = {
    slidesPerView: 6,
    spaceBetween: 14,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    breakpoints: {
      1400: { slidesPerView: 6, spaceBetween: 14, },
      1024: { slidesPerView: 5, spaceBetween: 14, },
      768: { slidesPerView: 3, spaceBetween: 14, },
      480: { slidesPerView: 2, spaceBetween: 14, },
      0: { slidesPerView: 1 }
    }
  };
}
