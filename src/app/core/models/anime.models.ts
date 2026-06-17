export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url?: string;
    };
  };
  score: number | null;
  type?: string;
  episodes?: number | null;
  status?: string | null;
    synopsis?: string | null;

}

export interface AnimeDetail extends Anime {
  synopsis: string | null;
  genres: { name: string }[];
  rating?: string | null;
  year?: number | null;
}

export interface Episode {
  mal_id: number;
  title: string;
  aired: string | null;
  filler: boolean;
  recap: boolean;
}

export interface Review {
  mal_id: number;
  date: string;
  review: string;
  score: number;
  user: {
    username: string;
  };
}

export type AnimeState =
  | 'PENDIENTE'
  | 'VIENDO'
  | 'COMPLETADO'
  | 'ABANDONADO';

export interface MyListItem {
  id: number;
  title: string;
  imageUrl: string;
  apiScore: number | null;
  state: AnimeState;
  favorite: boolean;
  userScore?: number | null;
  type: string;
addedAt?: number;

}
