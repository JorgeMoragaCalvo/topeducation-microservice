package com.example.testscoreservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    private String rut;
    private String name;
    private String lastName;
    private String birthDate;
    private String schoolType;
    private String schoolName;
    private Integer graduationYear;
}
