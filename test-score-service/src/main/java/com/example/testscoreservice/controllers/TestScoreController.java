package com.example.testscoreservice.controllers;

import com.example.testscoreservice.entities.TestScoreEntity;
import com.example.testscoreservice.services.TestScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/score-report")
public class TestScoreController {

    final
    TestScoreService testScoreService;

    @Autowired
    public TestScoreController(TestScoreService testScoreService) {
        this.testScoreService = testScoreService;
    }

    @PostMapping("/process-excel")
    public ResponseEntity<String> processExcelFile(){
        try {
            testScoreService.processingExcelFile();
            return ResponseEntity.ok("Excel file processed successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing Excel file");
        }
    }

    @GetMapping("/tests")
    public ResponseEntity<List<TestScoreEntity>> getAllTests(){
        List<TestScoreEntity> testScoreEntities = testScoreService.allTests();
        return ResponseEntity.ok(testScoreEntities);
    }
}
