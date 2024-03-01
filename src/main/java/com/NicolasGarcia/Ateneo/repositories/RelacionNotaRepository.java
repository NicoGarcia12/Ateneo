package com.NicolasGarcia.Ateneo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.RelacionNota;

@Repository
public interface RelacionNotaRepository extends JpaRepository<RelacionNota, Long> {

}
