package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Absence;


@Repository
public interface Absence_Repository extends JpaRepository<Absence, UUID> {

	List<Absence> findByClassId(UUID id_class);

}

