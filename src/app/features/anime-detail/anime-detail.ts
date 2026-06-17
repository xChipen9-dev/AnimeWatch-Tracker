import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AnimeService } from '../../core/services/anime/anime.service';
import { MyListService } from '../../core/services/my-list/my-list.service';
import { TranslationService } from '../../core/services/translation/translation';

import {
  AnimeDetail,
  Episode,
  Review,
  AnimeState
} from '../../core/models/anime.models';

import { AnimeCardComponent } from '../../shared/anime-card/anime-card';

@Component({
  selector: 'app-anime-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AnimeCardComponent
  ],
  templateUrl: './anime-detail.html',
  styleUrl: './anime-detail.css'
})
export class AnimeDetailComponent implements OnInit {

  anime?: AnimeDetail;
  episodes: Episode[] = [];
  reviews: Review[] = [];

  recommendations: any[] = [];

  loading = true;
  error: string | null = null;

  selectedState: AnimeState = 'PENDIENTE';
  userScore: number | null = null;

  translatedSynopsis: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    private myListService: MyListService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'ID inválido.';
      this.loading = false;
      return;
    }

    this.animeService.getAnime(id).subscribe({
      next: (res) => {
        this.anime = res.data;

        if (this.anime?.synopsis) {
          this.translationService
            .translateToSpanish(this.anime.synopsis)
            .subscribe({
              next: (translated) => {
                this.translatedSynopsis = translated;
              },
              error: () => {
                this.translatedSynopsis = this.anime?.synopsis ?? null;
              }
            });
        }

        const existing = this.myListService.findById(id);
        if (existing) {
          this.selectedState = existing.state;
          this.userScore = existing.userScore ?? null;
        }

        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el anime.';
        this.loading = false;
      }
    });

    this.animeService.getEpisodes(id).subscribe({
      next: (res) => (this.episodes = res.data.slice(0, 20)),
      error: () => {}
    });

    this.animeService.getReviews(id).subscribe({
      next: (res) => {
        this.reviews = res.data.slice(0, 5);

        this.reviews.forEach((review) => {
          if (review.review) {
            this.translationService
              .translateToSpanish(review.review)
              .subscribe({
                next: (translated) => {
                  review.review = translated;
                },
                error: () => {}
              });
          }
        });
      },
      error: () => {}
    });

    this.animeService.getRecommendations(id).subscribe({
      next: (res) => {
        this.recommendations = res.data.map(r => r.entry);
      },
      error: () => {}
    });
  }

  saveToList() {
    if (!this.anime) return;

    this.myListService.upsertFromAnime(
      this.anime,
      this.selectedState,
      this.isFavorite,
      this.userScore
    );
  }

  toggleFavorite() {
    if (!this.anime) return;

    const existing = this.myListService.findById(this.anime.mal_id);
    if (existing) {
      this.myListService.toggleFavorite(existing.id);
    } else {
      this.myListService.upsertFromAnime(
        this.anime,
        this.selectedState,
        true,
        this.userScore
      );
    }
  }

  get isFavorite(): boolean {
    if (!this.anime) return false;
    return !!this.myListService.findById(this.anime.mal_id)?.favorite;
  }
}
