import { IID } from './shared';

export interface ISale extends IID {
  ticketId: number;
  userId: number;
  palce: string;
}
