import { IEvent } from '../types';

export class EventEntity {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  type: string;
  categoryId: number;
  constructor(data: IEvent) {
    Object.assign(this, data);

    this.id = Number(data.id);
    this.categoryId = Number(data.categoryId);
  }
}
