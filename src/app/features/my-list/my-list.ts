import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyListService } from '../../core/services/my-list/my-list.service';
import { AnimeCardComponent } from '../../shared/anime-card/anime-card';
import { MyListItem, AnimeState } from '../../core/models/anime.models';

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [CommonModule, AnimeCardComponent, FormsModule],
  templateUrl: './my-list.html',
  styleUrl: './my-list.css'
})
export class MyListComponent {
  states: (AnimeState | 'FAVORITOS' | 'TODOS')[] = [
    'TODOS',
    'FAVORITOS',
    'PENDIENTE',
    'VIENDO',
    'COMPLETADO',
    'ABANDONADO'
  ];

  selectedFilter: AnimeState | 'FAVORITOS' | 'TODOS' = 'TODOS';

  searchText: string = '';
  sortOption: string = 'none';
  typeFilter: string = 'all';

  constructor(private myListService: MyListService) {}

  get items(): MyListItem[] {
    let list = [...this.myListService.getAll()];

    if (this.selectedFilter !== 'TODOS') {
      if (this.selectedFilter === 'FAVORITOS') {
        list = list.filter(i => i.favorite);
      } else {
        list = list.filter(i => i.state === this.selectedFilter);
      }
    }

    if (this.typeFilter !== 'all') {
      list = list.filter(i => i.type === this.typeFilter);
    }

    if (this.searchText.trim().length > 0) {
      const text = this.searchText.toLowerCase();
      list = list.filter(i => i.title.toLowerCase().includes(text));
    }

    switch (this.sortOption) {
      case 'apiScore':
        list.sort((a, b) => (b.apiScore ?? 0) - (a.apiScore ?? 0));
        break;

      case 'userScore':
        list.sort((a, b) => (b.userScore ?? 0) - (a.userScore ?? 0));
        break;

      case 'favoritesFirst':
        list.sort((a, b) => Number(b.favorite) - Number(a.favorite));
        break;

      case 'recent':
        list.sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0));
        break;

      case 'state':
        const order = ['PENDIENTE', 'VIENDO', 'COMPLETADO', 'ABANDONADO'];
        list.sort((a, b) => order.indexOf(a.state) - order.indexOf(b.state));
        break;
    }

    return list;
  }

  toggleFavorite(item: MyListItem) {
    this.myListService.toggleFavorite(item.id);
  }

  remove(item: MyListItem) {
    this.myListService.remove(item.id);
  }

  exportList() {
  const data = this.myListService.exportToJson();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'animewatch-my-list.json';
  a.click();

  URL.revokeObjectURL(url);
}

importList(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const success = this.myListService.importFromJson(
      reader.result as string
    );

    if (!success) {
      alert('Archivo inválido ❌');
    }
  };

  reader.readAsText(file);
}

}
