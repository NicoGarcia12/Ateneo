package com.NicolasGarcia.Ateneo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.NicolasGarcia.Ateneo.SessionProfesor;
import com.NicolasGarcia.Ateneo.models.Profesor;
import com.NicolasGarcia.Ateneo.services.classes.ProfesorService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class ProfesorController {

	@Autowired
	public ProfesorService profesorService;

	@GetMapping("/")
	public String Login() {
		return "login";
	}

	@PostMapping("/")
	public String PostLogin(HttpServletResponse response, RedirectAttributes redirectAttributes,
			@ModelAttribute Profesor profesor) {
		if (profesor.getContraseña() != null && profesor.getEmail() != null) {
			Profesor profesor2 = profesorService.buscarPorEmail(profesor.getEmail());
			if (profesor2 != null) {
				if (profesor.getContraseña().equals(profesor2.getContraseña())) {
					Cookie cookie = new Cookie("miCookie", SessionProfesor.generarCodigoCookieProfesor(profesor2.getId()));

					// Establecer la fecha de expiración en 30 días (en segundos)
					int maxAge = 30 * 24 * 60 * 60; // 30 días
					cookie.setMaxAge(maxAge);

					// Agregar la cookie a la respuesta
					response.addCookie(cookie);
					redirectAttributes.addFlashAttribute("mensaje", "¡CORRECTO!");
					return "redirect:/"; // REDIRECCIONAR A LAS MATERIAS Y BORRAR MSJE DE ARRIBA
				} else {
					redirectAttributes.addFlashAttribute("mensaje", "¡Contraseña incorrecta, vuelva a intentar!");
					return "redirect:/";
				}
			} else {
				redirectAttributes.addFlashAttribute("mensaje", "¡Email no registrado!");
				return "redirect:/";
			}
		} else {
			redirectAttributes.addFlashAttribute("mensaje", "¡Debe enviar todos los datos!");
			return "redirect:/";
		}

	}

	@GetMapping("/registro-profesor")
	public String Registro() {
		return "registro-profesor";
	}

	@PostMapping("/registro-profesor")
	public String PostRegistro(RedirectAttributes redirectAttributes, @ModelAttribute Profesor profesor) {
		if (profesor.getApellidos() != null && profesor.getContraseña() != null && profesor.getEmail() != null
				&& profesor.getNombres() != null) {
			Profesor profesor2 = profesorService.buscarPorEmail(profesor.getEmail());
			if (profesor2 != null) {
				redirectAttributes.addFlashAttribute("mensaje", "¡Email ya registrado, intente con otro!");
				return "redirect:/registro-profesor";
			} else {
				profesorService.crearProfesor(profesor);
				redirectAttributes.addFlashAttribute("mensaje", "¡Usuario creado correctamente!");
				return "redirect:/";
			}
		} else {
			redirectAttributes.addFlashAttribute("mensaje", "¡Debe enviar todos los datos!");
			return "redirect:/registro-profesor";
		}

	}
}
