package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Absence;


@Repository
public interface Absence_Repository extends JpaRepository<Absence, UUID> {

	@Query("SELECT a FROM Absence a WHERE a._class.id = :id_class")
    List<Absence> findByClassId(@Param("id_class") UUID id_class);

}

