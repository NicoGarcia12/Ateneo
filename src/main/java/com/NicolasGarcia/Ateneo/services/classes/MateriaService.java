package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Alumno;
import com.NicolasGarcia.Ateneo.models.Materia;
import com.NicolasGarcia.Ateneo.repositories.MateriaRepository;
import com.NicolasGarcia.Ateneo.services.interfaces.MateriaServiceInterface;

@Service
public class MateriaService implements MateriaServiceInterface {

	@Autowired
	public MateriaRepository materiaRepo;

	@Override
	public void crearMateria(Materia materia) {
		materiaRepo.save(materia);
	}

	@Override
	public Materia buscarPorId(Long id) {
		return materiaRepo.findById(id).orElse(null);
	}

	@Override
	public List<Materia> buscarPorProfesor(Long idProfesor) {
		return materiaRepo.findByProfesorId(idProfesor);
	}

	@Override
	public List<Alumno> buscarAlumnosPorMateria(Long id) {
		return materiaRepo.findAllAlumnosByMateriaId(id);
	}

	@Override
	public void modificarMateria(Materia materia) {
		materiaRepo.save(materia);
	}

	@Override
	public void borrarMateria(Long id) {
		materiaRepo.deleteById(id);
	}

}
