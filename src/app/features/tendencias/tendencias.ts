import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../core/services/anime/anime.service';
import { AnimeCardComponent } from '../../shared/anime-card/anime-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  imports: [CommonModule, AnimeCardComponent, RouterLink],
  templateUrl: './tendencias.html',
  styleUrl: './tendencias.css'
})
export class TendenciasComponent implements OnInit {

  popular: any[] = [];
  topRated: any[] = [];
  airing: any[] = [];
  upcoming: any[] = [];

  loading = true;

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.loadTrends();
  }

  loadTrends() {
    this.loading = true;

    this.animeService.getPopularAnimes().subscribe((res: any) => {
      this.popular = res.data.slice(0, 15);
    });

    this.animeService.getTopRatedAnimes().subscribe((res: any) => {
      this.topRated = res.data.slice(0, 15);
    });

    this.animeService.getAiringAnimes().subscribe((res: any) => {
      this.airing = res.data.slice(0, 15);
    });

    this.animeService.getUpcomingAnimes().subscribe((res: any) => {
      this.upcoming = res.data.slice(0, 15);
      this.loading = false;
    });
  }
}
