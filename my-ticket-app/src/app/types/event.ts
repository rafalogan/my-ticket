import { IPagination } from 'app/types/i-shared';

export interface IEvent {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  type: string;
  categoryId: number;
}

export interface Events extends IPagination {
  data: IEvent[];
}
