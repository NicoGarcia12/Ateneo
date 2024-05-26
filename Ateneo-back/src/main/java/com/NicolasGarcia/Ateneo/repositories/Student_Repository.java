package com.NicolasGarcia.Ateneo.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Student;

@Repository
public interface Student_Repository extends JpaRepository<Student, UUID> {

}
