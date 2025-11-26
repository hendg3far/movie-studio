import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClampTextDirective } from '../../directives/clamp-text.directive';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule, FormsModule, ClampTextDirective],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss'
})
export class EpisodesComponent implements OnInit {
  id!: number;
  episodes_data: any[] = [];
  selectedSeason: number = 1;
  seasons: any[] = [];

  constructor(private apiService: ApiService, private router: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.spinner.show();
      this.id = +params['id'];

      this.apiService.getTvShow(this.id).subscribe(
        {
          next: (result) => {
            this.handleTvInfo(result);
            this.spinner.hide();
          },
          error: (error) => {
            console.error('Error fetching data', error);
            this.spinner.hide();
          }
        }
      );
    });
  }

  handleTvInfo(result: any) {
    this.seasons = result.seasons.filter((season: any) => season.season_number !== 0);
    this.selectedSeason = this.seasons.length > 0 ? this.seasons[0].season_number : 1;
    this.loadEpisodes(this.id, this.selectedSeason);
  }

  loadEpisodes(id: number, season: number): void {
    this.apiService.getTvShowEpisodes(id, season)
      .subscribe(
        {
          next: (data) => {
            this.episodes_data = data.episodes;
          },
          error: (error) => {
            console.error('Error fetching episodes:', error);
          }
        }
      );
  }

  onSeasonChange(event: any): void {
    const selectedSeason = event.target.value;
    this.loadEpisodes(this.id, selectedSeason);
  }
}
