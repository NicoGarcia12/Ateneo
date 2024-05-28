package com.NicolasGarcia.Ateneo.services.classes;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NicolasGarcia.Ateneo.models.Class;
import com.NicolasGarcia.Ateneo.repositories.Class_Repository;
import com.NicolasGarcia.Ateneo.services.interfaces.Class_Service_Interface;

@Service
public class Class_Service implements Class_Service_Interface {

	@Autowired
	public Class_Repository class_repository;

	@Override
	public void createClass(Class _class) {
		class_repository.save(_class);

	}

	@Override
	public Class findById(UUID id) {
		return class_repository.findById(id).orElse(null);
	}

	@Override
	public List<Class> findBySubject(UUID id_subject) {
		return class_repository.findBySubjectId(id_subject);
	}

	@Override
	public void modifyClass(Class _class) {
		class_repository.save(_class);
	}

	@Override
	public void deleteClass(UUID id) {
		class_repository.deleteById(id);
	}

}
