import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AnimeService } from '../../core/services/anime/anime.service';
import { Anime } from '../../core/models/anime.models';
import { AnimeCardComponent } from '../../shared/anime-card/anime-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnimeCardComponent,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  form: FormGroup;

  animes: Anime[] = [];
  loading = false;
  error: string | null = null;
  hasSearched = false;

  currentPage = 1;
  hasNextPage = true;
  isInfiniteScroll = true;

  viewMode: 'grid' | 'list' = 'grid';

  types = ['tv', 'movie', 'ova', 'special'];
  statuses = ['airing', 'complete', 'upcoming'];
  ratings = ['g', 'pg13', 'r17', 'r', 'rx'];

  constructor(
    private fb: FormBuilder,
    private animeService: AnimeService
  ) {
    this.form = this.fb.group({
      query: [''],
      type: [''],
      status: [''],
      rating: ['']
    });
  }

  search(fromScroll: boolean = false) {
    const { query, type, status, rating } = this.form.value;

    if (!query || query.trim().length === 0) {
      if (!fromScroll) {
        this.error = 'Escribe al menos un nombre para buscar.';
        this.animes = [];
      }
      return;
    }

    if (!fromScroll) {
      this.currentPage = 1;
      this.animes = [];
      this.hasNextPage = true;
      window.scrollTo({ top: 0 });
    }

    if (!this.hasNextPage || this.loading) return;

    this.loading = true;
    this.error = null;
    this.hasSearched = true;

    this.animeService
      .searchAnimes(query.trim(), this.currentPage, { type, status, rating })
      .subscribe({
        next: (res: any) => {
          this.animes = [...this.animes, ...res.data];
          this.currentPage = res.pagination.current_page;
          this.hasNextPage = res.pagination.has_next_page;
          this.loading = false;
        },
        error: () => {
          this.error = 'Ha ocurrido un error consultando la API.';
          this.loading = false;
        }
      });
  }

  resetFilters() {
    this.form.patchValue({ type: '', status: '', rating: '' });
  }

  @HostListener('window:scroll', [])
  handleScroll() {
    if (
      !this.isInfiniteScroll ||
      this.loading ||
      !this.hasNextPage
    ) {
      return;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold) {
      this.currentPage++;
      this.search(true);
    }
  }
}
