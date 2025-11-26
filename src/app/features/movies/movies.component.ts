import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { delay } from 'rxjs';
import { HeroSliderComponent } from '../../core/components/hero-slider/hero-slider.component';
import { CarouselComponent } from "../../core/components/carousel/carousel.component";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [HeroSliderComponent, CarouselComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  movies_data: any[] = [];
  movieCategories: { [key: string]: any[] } = {
    nowPlayingMovies: [],
    popularMovies: [],
    upcomingMovies: [],
    topRatedMovies: [],
  };

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.getNowPlaying(2);
    this.loadMovies();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  getNowPlaying(page: number) {
    this.apiService.getNowPlaying('movie', page).pipe(delay(2000)).subscribe(
      res => {
        this.movies_data = res.results.map((item: any) => {
          const movieItem = {
            ...item,
            link: `/movie/${item.id}`,
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
    this.fetchMovies('now_playing', 'nowPlayingMovies');
    this.fetchMovies('popular', 'popularMovies');
    this.fetchMovies('upcoming', 'upcomingMovies');
    this.fetchMovies('top_rated', 'topRatedMovies');
  }

  fetchMovies(category: string, property: string): void {
    this.apiService.getCategory(category, 1, 'movie').subscribe(
      (response) => {
        this.movieCategories[property] = response.results.map((item: any) => ({
          link: `/movie/${item.id}`,
          linkExplorer: `/movie/category/${category}`,
          imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
          title: item.title,
          rating: item.vote_average * 10,
          vote: item.vote_average,
        }));
      },
      (error) => {
        console.error(`Error fetching ${category} movies:`, error);
      });
  }
}
