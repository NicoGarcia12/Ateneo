package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;
import java.util.UUID;

public interface Class_Service_Interface {

	public void createClass(com.NicolasGarcia.Ateneo.models.Class _class);

	public com.NicolasGarcia.Ateneo.models.Class findById(UUID id);

	public List<com.NicolasGarcia.Ateneo.models.Class> findBySubject(UUID id_subject);

	public void modifyClass(com.NicolasGarcia.Ateneo.models.Class _class);

	public void deleteClass(UUID id);

}
