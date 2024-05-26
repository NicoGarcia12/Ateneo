package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.NicolasGarcia.Ateneo.models.Student_Qualification;

public interface Student_Qualification_Service_Interface {

	public void createStudentQualification(Student_Qualification nota_alumno);

	public void modifyStudentQualification(Student_Qualification nota_alumno);

	public Student_Qualification findById(UUID id);

	public List<Student_Qualification> findByStudent(UUID id_student);

	public List<Student_Qualification> findByQualification(UUID id_qualification);

	public void deleteStudentQualification(UUID id);

}
