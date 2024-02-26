package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;

import com.NicolasGarcia.Ateneo.models.Clase;

public interface ClaseServiceInterface {

	public void crearClase (Clase clase);
	
	public Clase buscarPorId (Long id);
	
	public List<Clase> buscarPorMateria (Long idMateria);
	
	public void modificarClase (Clase clase);
	
	public void eliminarClase (Long id);
	
}
