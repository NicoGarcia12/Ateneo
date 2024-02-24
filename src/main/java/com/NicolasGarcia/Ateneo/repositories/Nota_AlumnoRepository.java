package com.NicolasGarcia.Ateneo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Nota_Alumno;

@Repository
public interface Nota_AlumnoRepository extends JpaRepository<Nota_Alumno, Long>{

}
