export interface IPagination {
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ListOptions {
  id?: number;
  page?: number;
  limit?: number;
  order?: OrderOptions;
  userId?: number;
  paginate?: boolean;
}

export interface OrderOptions {
  by?: string;
  type?: string;
}

export interface ButtonOptions {
  text: string;
  cssClass?: string;
  icon?: string;
  action?(): any;
}
