import { Component, OnInit } from '@angular/core';
import {
  fromEvent,
  switchMap,
  map,
  takeUntil,
  last,
  combineLatest,
  tap,
} from 'rxjs';

type Option = 'top' | 'bottom' | 'shoes' | 'hair' | 'accessories';
@Component({
  selector: 'app-dressup-options',
  templateUrl: './dressup-options.component.html',
  styleUrls: ['./dressup-options.component.scss'],
})
export class DressupOptionsComponent implements OnInit {
  readonly options: Option[] = [
    'top',
    'bottom',
    'shoes',
    'hair',
    'accessories',
  ];

  chosenOption: Option = 'top';
  isDown: boolean = false;
  offset = [0, 0];

  constructor() {}

  ngOnInit(): void {}

  setChosenOption(option: Option): void {
    this.chosenOption = option;
  }
}
