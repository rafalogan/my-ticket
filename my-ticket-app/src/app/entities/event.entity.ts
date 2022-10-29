import { FilesEvents, IEvent } from '../types';

export class EventEntity {
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

  constructor(data: IEvent) {
    Object.assign(this, data);

    this.id = Number(data.id);
    this.popularity = Number(data.popularity) / 1000;
    this.releaseDate = new Date(data.releaseDate);
    this.voteAverage = Number(data.voteAverage) / 10;
    this.voteCount = Number(data.voteCount);
    this.categoryId = Number(data.categoryId);
  }
}
