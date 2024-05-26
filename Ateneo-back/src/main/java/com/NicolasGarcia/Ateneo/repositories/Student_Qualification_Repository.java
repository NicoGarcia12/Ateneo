package com.NicolasGarcia.Ateneo.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NicolasGarcia.Ateneo.models.Student_Qualification;

@Repository
public interface Student_Qualification_Repository extends JpaRepository<Student_Qualification, UUID> {

	List<Student_Qualification> findByStudentId(UUID id_student);

	List<Student_Qualification> findByQualificationId(UUID id_qualification);

}
