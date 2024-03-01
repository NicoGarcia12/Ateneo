package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Nota_Alumno;

@Repository
public interface Nota_AlumnoRepository extends JpaRepository<Nota_Alumno, Long> {

	List<Nota_Alumno> findByAlumnoId(Long idAlumno);

	List<Nota_Alumno> findByNotaId(Long idNota);

}
