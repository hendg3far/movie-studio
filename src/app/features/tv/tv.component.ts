import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { delay } from 'rxjs';
import { HeroSliderComponent } from '../../core/components/hero-slider/hero-slider.component';
import { CarouselComponent } from '../../core/components/carousel/carousel.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [HeroSliderComponent, CarouselComponent],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss'
})
export class TvComponent implements OnInit {
  tv_data: any[] = [];
  tvCategories: { [key: string]: any[] } = {
    onTheAirTv: [],
    popularTv: [],
    airingTodayTv: [],
    topRatedTv: []
  };

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getNowPlaying(1);
    this.loadMovies();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getNowPlaying(page: number) {
    this.apiService.getTvDiscover(page).pipe(delay(2000)).subscribe(
      res => {
        this.tv_data = res.results.map((item: any) => {
          const movieItem = {
            ...item,
            link: `/tv/${item.id}`,
          };

          return movieItem;
        });
      },
      error => {
        console.error('Error fetching now playing data', error);
      }
    );
  }

  loadMovies(): void {
    this.fetchMovies('popular', 'popularTv');
    this.fetchMovies('top_rated', 'topRatedTv');
    this.fetchMovies('on_the_air', 'onTheAirTv');
    this.fetchMovies('airing_today', 'airingTodayTv');

  }

  fetchMovies(category: string, property: string): void {
    this.apiService.getCategory(category, 1, 'tv').subscribe(
      (response) => {
        this.tvCategories[property] = response.results.map((item: any) => ({
          link: `/tv/${item.id}`,
          linkExplorer: `/tv/category/${category}`,
          imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
          title: item.title,
          rating: item.vote_average * 10,
          vote: item.vote_average,
        }));
        console.log(`${category} tvs:`, response.results);
      },
      (error) => {
        console.error(`Error fetching ${category} tvs:`, error);
      });
  }
}
