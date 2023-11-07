package com.example.testscoreservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "report")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReportEntity {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;

    private String rut;
    private String name;
    private String lastName;
    private String paymentType;
    private Integer dues;
    private Integer discount;
    private Integer totalPay;
    private Integer totalExams;
    private Double averageScore;
}