export interface ICategory {
  id: number;
  name: string;
  description: string;
  url?: string;
  active: boolean;
  subCategories: ICategory[];
}
