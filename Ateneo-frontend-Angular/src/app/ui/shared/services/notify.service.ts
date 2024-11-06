import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type Severity = 'error' | 'info' | 'warning' | 'success';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {
    public constructor(
        public snackBar: MatSnackBar,
        private zone: NgZone
    ) {}

    public notify(notification: string, severity: Severity = 'error', button: string | undefined = undefined, duration: number = 4): void {
        if (notification === undefined) {
            notification = 'No se pudo conectar con el servidor, intente de nuevo más tarde';
        }
        this.zone.run((): void => {
            this.snackBar.open(notification, button, {
                duration: duration * 1000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: [severity]
            });
        });
    }
}
