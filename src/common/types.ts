export type AuthorityOrInquest = 'authority' | 'inquest';

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
