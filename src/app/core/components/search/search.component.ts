import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchResults: any[] = [];
  query: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'];
      if (this.query) {
        this.getSearchResults(this.query);
      }
    });
  }


  getSearchResults(query: string): void {
    this.apiService.search(query, 1).subscribe(
      (response: any) => {
        this.searchResults = response.results.map((item: any) => {
          return {
            link: item.media_type === 'movie' ? `/movie/${item.id}` : item.media_type === 'tv' ? `/tv/${item.id}` : `/person/${item.id}`,
            imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : '',
            title: item.title || item.name,
            rating: item.vote_average ? item.vote_average * 10 : 'N/A',
            vote: item.vote_average ? item.vote_average : 'N/A',
            poster_path: item.poster_path
          };
        });
      },
      error => {
        console.error('Error fetching search data', error);

      }
    );
  }
}
