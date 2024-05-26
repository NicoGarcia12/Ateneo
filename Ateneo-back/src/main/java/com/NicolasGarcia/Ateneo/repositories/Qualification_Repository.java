package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Qualification;

@Repository
public interface Qualification_Repository extends JpaRepository<Qualification, UUID> {

	List<Qualification> findQualificationBySubjectId(UUID id_subject);

}

