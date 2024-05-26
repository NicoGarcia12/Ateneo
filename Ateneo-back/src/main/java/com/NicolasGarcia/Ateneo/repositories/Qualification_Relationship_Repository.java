package com.NicolasGarcia.Ateneo.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Qualification_Relationship;

@Repository
public interface Qualification_Relationship_Repository extends JpaRepository<Qualification_Relationship, UUID> {

}