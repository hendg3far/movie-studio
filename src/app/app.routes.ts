import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { MoviesComponent } from './features/movies/movies.component';
import { TvComponent } from './features/tv/tv.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent },
    { path: 'tv', component: TvComponent },
    { path: '**', component: PageNotFoundComponent }
];
