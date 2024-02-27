package com.NicolasGarcia.Ateneo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.NicolasGarcia.Ateneo.services.classes.ProfesorService;

@Controller
public class ProfesorController {
	
	@Autowired
	private ProfesorService profesorService;
	
	@GetMapping("/")
	public String Login(Model model) {
		return "login";
	}

}
