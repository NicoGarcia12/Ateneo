package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Clase;

@Repository
public interface ClaseRepository extends JpaRepository<Clase, Long> {

	List<Clase> findByMateriaId(Long idMateria);

}
