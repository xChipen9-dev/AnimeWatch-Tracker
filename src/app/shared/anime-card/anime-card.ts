import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Anime, MyListItem } from '../../core/models/anime.models';

@Component({
  selector: 'app-anime-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './anime-card.html',
  styleUrl: './anime-card.css'
})
export class AnimeCardComponent {
  @Input() anime?: Anime;
  @Input() item?: MyListItem; 
  @Output() favoriteClick = new EventEmitter<void>();

  get imageUrl(): string | undefined {
    if (this.item) return this.item.imageUrl;
    if (!this.anime) return undefined;

    return (
      this.anime.images.jpg.large_image_url ||
      this.anime.images.jpg.image_url
    );
  }

  get title(): string {
    return this.item?.title || this.anime?.title || '';
  }

  get score(): number | null {
    return this.item?.apiScore ?? this.anime?.score ?? null;
  }
}
