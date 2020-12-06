export enum SearchType {
  Authority = 'authority',
  Inquest = 'inquest',
}

export interface DataWithCount<T> {
  count: number;
  data: T;
}

export type OptionValue = string | number;

export interface Option<T extends OptionValue> {
  value: T;
  label: React.ReactNode;
}

export interface OptionGroup<T extends OptionValue> {
  label: React.ReactNode;
  options: Option<T>[];
}
