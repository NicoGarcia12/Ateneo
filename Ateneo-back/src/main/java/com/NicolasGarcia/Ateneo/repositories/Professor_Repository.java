package com.NicolasGarcia.Ateneo.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Professor;

@Repository
public interface Professor_Repository extends JpaRepository<Professor, UUID> {

	Professor findByEmail(String email);

}
