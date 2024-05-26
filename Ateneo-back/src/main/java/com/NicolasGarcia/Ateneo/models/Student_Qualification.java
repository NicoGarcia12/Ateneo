package com.NicolasGarcia.Ateneo.models;

import java.util.UUID;

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
public class Student_Qualification {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	@Column(nullable = false)
	private Double value;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "id_qualification")
	private Qualification qualification;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(nullable = false, name = "id_student")
	private Student student;
}
