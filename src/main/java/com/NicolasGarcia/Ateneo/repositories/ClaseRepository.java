package com.NicolasGarcia.Ateneo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Clase;

@Repository
public interface ClaseRepository extends JpaRepository<Clase, Long>{

}
