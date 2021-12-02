import { AfterViewInit, Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { fromEvent, throttle, throttleTime } from 'rxjs';
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
export class DressupOptionsComponent implements OnInit, AfterViewInit {
  readonly DressupCategory = DressupCategory;
  readonly DressupCategoriesValues = Enum.GetEnumValues(DressupCategory);

  chosenOption: DressupCategoryString = 'Top';

  dressupItems: DressupItem[] = [];

  constructor() {}

  // xxxxxxx = htmlelement[] = [];

  ngOnInit(): void {
    // document.eventlistClick () => czy kliknales na element ktory ma attrybut jakis tam dragable - jezeli tak - to: dodaj do listy elements (if nie ma go tam)
    // this.dressupItems = [{}];
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    const hiddenPlaceholderImage = document.querySelector(
      '#hidden-placeholder-image'
    );

    if (!hiddenPlaceholderImage) {
      throw new Error('hidden-placeholder-image not found in HTML');
    }

    let items = document.querySelectorAll(
      '.test-item'
    ) as NodeListOf<HTMLElement>;
    console.log('items: ', items);

    const offsets: Offsets = {
      offsetX: 0,
      offsetY: 0,
    };

    items.forEach((item) => {
      fromEvent(item, 'dragstart').subscribe((e) => {
        const dragEvent = e as any;
        // console.log('dragstart ', dragEvent);
        // console.log('offsetX ', dragEvent.offsetX);
        // console.log('offsetY ', dragEvent.offsetY);

        offsets.offsetX = dragEvent.offsetX;
        offsets.offsetY = dragEvent.offsetY;

        // item.style.opacity = '0';

        dragEvent.dataTransfer?.setDragImage(hiddenPlaceholderImage, 0, 0);
      });

      // 50Hz -> 50/s
      // 50/1000

      fromEvent(item, 'drag')
        .pipe(throttleTime(5))
        .subscribe((e) => {
          const dragEvent = e as DragEvent;

          this._setElementPostion(
            dragEvent.target as HTMLElement,
            dragEvent,
            offsets
          );
        });

      fromEvent(item, 'dragend').subscribe((e) => {
        // console.log('dragend ', e);
        const dragEvent = e as DragEvent;

        item.style.opacity = '1';

        this._setElementPostion(
          dragEvent.target as HTMLElement,
          dragEvent,
          offsets
        );
      });
    });
  }

  private _setElementPostion(
    element: HTMLElement,
    dragEvent: DragEvent,
    offsets: Offsets
  ) {
    // element.style.transform = `translate3d(${
    //   dragEvent.x - offsets.offsetX
    // }px, ${dragEvent.y - offsets.offsetY}px, 0px)`;
    element.style.top = `${dragEvent.y - offsets.offsetY}px`;
    element.style.left = `${dragEvent.x - offsets.offsetX}px`;
  }

  setChosenOption(option: DressupCategoryString): void {
    this.chosenOption = option;
  }

  exportImage() {
    html2canvas(document.querySelector('#capture') as any).then((canvas) => {
      const link = document.createElement('a');

      link.download = 'filename.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
}
