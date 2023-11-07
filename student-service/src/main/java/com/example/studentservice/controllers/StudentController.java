package com.example.studentservice.controllers;

import com.example.studentservice.entities.StudentEntity;
import com.example.studentservice.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    public final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping("/create")
    public ResponseEntity<StudentEntity> createStudents(@RequestBody StudentEntity studentEntity){
        StudentEntity newStudent = studentService.createStudent(studentEntity);
        return ResponseEntity.ok(newStudent);
    }

    @GetMapping("/get-students")
    public ResponseEntity<List<StudentEntity>> getAll(){
        List<StudentEntity> studentEntities = studentService.getAllStudents();
        if(studentEntities.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(studentEntities);
    }

    @GetMapping("/by-rut/{rut}")
    public ResponseEntity<StudentEntity> getStudentByRut(@PathVariable("rut") String rut){
        StudentEntity studentEntity = studentService.getStudentByRut(rut);
        if(studentEntity == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(studentEntity);
    }

    /*/
    @GetMapping("/by-id/{id}")
    public ResponseEntity<Optional<StudentEntity>> studentById(@PathVariable("id") Long id){
        Optional<StudentEntity> studentEntity = studentService.getStudentById(id);
        return ResponseEntity.ok(studentEntity);
    }*/
}
