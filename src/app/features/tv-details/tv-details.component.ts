import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MediaComponent } from "../../core/components/media/media.component";
import { VideoItemComponent } from "../../core/components/video-item/video-item.component";
import { ImagesComponent } from "../../core/components/images/images.component";
import { CarouselComponent } from "../../core/components/carousel/carousel.component";
import { HeroSliderComponent } from "../../core/components/hero-slider/hero-slider.component";
import { EpisodesComponent } from "../../core/components/episodes/episodes.component";

@Component({
  selector: 'app-tv-details',
  standalone: true,
  imports: [MediaComponent, VideoItemComponent, ImagesComponent, CarouselComponent, HeroSliderComponent, EpisodesComponent],
  templateUrl: './tv-details.component.html',
  styleUrl: './tv-details.component.scss'
})
export class TvDetailsComponent implements OnInit {
  id!: number;
  tv_data: any;
  heroSlides: any[] = [];
  external_data: any;
  video_data: any;
  videos: any[] = [];
  filteredVideos: any[] = [];
  videoTypes: string[] = [];
  backdrops: any[] = [];
  posters: any[] = [];
  cast_data: any;
  type: 'tv' = 'tv';

  constructor(private apiService: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.getTvInfo(this.id);
      this.getTvVideos(this.id);
      this.getTvBackdrop(this.id);
      this.getTvCast(this.id);
    });
  }

  getTvInfo(id: number) {
    this.apiService.getTvShow(id).subscribe({
      next: (result) => {
        this.tv_data = result;
        this.heroSlides = [{
          ...result
        }];
      }, error: (err) => console.error(err)
    });

    this.getExternal(id);
  }


  getExternal(id: number) {
    this.apiService.getExternalId(id, 'tv').subscribe((result: any) => {
      this.external_data = result;
    });
  }

  getTvBackdrop(id: number) {
    this.apiService.getBackdrops(id, 'tv').subscribe((res: any) => {
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

  getTvVideos(id: number) {
    this.apiService.getYouTubeVideo(id, 'tv').subscribe((res: any) => {
      this.video_data = res.results.length ? res.results[0] : null;
      this.videos = res.results;
      this.filteredVideos = this.videos;
      this.videoTypes = ['ALL', ...new Set(this.videos.map(video => video.type))];
    });
  }

  filterVideos(event: Event): void {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.filteredVideos = filterValue === 'ALL'
      ? this.videos
      : this.videos.filter(video => video.type === filterValue);
  }

  getTvCast(id: number) {
    this.apiService.getCredits(id, 'tv').subscribe(
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

}
