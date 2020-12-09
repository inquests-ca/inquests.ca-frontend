export enum SearchType {
  Authority = 'authority',
  Inquest = 'inquest',
}

export interface DataWithCount<T> {
  count: number;
  data: T;
}

export type MenuItemValue = string | number;

export interface MenuItem<T extends MenuItemValue> {
  value: T;
  label: React.ReactNode;
}

export interface MenuItemGroup<T extends MenuItemValue> {
  label: React.ReactNode;
  items: MenuItem<T>[];
}
