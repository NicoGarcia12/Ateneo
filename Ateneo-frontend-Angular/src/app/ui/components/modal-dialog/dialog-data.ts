import { TemplateRef } from '@angular/core';

export interface DialogDataInterface {
    title: string;
    text?: string;
    contentTemplate?: TemplateRef<any>;
    secondaryButtonText: string;
    primaryButton: primaryButtonInterface;
}

interface primaryButtonInterface {
    text?: string;
    show: boolean;
    disabled?: boolean;
    loading?: boolean;
}
