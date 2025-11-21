import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/elipsis.pipe';
import { NumberWithCommasPipe } from '../../pipes/number-with-commas.pipe';
import { ApiService } from '../../services/api.service';
import { ModalComponent } from '../modal/modal.component';

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
export class HeroSliderComponent implements OnInit, OnDestroy {
  @Input() slides: any[] = [];
  current = 0;
  private intervalId: any;

  constructor(private apiService: ApiService, private vcr: ViewContainerRef,
  ) { }

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

  videoUrl: string = '';

  setVideoUrl(videoId: string) {
    this.videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&mute=1`;
  }

  openTrailer(hero: any) {
    const mediaType = hero.number_of_seasons ? 'tv' : 'movie';
    this.apiService.getYouTubeVideo(hero.id, mediaType).subscribe((res: any) => {
      const video = res.results.find((v: any) =>
        v.site === 'YouTube' && ['Trailer', 'Teaser', 'Clip'].includes(v.type)
      );
      if (!video) return alert('No trailer available');

      const videoUrl = `https://www.youtube.com/embed/${video.key}?rel=0&autoplay=1&mute=1`;

      // Dynamically create modal component
      const componentRef = this.vcr.createComponent(ModalComponent);
      componentRef.instance.videoUrl = videoUrl;
      componentRef.instance.modalId = `trailerModal-${hero.id}`; // unique ID per video
    });
  }
}
