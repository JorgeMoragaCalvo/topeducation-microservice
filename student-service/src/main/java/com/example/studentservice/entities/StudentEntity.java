package com.example.studentservice.entities;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentEntity {

    @Id private String rut;

    private String name;
    private String lastName;
    private String birthDate;
    private String schoolType;
    private String schoolName;
    private Integer graduationYear;
}
