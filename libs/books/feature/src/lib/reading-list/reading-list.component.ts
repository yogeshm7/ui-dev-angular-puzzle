import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, undoRemove } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { SnackBarService } from '../snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList);
  subscription: Subscription = new Subscription();
  constructor(private readonly store: Store, private snackBarService: SnackBarService) { }

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this.snackBarService.open('Removed');
    this.subscription.add(snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(undoRemove({ item }))
    }));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
