package com.NicolasGarcia.Ateneo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Materia;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long>{

}
