import { Injectable } from '@angular/core';
import { URLSearchParams, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

export interface MovieResponseType {
  page: number,
  results: MovieType[],
  total_pages: number,
  total_results: number
}

export interface MovieType {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

@Injectable()
export class SearchService {

  /**
   * @inheritDoc
   */
  constructor (private http: Http) {}

  /**
   * Search with delay
   * @property {Observable} terms
   * @property {number} debounceDuration = 500
   * @returns Observable
   */
  search(terms: Observable<any>, debounceDuration = 500) {
    return terms.debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(term => this.rawSearch(term));
  }

  /**
   * Performs actual search for movies
   * @property {string} term
   * @returns Observable
   */
  rawSearch (term: string) {
    if (!term) {
      return Observable.from([]);
    }
    // prepare our request
    let search = new URLSearchParams();
    let apiKey = '42b3e60b6636f50062f6d3579100d83f';
    let apiUrl = 'http://api.themoviedb.org/3/search/movie';

    search.set('api_key', apiKey);
    search.set('query', term);
    return this.http
      .get(apiUrl, { search })
      .map((response: Response) => response.json())
      .map((result: MovieResponseType) => this.resolveAbsolutePath(result.results))
  }

  /**
   * Replaces img relative paths with absolute (poster_path, backdrop_path) 
   * @returns MovieType[]
   */
  resolveAbsolutePath(items: MovieType[]) {
    let imgPath = 'https://image.tmdb.org/t/p/w150';
  
    return items.map(item => {
      if (item.poster_path) {
        item.poster_path = imgPath + item.poster_path;
      }
      if (item.backdrop_path) {
        item.backdrop_path = imgPath + item.backdrop_path;
      }
      return item;
    });
  }
}