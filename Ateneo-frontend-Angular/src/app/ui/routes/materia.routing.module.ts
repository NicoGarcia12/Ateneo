import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//   { path: ':id', component: MateriaDetailComponent },
//   { path: 'form', component: MateriaFormComponent },
  // Otras rutas específicas de Materia
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriaRoutingModule { }
