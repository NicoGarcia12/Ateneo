package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Inasistencia;
import com.NicolasGarcia.Ateneo.repositories.InasistenciaRepository;
import com.NicolasGarcia.Ateneo.services.interfaces.InasistenciaServiceInterface;

@Service
public class InasistenciaService implements InasistenciaServiceInterface {

	@Autowired
	public InasistenciaRepository inasistenciaRepo;

	@Override
	public void crearInasistencia(Inasistencia inasistencia) {
		inasistenciaRepo.save(inasistencia);
	}

	@Override
	public List<Inasistencia> buscarPorClase(Long idClase) {
		return inasistenciaRepo.findByClaseId(idClase);
	}

	@Override
	public void eliminarInasistencia(Long id) {
		inasistenciaRepo.deleteById(id);
	}

}
