package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.NicolasGarcia.Ateneo.models.Professor;

public interface Professor_Service_Interface {

	public void createProfessor(Professor professor);

	public List<Professor> seeProfessors();

	public Professor findByEmail(String email);

	public Professor findById(UUID id);

	public void modifyProfessor(Professor professor);

	public void deleteProfessor(UUID id);

}
