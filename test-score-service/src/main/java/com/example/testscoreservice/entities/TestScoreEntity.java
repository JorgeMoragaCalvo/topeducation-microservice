package com.example.testscoreservice.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "test_score")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TestScoreEntity {

    @Id private String rut;

    private int totalTests;
    private double testAverage;
}
