package com.NicolasGarcia.Ateneo.services.interfaces;

import com.NicolasGarcia.Ateneo.models.Profesor;

public interface ProfesorServiceInterface {

	public void crearProfesor(Profesor prof);

	public Profesor buscarPorEmail(String email);

	public Profesor buscarPorId(Long id);

	public void modificarProfesor(Profesor prof);

}
