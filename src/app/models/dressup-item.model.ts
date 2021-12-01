import { DressupCategory } from './dressup-category.enum';

export interface IDressupItem {
  id: number;
  characterId?: number;
  category?: DressupCategory;
  url: string;
}

export class DressupItem implements IDressupItem {
  id = 0;
  characterId = undefined;
  category = undefined;
  url = '';

  constructor(dressupItem: IDressupItem) {
    Object.assign(this, dressupItem);
  }
}
