package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Absence;
import com.NicolasGarcia.Ateneo.repositories.Absence_Repository;
import com.NicolasGarcia.Ateneo.services.interfaces.Absence_Service_Interface;

@Service
public class Absence_Service implements Absence_Service_Interface {

	@Autowired
	public Absence_Repository absence_repository;

	@Override
	public void createAbsence(Absence absence) {
		absence_repository.save(absence);
	}

	@Override
	public List<Absence> findByClass(UUID id_class) {
		return absence_repository.findByClassId(id_class);
	}

	@Override
	public void deleteAbsence(UUID id) {
		absence_repository.deleteById(id);
	}

}
