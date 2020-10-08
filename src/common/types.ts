export interface MenuItem {
  value: string;
  label: string;
}

export interface MenuItemGroup {
  label: string;
  items: MenuItem[];
}
