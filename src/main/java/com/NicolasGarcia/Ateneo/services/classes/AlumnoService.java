package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Alumno;
import com.NicolasGarcia.Ateneo.repositories.AlumnoRepository;
import com.NicolasGarcia.Ateneo.services.interfaces.AlumnoServiceInterface;

@Service
public class AlumnoService implements AlumnoServiceInterface{
	
	@Autowired
	public AlumnoRepository alumnoRepo;

	@Override
	public void crearAlumno(Alumno alumno) {
		alumnoRepo.save(alumno);
	}

	@Override
	public List<Alumno> verAlumnos() {
		return alumnoRepo.findAll();
	}

	@Override
	public Alumno verAlumno(Long id) {
		return alumnoRepo.findById(id).orElse(null);
	}

	@Override
	public void modificarAlumno(Alumno alumno) {
		alumnoRepo.save(alumno);		
	}

	@Override
	public void borrarAlumnoMateria(Long idMateria, Long idAlumno) {
		alumnoRepo.deleteAlumnoByMateria(idAlumno, idMateria);		
	}

}
