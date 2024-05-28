package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Student;
import com.NicolasGarcia.Ateneo.models.Subject;
import com.NicolasGarcia.Ateneo.repositories.Subject_Repository;
import com.NicolasGarcia.Ateneo.services.interfaces.Subject_Service_Interface;

@Service
public class Subject_Service implements Subject_Service_Interface {

	@Autowired
	public Subject_Repository subject_repository;

	@Override
	public void createSubject(Subject subject) {
		subject_repository.save(subject);
	}

	@Override
	public Subject findById(UUID id) {
		return subject_repository.findById(id).orElse(null);
	}

	@Override
	public List<Subject> findByProfessor(UUID id_professor) {
		return subject_repository.findByProfessorId(id_professor);
	}

	@Override
	public List<Student> findStudentsBySubject(UUID id_subject) {
		return subject_repository.findAllStudentsBySubjectId(id_subject);
	}

	@Override
	public void modifySubject(Subject subject) {
		subject_repository.save(subject);
	}

	@Override
	public void deleteSubject(UUID id) {
		subject_repository.deleteById(id);
	}

}
