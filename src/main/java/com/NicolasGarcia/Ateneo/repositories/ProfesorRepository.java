package com.NicolasGarcia.Ateneo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Profesor;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

	Profesor findByEmail(String email);

}
