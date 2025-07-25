import { Absence } from './absence';
import { Subject } from './subject';

export interface Class {
    id: string;
    date: string;
    subjectId: string;
    subject?: Subject;
    absences: Absence[];
    description?: string;
}
