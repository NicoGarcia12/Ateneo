package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Student;
import com.NicolasGarcia.Ateneo.models.Subject;
import com.NicolasGarcia.Ateneo.repositories.Student_Repository;
import com.NicolasGarcia.Ateneo.services.interfaces.Student_Service_Interface;

@Service
public class Student_Service implements Student_Service_Interface {

	@Autowired
	public Student_Repository student_repository;

	@Override
	public void create_student(Student student) {
		student_repository.save(student);
	}

	@Override
	public List<Student> see_students() {
		return student_repository.findAll();
	}

	@Override
	public Student see_student(UUID id) {
		return student_repository.findById(id).orElse(null);
	}

	@Override
	public void modify_student(Student student) {
		student_repository.save(student);
	}

	@Override
	public void delete_student_subject(UUID id_subject, UUID id_student) {
		Student student = student_repository.findById(id_student).orElse(null);
		if (student != null) {
			List<Subject> subjects = student.getSubjects();
			subjects.removeIf(subject -> subject.getId().equals(id_subject));
			student_repository.save(student);
		}
	}

}
