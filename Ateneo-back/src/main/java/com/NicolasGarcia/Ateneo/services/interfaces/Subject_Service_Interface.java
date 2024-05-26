package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.NicolasGarcia.Ateneo.models.Student;
import com.NicolasGarcia.Ateneo.models.Subject;

public interface Subject_Service_Interface {

	public void createSubject(Subject subject);

	public Subject findById(UUID id);

	public List<Subject> findByProfessor(UUID id_professor);

	public List<Student> findStudentsBySubject(UUID id_subject);

	public void modifySubject(Subject subject);

	public void deleteSubject(UUID id);
}
