import { Component } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { getReadingList, markBookAsFinished, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) { }

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markAsFinished(item: ReadingListItem) {
    const updateItem = {
      finished: true,
      finishedDate: new Date().toISOString(),
      ...item
    }
    const update: Update<any> = {
      id: item.bookId,
      changes: updateItem
    }
    this.store.dispatch(markBookAsFinished({ update }));
  }
}
