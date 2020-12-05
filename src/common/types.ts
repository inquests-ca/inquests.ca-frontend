export enum SearchType {
  Authority = 'authority',
  Inquest = 'inquest',
}

export interface DataWithCount<T> {
  count: number;
  data: T;
}

// TODO: add generic typing for value.
export interface MenuItem {
  value: string;
  label: React.ReactNode;
}

export interface MenuItemGroup {
  label: React.ReactNode;
  items: MenuItem[];
}
