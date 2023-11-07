package com.example.testscoreservice.repositories;

import com.example.testscoreservice.entities.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {

    ReportEntity findByRut(String rut);
}
