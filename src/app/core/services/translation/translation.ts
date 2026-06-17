import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

private apiUrl = 'https://libretranslate.de/translate';

  constructor(private http: HttpClient) {}

  translateToSpanish(text: string): Observable<string> {
    if (!text || text.trim().length === 0) {
      return new Observable<string>(observer => {
        observer.next('');
        observer.complete();
      });
    }

    return this.http.post<any>(this.apiUrl, {
      q: text,
      source: 'en',
      target: 'es',
      format: 'text'
    }).pipe(
      map(res => res.translatedText)
    );
  }
}
