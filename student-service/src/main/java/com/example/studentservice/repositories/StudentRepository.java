package com.example.studentservice.repositories;

import com.example.studentservice.entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    StudentEntity findByRut(String rut);

    /*
    Optional<StudentEntity> findById(Long id);*/
}
