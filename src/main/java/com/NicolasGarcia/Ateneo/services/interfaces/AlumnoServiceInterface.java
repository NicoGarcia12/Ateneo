package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;

import com.NicolasGarcia.Ateneo.models.Alumno;

public interface AlumnoServiceInterface {

	public void crearAlumno(Alumno alumno);

	public List<Alumno> verAlumnos();

	public Alumno verAlumno(Long id);

	public void modificarAlumno(Alumno alumno);

	public void borrarAlumnoMateria(Long idMateria, Long idAlumno);
}
