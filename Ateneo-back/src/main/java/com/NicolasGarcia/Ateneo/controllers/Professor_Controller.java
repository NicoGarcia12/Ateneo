package com.NicolasGarcia.Ateneo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.NicolasGarcia.Ateneo.models.Professor;
import com.NicolasGarcia.Ateneo.services.classes.Professor_Service;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class Professor_Controller {

	@Autowired
	private Professor_Service professor_service;

	@GetMapping("/profesor")
	private Professor verifyProffesor(@RequestParam String email) {
		System.out.println(email);
		Professor professor = professor_service.findByEmail(email);
		System.out.println(professor);
		return professor;
	}

}
