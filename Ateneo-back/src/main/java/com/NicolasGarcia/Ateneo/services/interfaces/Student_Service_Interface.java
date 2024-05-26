package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.NicolasGarcia.Ateneo.models.Student;

public interface Student_Service_Interface {

	public void create_student(Student student);

	public List<Student> see_students();

	public Student see_student(UUID id);

	public void modify_student(Student student);

	public void delete_student_subject(UUID id_subject, UUID id_student);
}
