Accessibility issues
Lighthouse:
1) Buttons do not have an accessible name - [Fixed]
2) Background and foreground colors do not have a sufficient contrast ratio. - [Fixed]

Manual:
1) "<a (click)="searchExample()">JavaScript</a> was not keyboard focusable. - [Fixed]
2) To maintain logical tab order.

Code Improvements:
1) In book-search.component.ts create observables to get all books from store. Avoid subscribing manually since Async pipe will subscibe and unsubscribe avoiding memory leaks. - [Fixed]
2) removeFromReadingList(item), type for item is not mentioned. Just for being type safe and avoid any type issues.
3) Using two way data binding in book-search.component.ts - since we have only 1 input, we can avoid writing extra code which we did using reactive forms.
4) <img src="{{ b.coverUrl }}" />, use property binding instead of string interpolation. - [Fixed]