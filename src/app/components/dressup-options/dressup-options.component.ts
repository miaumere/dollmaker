import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}

  setChosenOption(option: Option): void {
    this.chosenOption = option;
  }

  handleDragstart(event: any) {
    // FIXME
    console.log('drag starts');
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.dropEffect = 'copy';

    // setTimeout(() => {
    //   event.target.classList.add('hide');
    // }, 0);
  }

  moveAt(pageX: number, pageY: number, item: any) {
    // FIXME
    item.style.left = pageX - item.offsetWidth / 2 + 'px';
    item.style.top = pageY - item.offsetHeight / 2 + 'px';
  }

  dragEnter(event: any) {
    // FIXME
    event.preventDefault();
    event.target.classList.add('drag-over');
  }

  dragOver(event: any) {
    // FIXME
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    event.target.classList.add('drag-over');
  }

  dragLeave(event: any) {
    // FIXME
    event.target.classList.remove('drag-over');
  }

  drop(event: any) {
    event.target.classList.remove('drag-over');
    const id = event.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    event.target.appendChild(draggable);

    // let shiftX = event.clientX - ball.getBoundingClientRect().left;
    // let shiftY = event.clientY - ball.getBoundingClientRect().top;

    // draggable?.classList.remove('hide');
  }
}
