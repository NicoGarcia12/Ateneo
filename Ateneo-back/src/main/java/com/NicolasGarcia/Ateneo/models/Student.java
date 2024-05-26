package com.NicolasGarcia.Ateneo.models;

import java.util.List;
import java.util.UUID;

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
public class Student {

	@jakarta.persistence.Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private String names;

	@Column(nullable = false)
	private String last_names;

	@Column(nullable = false)
	private Long dni;

	private String email;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "student_subject", joinColumns = @JoinColumn(nullable = false, name = "id_student"), inverseJoinColumns = @JoinColumn(nullable = false, name = "id_subject"))
	private List<Subject> subjects;

	@OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Qualification> qualifications;

	@OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Absence> absences;

}