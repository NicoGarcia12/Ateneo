package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.NicolasGarcia.Ateneo.models.Qualification;

public interface Qualification_Service_Interface {

	public void createQualification(Qualification qualification);

	public void modifyQualification(Qualification qualification);

	public List<Qualification> findBySubject(UUID id_subject);

	public void deleteQualification(UUID id);
}
