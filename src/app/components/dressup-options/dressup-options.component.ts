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

  mouseMove$ = fromEvent(document, 'mousemove');
  mouseUp$ = fromEvent(document, 'mouseup');

  draggableElements = document.getElementsByClassName('draggable');

  constructor() {}

  ngOnInit(): void {
    Array.from(this.draggableElements).forEach((x) =>
      this.createDraggableElement(x)
    );

    Array.from(this.draggableElements).forEach((element: any, i: any) => {
      element.addEventListener('mydragstart', () =>
        console.log(`mydragstart on element #${i}`)
      );

      element.addEventListener('mydragmove', (event: any) =>
        console.log(
          `mydragmove on element #${i}`,
          `delta: (${event.detail.deltaX}, ${event.detail.deltaY})`
        )
      );

      element.addEventListener('mydragend', (event: any) =>
        console.log(
          `mydragend on element #${i}`,
          `delta: (${event.detail.deltaX}, ${event.detail.deltaY})`
        )
      );
    });
  }

  setChosenOption(option: Option): void {
    this.chosenOption = option;
  }

  //

  createDraggableElement(element: any) {
    const mouseDown$ = fromEvent(element, 'mousedown');

    const dragStart$ = mouseDown$;
    const dragMove$ = dragStart$.pipe(
      switchMap((start: any) =>
        this.mouseMove$.pipe(
          map((moveEvent: any) => ({
            originalEvent: moveEvent,
            deltaX: moveEvent.pageX - start.pageX,
            deltaY: moveEvent.pageY - start.pageY,
            startOffsetX: start.offsetX,
            startOffsetY: start.offsetY,
          })),
          takeUntil(this.mouseUp$)
        )
      )
    );
    const dragEnd$ = dragStart$.pipe(
      switchMap((start: any) =>
        this.mouseMove$.pipe(
          map((moveEvent: any) => ({
            originalEvent: moveEvent,
            deltaX: moveEvent.pageX - start.pageX,
            deltaY: moveEvent.pageY - start.pageY,
            startOffsetX: start.offsetX,
            startOffsetY: start.offsetY,
          })),
          takeUntil(this.mouseUp$),
          last()
        )
      )
    );

    combineLatest([
      dragStart$.pipe(
        tap((event) => {
          element.dispatchEvent(
            new CustomEvent('mydragstart', { detail: event })
          );
        })
      ),
      dragMove$.pipe(
        tap((event) => {
          element.dispatchEvent(
            new CustomEvent('mydragmove', { detail: event })
          );
        })
      ),
      dragEnd$.pipe(
        tap((event) => {
          element.dispatchEvent(
            new CustomEvent('mydragend', { detail: event })
          );
        })
      ),
    ]).subscribe();

    dragMove$.subscribe((move: any) => {
      const offsetX = move.originalEvent.x - move.startOffsetX;
      const offsetY = move.originalEvent.y - move.startOffsetY;
      element.style.left = offsetX + 'px';
      element.style.top = offsetY + 'px';
    });
  }
}
