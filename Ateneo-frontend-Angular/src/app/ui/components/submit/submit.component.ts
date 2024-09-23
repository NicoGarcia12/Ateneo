import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss']
})
export class SubmitComponent {
    @Input() public type: string = 'submit';
    @Input() public disabled: boolean = false;
    @Input() public loading: boolean = false;
    @Input() public withText: boolean = true;
    @Input() public class: 'primary' | 'secondary' = 'primary';
}
