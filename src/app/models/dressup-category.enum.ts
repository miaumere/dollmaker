export enum DressupCategory {
  Top,
  Bottom,
  Shoes,
  Hair,
  Accessories,
}

export type DressupCategoryString = keyof typeof DressupCategory;
