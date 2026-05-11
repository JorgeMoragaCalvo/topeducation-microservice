package com.example.tuitionservice.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tuition")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TuitionEntity {

    @Id private String rut;

    private String registrationDate;
    private String paymentType;
}
