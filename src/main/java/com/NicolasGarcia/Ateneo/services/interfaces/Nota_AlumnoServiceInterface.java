package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;

import com.NicolasGarcia.Ateneo.models.Nota_Alumno;

public interface Nota_AlumnoServiceInterface {

	public void crearNota(Nota_Alumno nota_alumno);

	public void modificarNota(Nota_Alumno nota_alumno);

	public Nota_Alumno buscarPorId(Long id);

	public List<Nota_Alumno> buscarPorAlumno(Long idAlumno);

	public List<Nota_Alumno> buscarPorNota(Long idNota);

	public void borrarNota(Long id);

}
