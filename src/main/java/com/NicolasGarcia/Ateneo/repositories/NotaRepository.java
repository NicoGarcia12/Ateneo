package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Nota;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {

	List<Nota> findNotaByMateriaId(Long idMateria);

}
