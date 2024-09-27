import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  undoAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoAdd),
      concatMap(({ book }) => {
        const { id, ...bookData } = book;
        return this.http.delete(`/api/reading-list/${id}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item: { ...bookData, bookId: id } })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item: { ...bookData, bookId: id } }))
          )
        )
      })
    )
  );

  undoRemove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoRemove),
      concatMap(({ item }) => {
        const { bookId, ...itemData } = item;
        return this.http.post('/api/reading-list', item).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book: { ...itemData, id: bookId } })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book: { ...itemData, id: bookId } }))
          )
        )
      }
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient) { }
}
