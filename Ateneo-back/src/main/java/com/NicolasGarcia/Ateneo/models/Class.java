package com.NicolasGarcia.Ateneo.models;

import java.time.LocalDate;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Class {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private LocalDate date;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "id_subject")
	private Subject subject;
	
	@OneToMany(mappedBy = "class", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Absence> absences;
}
