import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'anime/:id',
    loadComponent: () =>
      import('./features/anime-detail/anime-detail').then(
        m => m.AnimeDetailComponent
      )
  },
  {
    path: 'mi-lista',
    loadComponent: () =>
      import('./features/my-list/my-list').then(m => m.MyListComponent)
  },
  {
    path: 'estadisticas',
    loadComponent: () =>
      import('./features/statistics/statistics').then(
        m => m.StatisticsComponent
      )
  },
  {
    path: 'descubrir',
    loadComponent: () =>
      import('./features/discover/discover').then(
        m => m.DiscoverComponent
      )
  },
  {
    path: 'tendencias',
    loadComponent: () =>
      import('./features/tendencias/tendencias').then(
        m => m.TendenciasComponent
      )
  },

  {
    path: '**',
    redirectTo: ''
  }
];
