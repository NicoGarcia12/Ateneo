package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;

import com.NicolasGarcia.Ateneo.models.Nota;

public interface NotaServiceInterface {

	public void crearNota(Nota nota);

	public void modificarNota(Nota nota);

	public List<Nota> buscarPorMateria(Long idMateria);

	public void borrarNota(Long id);
}
