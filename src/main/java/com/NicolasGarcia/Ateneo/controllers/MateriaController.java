package com.NicolasGarcia.Ateneo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Cookie;

@Controller
public class MateriaController {

	@GetMapping("/materias")
	public String Materias(HttpServletRequest request, Model model) {
		String idProfesor = null; // Declarar la variable fuera del bloque if

		// Obtener todas las cookies de la solicitud
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
			// Iterar sobre todas las cookies para encontrar la que necesitas
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("miCookie")) {
					// Obtener el valor de la cookie
					String valorCookie = cookie.getValue();
//	                idProfesor = SessionProfesor.decodificarCookie(valorCookie);
					idProfesor = valorCookie;
					break;
				}
			}
		}

		if (idProfesor != null) {
			model.addAttribute("id", idProfesor);
			return "materias-profesor";
		} else {
			// Manejar el caso en el que no se encuentre la cookie o no se pueda decodificar
			return "redirect:/login"; // Redirigir a la página de inicio de sesión
		}
	}

}
