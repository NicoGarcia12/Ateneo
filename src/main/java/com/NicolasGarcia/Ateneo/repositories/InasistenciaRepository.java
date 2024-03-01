package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Inasistencia;

@Repository
public interface InasistenciaRepository extends JpaRepository<Inasistencia, Long> {

	List<Inasistencia> findByClaseId(Long idClase);

}
