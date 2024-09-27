import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class SnackBarService {

    private snackBarRef;

    constructor(private snackBar: MatSnackBar) { }

    open(message) {
        this.snackBarRef = this.snackBar.open(message, 'Undo', {
            duration: 3000
        });
        return this.snackBarRef;
    }

}