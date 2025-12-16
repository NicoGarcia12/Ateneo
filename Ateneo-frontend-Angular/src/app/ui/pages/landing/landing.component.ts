import { Component, OnInit, OnDestroy } from '@angular/core';

interface Card {
    title: string;
    content: string;
}

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
    public cards: Card[] = [
        {
            title: 'Gestión de Materias y Estudiantes',
            content: 'Crea, edita y administra tus materias. Vincula estudiantes y organiza toda tu información académica en un solo lugar.'
        },
        {
            title: 'Clases y Asistencia',
            content: 'Registra clases, controla la asistencia de tus estudiantes y consulta el historial completo de forma rápida.'
        },
        {
            title: 'Calificaciones',
            content: 'Carga, edita y consulta las notas de tus estudiantes. Visualiza el historial académico completo por materia.'
        },
        {
            title: 'Reportes Académicos',
            content: 'Genera reportes detallados en PDF o envíalos por email. Resúmenes académicos listos para compartir.'
        }
    ];

    public currentIndex: number = 0;
    private interval: any;

    public ngOnInit(): void {
        this.startAutoSlide();
    }

    public ngOnDestroy(): void {
        clearInterval(this.interval);
    }

    public startAutoSlide(): void {
        this.interval = setInterval(() => {
            this.nextCard();
        }, 15000);
    }

    public resetAutoSlide(): void {
        clearInterval(this.interval);
        this.startAutoSlide();
    }

    public nextCard(): void {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.resetAutoSlide();
    }

    public previousCard(): void {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.resetAutoSlide();
    }
}
