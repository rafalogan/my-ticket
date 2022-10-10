import { IID } from 'src/repositories/types';

export interface INewsletter extends IID {
  name?: string;
  email: string;
  active: boolean;
}
