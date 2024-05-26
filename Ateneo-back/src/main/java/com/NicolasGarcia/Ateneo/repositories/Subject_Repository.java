package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Student;
import com.NicolasGarcia.Ateneo.models.Subject;

@Repository
public interface Subject_Repository extends JpaRepository<Subject, UUID> {

	List<Subject> findByProfessorId(UUID id_professor);

	@Query("SELECT m.students FROM Subject m WHERE m.id = :subjectId")
	List<Student> findAllStudentsBySubjectId(@Param("subjectId") UUID subjectId);

}
