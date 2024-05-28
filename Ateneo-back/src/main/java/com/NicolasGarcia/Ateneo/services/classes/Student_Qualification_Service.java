package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Student_Qualification;
import com.NicolasGarcia.Ateneo.repositories.Student_Qualification_Repository;
import com.NicolasGarcia.Ateneo.services.interfaces.Student_Qualification_Service_Interface;

@Service
public class Student_Qualification_Service implements Student_Qualification_Service_Interface {

	@Autowired
	public Student_Qualification_Repository student_qualification_repository;

	@Override
	public void createStudentQualification(Student_Qualification student_qualification) {
		student_qualification_repository.save(student_qualification);
	}

	@Override
	public void modifyStudentQualification(Student_Qualification student_qualification) {
		student_qualification_repository.save(student_qualification);
	}

	@Override
	public Student_Qualification findById(UUID id) {
		return student_qualification_repository.findById(id).orElse(null);
	}

	@Override
	public List<Student_Qualification> findByStudent(UUID id_student) {
		return student_qualification_repository.findByStudentId(id_student);
	}

	@Override
	public List<Student_Qualification> findByQualification(UUID id_qualification) {
		return student_qualification_repository.findByQualificationId(id_qualification);
	}

	@Override
	public void deleteStudentQualification(UUID id) {
		student_qualification_repository.deleteById(id);
	}

}
