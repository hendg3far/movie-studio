import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterLink, CommonModule],
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

}
