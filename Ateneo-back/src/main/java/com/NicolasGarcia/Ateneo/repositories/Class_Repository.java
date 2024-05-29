package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Class;

@Repository
public interface Class_Repository extends JpaRepository<Class, UUID> {

	List<Class> findBySubjectId(UUID id_subject);

}
