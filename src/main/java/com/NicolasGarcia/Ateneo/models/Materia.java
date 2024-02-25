package com.NicolasGarcia.Ateneo.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Materia {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private int ciclo_lectivo;

	@Column(nullable = false)
	private String institucion;

	@Column(nullable = false)
	private int secundario_carrera;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "id_profesor")
	private Profesor profesor;

	@Column(nullable = false)
	@ManyToMany(mappedBy = "materias", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Alumno> alumnos;

	@OneToMany(mappedBy = "materia", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Nota> notas;

	@OneToMany(mappedBy = "materia", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Clase> clases;

}
