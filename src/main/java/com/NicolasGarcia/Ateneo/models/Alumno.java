package com.NicolasGarcia.Ateneo.models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Alumno {

	@jakarta.persistence.Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String nombres;

	@Column(nullable = false)
	private String apellidos;

	@Column(nullable = false)
	private Long dni;

	private String email;
	
    @Column(nullable = false)
    private boolean sinMaterias;

    private LocalDate fechaUltimoBorrado;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "alumno_materia", joinColumns = @JoinColumn(nullable = false, name = "id_alumno"), inverseJoinColumns = @JoinColumn(nullable = false, name = "id_materia"))
	private List<Materia> materias;

	@OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Nota_Alumno> notas;

	@OneToMany(mappedBy = "alumno", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Inasistencia> inasistencias;

}
