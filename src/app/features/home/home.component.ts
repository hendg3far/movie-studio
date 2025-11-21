import { Component, OnInit } from '@angular/core';
import { HeroSliderComponent } from "../../core/components/hero-slider/hero-slider.component";
import { ApiService } from '../../core/services/api.service';
import { delay } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarouselComponent } from "../../core/components/carousel/carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSliderComponent, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movies_data: any[] = [];
  movies_slider: any[] = [];
  tv_slider: any[] = [];

  constructor(private spinner: NgxSpinnerService, private apiService: ApiService) { }

  ngOnInit() {
    this.spinner.show();
    this.getNowPlaying('movie', 1);
    this.getTrendingContent('movie', 1, 'movies');
    this.getTrendingContent('tv', 1, 'tvShows');
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getNowPlaying(mediaType: 'movie', page: number) {
    this.apiService.getNowPlaying(mediaType, page).pipe(delay(2000)).subscribe(
      res => {
        this.movies_data = res.results.map((item: any) => {
          const movieItem = {
            ...item,
            link: `/movie/${item.id}`,
            videoId: ''
          };
          this.apiService.getYouTubeVideo(item.id, 'movie').subscribe(
            (videoRes: any) => {
              const video = videoRes.results.find((vid: any) => vid.site === 'YouTube' && vid.type === 'Trailer');
              if (video) {
                movieItem.videoId = video.key;
              }
            },
            videoError => {
              console.error('Error fetching YouTube video for Movie:', videoError);
            }
          );

          return movieItem;
        });
      },
      error => {
        console.error('Error fetching now playing data', error);
      }
    );

  }

  getTrendingContent(media: string, page: number, type: string) {
    this.apiService.getTrending(media, page).subscribe(
      response => {
        if (type === 'movies') {
          this.movies_slider = response.results.map((item: any) => ({
            link: `/movie/${item.id}`,
            imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
            title: item.title,
            rating: item.vote_average * 10,
            vote: item.vote_average
          }));
        } else if (type === 'tvShows') {
          this.tv_slider = response.results.map((item: any) => ({
            link: `/tv/${item.id}`,
            imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
            title: item.name,
            rating: item.vote_average * 10,
            vote: item.vote_average
          }));
        }
      },
      error => {
        console.error('Error fetching now playing data', error);
      }
    )
  }
}