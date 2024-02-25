package com.NicolasGarcia.Ateneo.services.classes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Profesor;
import com.NicolasGarcia.Ateneo.repositories.ProfesorRepository;
import com.NicolasGarcia.Ateneo.services.interfaces.ProfesorServiceInterface;

@Service
public class ProfesorService implements ProfesorServiceInterface {

	@Autowired
	public ProfesorRepository profRepo;

	@Override
	public void crearProfesor(Profesor prof) {
		profRepo.save(prof);
	}

	@Override
	public Profesor buscarPorEmail(String email) {
		return profRepo.findByEmail(email);
	}

	@Override
	public Profesor buscarPorId(Long id) {
		return profRepo.findById(id).orElse(null);
	}

	@Override
	public void modificarProfesor(Profesor prof) {
		profRepo.save(prof);
	}

}
