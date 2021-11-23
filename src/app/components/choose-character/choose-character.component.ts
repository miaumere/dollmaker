import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-character',
  templateUrl: './choose-character.component.html',
  styleUrls: ['./choose-character.component.scss'],
})
export class ChooseCharacterComponent implements OnInit {
  readonly options: string[] = ['Mercury', 'Mars', 'Erde'];

  chosenCharacter: string = 'Mercury';
  constructor() {}

  ngOnInit(): void {}

  setChosenOption(option: string): void {
    this.chosenCharacter = option;
  }
}
