package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Nota_Alumno;
import com.NicolasGarcia.Ateneo.repositories.Nota_AlumnoRepository;
import com.NicolasGarcia.Ateneo.services.interfaces.Nota_AlumnoServiceInterface;

@Service
public class Nota_AlumnoService implements Nota_AlumnoServiceInterface {

	@Autowired
	public Nota_AlumnoRepository notaAlumnoRepo;

	@Override
	public void crearNota(Nota_Alumno nota_alumno) {
		notaAlumnoRepo.save(nota_alumno);
	}

	@Override
	public void modificarNota(Nota_Alumno nota_alumno) {
		notaAlumnoRepo.save(nota_alumno);
	}

	@Override
	public Nota_Alumno buscarPorId(Long id) {
		return notaAlumnoRepo.findById(id).orElse(null);
	}

	@Override
	public List<Nota_Alumno> buscarPorAlumno(Long idAlumno) {
		return notaAlumnoRepo.findByAlumnoId(idAlumno);
	}

	@Override
	public List<Nota_Alumno> buscarPorNota(Long idNota) {
		return notaAlumnoRepo.findByNotaId(idNota);
	}

	@Override
	public void borrarNota(Long id) {
		notaAlumnoRepo.deleteById(id);
	}

}
