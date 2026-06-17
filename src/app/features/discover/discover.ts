import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeDetail } from '../../core/models/anime.models';
import { AnimeService } from '../../core/services/anime/anime.service';
import { MyListService } from '../../core/services/my-list/my-list.service';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './discover.html',
  styleUrl: './discover.css'
})
export class DiscoverComponent {

  anime?: AnimeDetail;
  loading = true;
  error: string | null = null;

  constructor(
    private animeService: AnimeService,
    private myListService: MyListService
  ) {}

  ngOnInit() {
    this.loadRandomAnime();
  }

  loadRandomAnime() {
    this.loading = true;
    this.error = null;

    this.animeService.getRandomAnime().subscribe({
      next: (res) => {
        this.anime = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar un anime aleatorio.';
        this.loading = false;
      }
    });
  }

  likeAnime() {
    if (!this.anime) return;

    this.myListService.upsertFromAnime(
      this.anime,
      'PENDIENTE',
      true,
      null
    );

    this.loadRandomAnime();
  }

  skipAnime() {
    this.loadRandomAnime();
  }
}
