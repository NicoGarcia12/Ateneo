package com.NicolasGarcia.Ateneo.services.interfaces;

import java.util.List;
import java.util.UUID;

import com.NicolasGarcia.Ateneo.models.Absence;

public interface Absence_Service_Interface {

	public void createAbsence(Absence absence);

	public List<Absence> findByClass(UUID id_class);

	public void deleteAbsence(UUID id);

}
