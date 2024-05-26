package com.NicolasGarcia.Ateneo.models;

import java.util.List;
import java.util.UUID;

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
public class Subject {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private int school_year;

	@Column(nullable = false)
	private String institution;

	@Column(nullable = false)
	private int secondary_career;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "id_professor")
	private Professor professor;

	@Column(nullable = false)
	@ManyToMany(mappedBy = "subjects", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Student> students;

	@OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Qualification> qualifications;

	@OneToMany(mappedBy = "subject", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Class> classes;

}