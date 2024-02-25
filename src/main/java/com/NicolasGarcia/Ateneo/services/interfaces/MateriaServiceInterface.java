package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;

import com.NicolasGarcia.Ateneo.models.Alumno;
import com.NicolasGarcia.Ateneo.models.Materia;

public interface MateriaServiceInterface {

	public void crearMateria(Materia materia);

	public Materia buscarPorId(Long id);
	
	public List<Materia> buscarPorProfesor(Long idProfesor);
	
	public List<Alumno> buscarAlumnosPorMateria(Long id);
	
	public void modificarMateria(Materia materia);
	
	public void borrarMateria(Long id);
}
