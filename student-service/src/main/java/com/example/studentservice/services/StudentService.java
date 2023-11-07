package com.example.studentservice.services;

import com.example.studentservice.entities.StudentEntity;
import com.example.studentservice.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public StudentEntity createStudent(StudentEntity studentEntity){
        return studentRepository.save(studentEntity);
    }

    public List<StudentEntity> getAllStudents(){
        return studentRepository.findAll();
    }

    public StudentEntity getStudentByRut(String rut){
        return studentRepository.findByRut(rut);
    }

    /*
    public Optional<StudentEntity> getStudentById(Long id){
        return studentRepository.findById(id);
    }*/
}
