import { Component, OnInit } from '@angular/core';
import { HeroSliderComponent } from "../../core/components/hero-slider/hero-slider.component";
import { ApiService } from '../../core/services/api.service';
import { delay } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies_data: any[] = [];

  constructor(private spinner: NgxSpinnerService, private apiService: ApiService) { }

  ngOnInit() {
    this.spinner.show();
    this.getNowPlaying('movie', 1);
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getNowPlaying(mediaType: 'movie', page: number) {
    this.apiService.getNowPlaying(mediaType, page).pipe(delay(2000)).subscribe(
      (res: any) => {
        this.movies_data = res.results.map((item: any) => {
          const movieItem = {
            ...item,
            link: `/movie/${item.id}`,
            videoId: ''
          };

          // Fetch the trailer video key for each movie
          // this.apiService.getYouTubeVideo(item.id, 'movie').subscribe(
          //   (videoRes: any) => {
          //     const video = videoRes.results.find((vid: any) => vid.site === 'YouTube' && vid.type === 'Trailer');
          //     if (video) {
          //       movieItem.videoId = video.key; // Set the video key if available
          //     }
          //   },
          //   videoError => {
          //     console.error('Error fetching YouTube video for Movie:', videoError);
          //   }
          // );

          return movieItem;
        });
      },
      error => {
        console.error('Error fetching now playing data', error);
      }
    );

  }
}