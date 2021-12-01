import { Component, OnInit } from '@angular/core';
import {
  DressupCategory,
  DressupCategoryString,
} from 'src/app/models/dressup-category.enum';
import { DressupItem } from 'src/app/models/dressup-item.model';
import { Enum } from 'src/utils/enum.utils';

@Component({
  selector: 'app-dressup-options',
  templateUrl: './dressup-options.component.html',
  styleUrls: ['./dressup-options.component.scss'],
})
export class DressupOptionsComponent implements OnInit {
  readonly DressupCategory = DressupCategory;
  readonly DressupCategoriesValues = Enum.GetEnumValues(DressupCategory);

  chosenOption: DressupCategoryString = 'Top';
  isDown: boolean = false;
  offset = [0, 0];

  dressupItems: DressupItem[] = [];

  constructor() {}

  ngOnInit(): void {
    // this.dressupItems = [{}];
  }

  setChosenOption(option: DressupCategoryString): void {
    this.chosenOption = option;
  }
}
