package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Qualification;
import com.NicolasGarcia.Ateneo.repositories.Qualification_Repository;
import com.NicolasGarcia.Ateneo.services.interfaces.Qualification_Service_Interface;

@Service
public class Qualification_Service implements Qualification_Service_Interface {

	@Autowired
	public Qualification_Repository qualification_repository;

	@Override
	public void createQualification(Qualification qualification) {
		qualification_repository.save(qualification);
	}

	@Override
	public void modifyQualification(Qualification qualification) {
		qualification_repository.save(qualification);
	}

	@Override
	public List<Qualification> findBySubject(UUID id_subject) {
		return qualification_repository.findQualificationBySubjectId(id_subject);
	}

	@Override
	public void deleteQualification(UUID id) {
		qualification_repository.deleteById(id);
	}

}
