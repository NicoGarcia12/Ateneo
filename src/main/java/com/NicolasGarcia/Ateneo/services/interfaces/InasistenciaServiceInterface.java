package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;

import com.NicolasGarcia.Ateneo.models.Inasistencia;

public interface InasistenciaServiceInterface {

	public void crearInasistencia(Inasistencia inasistencia);

	public List<Inasistencia> buscarPorClase(Long idClase);

	public void eliminarInasistencia(Long id);

}
