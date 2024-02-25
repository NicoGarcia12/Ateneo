package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Alumno;
import com.NicolasGarcia.Ateneo.models.Materia;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {

	List<Materia> findByProfesorId(Long idProfesor);

	@Query("SELECT m.alumnos FROM Materia m WHERE m.id = :materiaId")
	List<Alumno> findAllAlumnosByMateriaId(@Param("materiaId") Long materiaId);

}
