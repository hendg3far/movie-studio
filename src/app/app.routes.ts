import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { MoviesComponent } from './features/movies/movies.component';
import { TvComponent } from './features/tv/tv.component';
import { SearchComponent } from './core/components/search/search.component';
import { TvDetailsComponent } from './features/tv-details/tv-details.component';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'movie/:id', component: MovieDetailsComponent },
    { path: 'tv', component: TvComponent },
    { path: 'tv/:id', component: TvDetailsComponent },
    { path: 'search', component: SearchComponent },
    { path: '**', component: PageNotFoundComponent }
];
