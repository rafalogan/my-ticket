import { IPagination, ListOptions } from 'app/types/i-shared';

export interface IEvent {
  id: number;
  title: string;
  content: string;
  popularity: number;
  releaseDate: Date | string;
  voteAverage: number;
  voteCount: number;
  type: string;
  files: FilesEvents;
  categoryId: number;
}

export interface FilesEvents {
  poster?: FileEvent;
  cover?: FileEvent;
  videos?: FileEvent[];
  gallery?: FileEvent[];
}

export interface FileEvent {
  title: string;
  alt?: string;
  name: string;
  type: string;
  url: string;
  location: string;
}

export interface Events extends IPagination {
  data: IEvent[];
}

export interface EventsOptions extends ListOptions {
  type?: string;
}
