package com.NicolasGarcia.Ateneo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.NicolasGarcia.Ateneo.models.Alumno;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {

}
