package com.example.testscoreservice.repositories;

import com.example.testscoreservice.entities.TestScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestScoreRepository extends JpaRepository<TestScoreEntity, String> {

    TestScoreEntity findByRut(String rut);
}
