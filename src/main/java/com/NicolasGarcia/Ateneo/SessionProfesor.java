package com.NicolasGarcia.Ateneo;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class SessionProfesor {
	private static final String Clave = "Ateneo";

	// Método para generar un ID de sesión único a partir del ID del profesor
	public static String generarCodigoCookieProfesor(Long profesorId) {
		// Concatenar el ID del profesor con la clave secreta
		String StringParaHash = profesorId.toString() + Clave;

		try {
			// Crear un objeto MessageDigest para calcular el hash
			MessageDigest objetoParaHash = MessageDigest.getInstance("SHA-256");

			// Calcular el hash del string combinado
			byte[] hashBytes = objetoParaHash.digest(StringParaHash.getBytes());

			// Codificar el hash resultante como una cadena base64 para poder leerlo
			String sessionId = Base64.getEncoder().encodeToString(hashBytes);

			// Retornar el ID de sesión generado
			return sessionId;
		} catch (NoSuchAlgorithmException e) {
			// Manejar cualquier error de algoritmo de hash no soportado
			e.printStackTrace();
			return null;
		}
	}

	public static Long decodificarCookie(String cookieValue) {
		try {
			// Decodifica el valor de la cookie desde Base64
			byte[] cookieDecodificada = Base64.getDecoder().decode(cookieValue);

			// Calcula el hash inverso utilizando SHA-256
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] cookieDecodificadaEnBytes = digest.digest(cookieDecodificada);

			// Convierte el hash inverso a una cadena
			String cookieDecodificadaEnString = new String(cookieDecodificadaEnBytes);

			// Extrae el ID del profesor del hash inverso
			String idProfesorString = cookieDecodificadaEnString.replace(Clave, "");

			// Retorna el ID del profesor como Long
			return Long.parseLong(idProfesorString);
		} catch (NoSuchAlgorithmException e) {
			// Maneja cualquier error de algoritmo de hash no soportado
			e.printStackTrace();
			return null;
		}
	}
}
