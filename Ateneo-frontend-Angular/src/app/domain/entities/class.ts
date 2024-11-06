import { Absence } from './absence';
import { Subject } from './subject';

export interface Class {
    id: string;
    date: Date;
    subject: Subject;
    absences: Array<Absence>;
}
