package com.example.testscoreservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "test_score")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TestScoreEntity {

    @Id
    private String rut;

    private int totalTests;
    private double testAverage;
}
