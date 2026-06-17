import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Anime,
  AnimeDetail,
  Episode,
  Review
} from '../../models/anime.models';

interface JikanListResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    last_visible_page: number;
    has_next_page: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private baseUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) { }

  searchAnimes(
    query: string,
    page: number = 1,
    filters?: { type?: string; status?: string; rating?: string }
  ): Observable<JikanListResponse<Anime>> {
    let params = new HttpParams().set('q', query).set('page', page);

    if (filters?.type) params = params.set('type', filters.type);
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.rating) params = params.set('rating', filters.rating);

    return this.http.get<JikanListResponse<Anime>>(`${this.baseUrl}/anime`, {
      params
    });
  }

  getAnime(id: number): Observable<{ data: AnimeDetail }> {
    return this.http.get<{ data: AnimeDetail }>(`${this.baseUrl}/anime/${id}`);
  }

  getEpisodes(id: number): Observable<{ data: Episode[] }> {
    return this.http.get<{ data: Episode[] }>(
      `${this.baseUrl}/anime/${id}/episodes`
    );
  }

  getReviews(id: number): Observable<{ data: Review[] }> {
    return this.http.get<{ data: Review[] }>(
      `${this.baseUrl}/anime/${id}/reviews`
    );
  }

  getRandomAnime(): Observable<{ data: AnimeDetail }> {
    return this.http.get<{ data: AnimeDetail }>(`${this.baseUrl}/random/anime`);
  }

  getRecommendations(id: number): Observable<{ data: any[] }> {
    return this.http.get<{ data: any[] }>(
      `${this.baseUrl}/anime/${id}/recommendations`
    );
  }

  getPopularAnimes() {
    return this.http.get<any>(
      `${this.baseUrl}/top/anime?filter=bypopularity`
    );
  }

  getTopRatedAnimes() {
    return this.http.get<any>(
      `${this.baseUrl}/top/anime`
    );
  }

  getAiringAnimes() {
    return this.http.get<any>(
      `${this.baseUrl}/top/anime?filter=airing`
    );
  }

  getUpcomingAnimes() {
    return this.http.get<any>(
      `${this.baseUrl}/top/anime?filter=upcoming`
    );
  }

}
