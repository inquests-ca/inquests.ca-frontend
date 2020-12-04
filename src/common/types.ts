export enum SearchType {
  Authority = 'authority',
  Inquest = 'inquest',
}

export interface DataWithCount<T> {
  count: number;
  data: T;
}

export interface MenuItem {
  value: string;
  label: string;
}

export interface MenuItemGroup {
  label: string;
  items: MenuItem[];
}
