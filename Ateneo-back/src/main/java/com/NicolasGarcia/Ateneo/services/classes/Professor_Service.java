package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Professor;
import com.NicolasGarcia.Ateneo.repositories.Professor_Repository;
import com.NicolasGarcia.Ateneo.services.interfaces.Professor_Service_Interface;

@Service
public class Professor_Service implements Professor_Service_Interface {

	@Autowired
	public Professor_Repository professor_repository;

	@Override
	public void createProfessor(Professor professor) {
		professor_repository.save(professor);
	}

	@Override
	public List<Professor> seeProfessors() {
		return professor_repository.findAll();
	}

	@Override
	public Professor findByEmail(String email) {
		return professor_repository.findByEmail(email);
	}

	@Override
	public Professor findById(UUID id) {
		return professor_repository.findById(id).orElse(null);
	}

	@Override
	public void modifyProfessor(Professor professor) {
		professor_repository.save(professor);
	}

	@Override
	public void deleteProfessor(UUID id) {
		professor_repository.deleteById(id);
	}

}
