import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchMovieResponseModel } from '../models/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  searchMovies(searchValue: string): Observable<SearchMovieResponseModel> {
    return this.http.get<SearchMovieResponseModel>("https://www.omdbapi.com/?apikey=83513884&type=movie&s=" + searchValue);
  }
}