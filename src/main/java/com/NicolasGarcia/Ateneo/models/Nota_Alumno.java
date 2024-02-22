package com.NicolasGarcia.Ateneo.models;

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
public class Nota_Alumno {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private Double valor;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "id_nota")
	private Nota nota;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "id_alumno")
	private Alumno alumno;
}
