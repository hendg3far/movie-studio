import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  private language = 'en-US';

  constructor(private http: HttpClient) { }

  private buildParams(params: any): HttpParams {
    let httpParams = new HttpParams().set('api_key', this.apiKey).set('language', this.language);
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return httpParams;
  }


  getNowPlaying(mediaType: string, page: number): Observable<any> {
    const params = this.buildParams({ page: page.toString() });

    return this.http
      .get(`${this.apiUrl}/${mediaType}/now_playing`, { params })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getYouTubeVideo(id: number, mediaType: string): Observable<any> {
    const params = this.buildParams({});
    return this.http
      .get(`${this.apiUrl}/${mediaType}/${id}/videos`, { params })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  getTrending(media: string, page: number): Observable<any> {
    const params = this.buildParams({ page: page.toString() });
    return this.http
      .get(`${this.apiUrl}/trending/${media}/week`, { params })
      .pipe(catchError(this.handleError))
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Something went wrong';

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        errorMessage = 'No internet connection';
      } else {
        switch (error.status) {
          case 0:
            errorMessage = 'Unable to connect to the server';
            break;
          case 400:
            errorMessage = 'Bad request';
            break;
          case 401:
            errorMessage = 'Unauthorized';
            break;
          case 403:
            errorMessage = 'Access denied';
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Internal server error';
            break;
          default:
            errorMessage = `Unexpected error: ${error.status}`;
        }
      }
    } else if (error instanceof ErrorEvent) {
      errorMessage =
        error.error?.message || error.message || 'Client error occurred';
    } else {
      errorMessage = 'Unexpected error occurred';
    }

    console.error('Error:', error);

    return throwError(() => new Error(errorMessage));
  }
}
