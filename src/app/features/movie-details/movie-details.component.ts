import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarouselComponent } from "../../core/components/carousel/carousel.component";
import { VideoItemComponent } from "../../core/components/video-item/video-item.component";
import { ImagesComponent } from "../../core/components/images/images.component";
import { MediaComponent } from "../../core/components/media/media.component";
import { HeroSliderComponent } from "../../core/components/hero-slider/hero-slider.component";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CarouselComponent, VideoItemComponent, ImagesComponent, MediaComponent, HeroSliderComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  id!: number;
  movie_data: any;
  heroSlides: any[] = [];
  external_data: any;
  activeTab: string = 'overview';
  videos: any[] = [];
  videoTypes: string[] = [];
  backdrops: any[] = [];
  posters: any[] = [];
  cast_data: any;
  person_data: any;
  type: 'movie' = 'movie';

  constructor(private apiService: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.spinner.show();
      this.id = +params['id'];
      this.getMovieInfo(this.id);
      this.getMovieVideos(this.id);
      this.getMoviesBackdrop(this.id);
      this.getMovieCast(this.id);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });
  }

  getMovieInfo(id: number) {
    this.apiService.getMovie(id).subscribe({
      next: (result) => {
        this.movie_data = result;
        this.heroSlides = [{
          ...result
        }];
      }, error: (err) => console.error(err)
    });

    this.apiService.getYouTubeVideo(id, 'movie').subscribe({
      next: (result: any) => {
        const video = result.results.find((vid: any) => vid.site === 'YouTube' && ['Trailer', 'Teaser', 'Clip'].includes(vid.type));
        if (video) {
          this.movie_data.videoId = video.key;
        } else {
          console.warn('No trailer or relevant video found for this movie.');
        }
      }, error: (error) => {
        console.error('Error fetching YouTube video:', error);
      }
    });

    this.getExternal(id);
  }


  getExternal(id: number) {
    this.apiService.getExternalId(id, 'movie').subscribe((result: any) => {
      this.external_data = result;
    });
  }

  getMoviesBackdrop(id: number) {
    this.apiService.getBackdrops(id, 'movie').subscribe((res: any) => {
      this.backdrops = res.backdrops;
      this.posters = [];
      res.posters.forEach((poster: { file_path: string; }) => {
        this.posters.push({
          ...poster,
          full_path: `https://image.tmdb.org/t/p/w342${poster.file_path}`
        });
      });
    });
  }

  getMovieCast(id: number) {
    this.apiService.getCredits(id, 'movie').subscribe(
      (res: any) => {
        this.cast_data = [];
        for (let item of res.cast) {
          this.cast_data.push({
            link: `/person/${item.id}`,
            imgSrc: item.profile_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.profile_path}` : null,
            name: item.name,
            character: item.character,
            popularity: item.popularity,
          });
        }
      },
      error => {
        console.error('Error fetching credits data', error);
      }
    );
  }

  getMovieVideos(id: number) {
    this.apiService.getYouTubeVideo(id, 'movie').subscribe((res: any) => {
      this.videos = res.results;
    });
  }

}
