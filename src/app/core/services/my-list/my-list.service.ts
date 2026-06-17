import { Injectable } from '@angular/core';
import { MyListItem, AnimeState, AnimeDetail } from '../../models/anime.models';

const STORAGE_KEY = 'animewatch_my_list';

@Injectable({
  providedIn: 'root'
})
export class MyListService {
  private items: MyListItem[] = [];

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.items = saved ? JSON.parse(saved) : [];
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
  }

  getAll(): MyListItem[] {
    return this.items;
  }

  getFavorites(): MyListItem[] {
    return this.items.filter(i => i.favorite);
  }

  getByState(state: AnimeState): MyListItem[] {
    return this.items.filter(i => i.state === state);
  }

  findById(id: number): MyListItem | undefined {
    return this.items.find(i => i.id === id);
  }

  remove(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  toggleFavorite(id: number) {
    const item = this.findById(id);
    if (!item) return;
    item.favorite = !item.favorite;
    this.save();
  }

  upsertFromAnime(
    anime: AnimeDetail,
    state: AnimeState,
    favorite: boolean,
    userScore?: number | null
  ) {
    const existing = this.findById(anime.mal_id);

    if (existing) {
      existing.state = state;
      existing.favorite = favorite;
      existing.userScore = userScore ?? null;
    } else {
      this.items.push({
        id: anime.mal_id,
        title: anime.title,
        imageUrl: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
        apiScore: anime.score,
        state,
        favorite,
        userScore: userScore ?? null,
        type: anime.type?.toLowerCase() ?? 'unknown',
        addedAt: Date.now()
      });

    }

    this.save();
  }

  exportToJson(): string {
    return JSON.stringify(this.items, null, 2);
  }

  importFromJson(json: string): boolean {
    try {
      const data = JSON.parse(json);

      if (!Array.isArray(data)) return false;

      const valid = data.every(item =>
        typeof item.id === 'number' &&
        typeof item.title === 'string' &&
        typeof item.state === 'string'
      );

      if (!valid) return false;

      this.items = data;
      this.save();
      return true;
    } catch {
      return false;
    }
  }

}
