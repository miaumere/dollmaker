import { Component, OnInit } from '@angular/core';

type Option = 'top' | 'bottom' | 'shoes';
@Component({
  selector: 'app-dressup-options',
  templateUrl: './dressup-options.component.html',
  styleUrls: ['./dressup-options.component.scss'],
})
export class DressupOptionsComponent implements OnInit {
  readonly options: Option[] = ['top', 'bottom', 'shoes'];

  chosenOption: Option = 'top';
  constructor() {}

  ngOnInit(): void {}

  setChosenOption(option: Option): void {
    this.chosenOption = option;
  }
}
