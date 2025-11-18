import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/elipsis.pipe';
import { NumberWithCommasPipe } from '../../pipes/number-with-commas.pipe';

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [RouterLink, CommonModule, TruncatePipe, NumberWithCommasPipe],
  templateUrl: './hero-slider.component.html',
  styleUrl: './hero-slider.component.scss',
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
  ]
})
export class HeroSliderComponent implements OnInit {
  @Input() slides: any[] = [];
  current = 0;
  private intervalId: any;


  ngOnInit() {
    this.sliderTimer()
  }

  sliderTimer() {
    this.intervalId = setInterval(() => {
      this.current = (this.current + 1) % this.slides.length;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
