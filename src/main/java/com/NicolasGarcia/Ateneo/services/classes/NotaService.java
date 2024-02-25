package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Nota;
import com.NicolasGarcia.Ateneo.repositories.NotaRepository;
import com.NicolasGarcia.Ateneo.services.interfaces.NotaServiceInterface;

@Service
public class NotaService implements NotaServiceInterface {

	@Autowired
	public NotaRepository notaRepo;

	@Override
	public void crearNota(Nota nota) {
		notaRepo.save(nota);
	}

	@Override
	public void modificarNota(Nota nota) {
		notaRepo.save(nota);
	}

	@Override
	public List<Nota> buscarPorMateria(Long idMateria) {
		return notaRepo.findNotaByMateriaId(idMateria);
	}

	@Override
	public void borrarNota(Long id) {
		notaRepo.deleteById(id);
	}

}
