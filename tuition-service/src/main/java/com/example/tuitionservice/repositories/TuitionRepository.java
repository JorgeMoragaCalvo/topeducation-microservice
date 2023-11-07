package com.example.tuitionservice.repositories;

import com.example.tuitionservice.entities.TuitionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TuitionRepository extends JpaRepository <TuitionEntity, String> {

    TuitionEntity findByRut(String rut);
}
