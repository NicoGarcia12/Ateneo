package com.NicolasGarcia.Ateneo.models;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Nota {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private String tipo;

	@Column(nullable = false)
	private LocalDate fecha;
	
	@Column(nullable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_materia")
	private Materia materia;
}
