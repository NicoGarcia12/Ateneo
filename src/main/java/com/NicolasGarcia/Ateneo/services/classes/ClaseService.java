package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Clase;
import com.NicolasGarcia.Ateneo.repositories.ClaseRepository;
import com.NicolasGarcia.Ateneo.services.interfaces.ClaseServiceInterface;

@Service
public class ClaseService implements ClaseServiceInterface {

	@Autowired
	public ClaseRepository claseRepo;

	@Override
	public void crearClase(Clase clase) {
		claseRepo.save(clase);
	}

	@Override
	public Clase buscarPorId(Long id) {
		return claseRepo.findById(id).orElse(null);
	}

	@Override
	public List<Clase> buscarPorMateria(Long idMateria) {
		return claseRepo.findByMateriaId(idMateria);
	}

	@Override
	public void modificarClase(Clase clase) {
		claseRepo.save(clase);
	}

	@Override
	public void eliminarClase(Long id) {
		claseRepo.deleteById(id);
	}

}
