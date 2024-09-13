import { Component, OnInit, OnDestroy } from '@angular/core';

interface Card {
  title: string;
  content: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  public cards: Card[] = [
    {
      title: 'Gestión de Materias',
      content:
        'Organiza y administra tus materias de forma rápida y eficiente. Accede a toda la información fácilmente.',
    },
    {
      title: 'Calificaciones Simplificadas',
      content:
        'Registra y calcula las notas finales de tus alumnos en simples pasos, de manera sencilla.',
    },
    {
      title: 'Registro de Asistencia',
      content:
        'Controla la asistencia de tus estudiantes con un registro preciso y fácil de consultar.',
    },
    {
      title: 'Gestión de Estudiantes',
      content:
        'Centraliza y organiza la información de tus estudiantes, accediendo a sus datos y notas fácilmente.',
    },
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
    this.currentIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.resetAutoSlide();
  }
}
