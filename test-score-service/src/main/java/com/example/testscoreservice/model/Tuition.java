package com.example.testscoreservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tuition {

    private String rut;
    private String registrationDate;
    private String paymentType;
}
