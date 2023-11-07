package com.example.testscoreservice.controllers;

import com.example.testscoreservice.entities.ReportEntity;
import com.example.testscoreservice.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score-report")
public class ReportController {

    final
    ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/{rut}")
    public ResponseEntity<ReportEntity> getReport(@PathVariable("rut") String rut){
        ReportEntity reportEntity = reportService.getReport(rut);
        return ResponseEntity.ok(reportEntity);
    }

    @GetMapping("/all-report")
    public ResponseEntity<List<ReportEntity>> getAllReport(){
        List<ReportEntity> reportEntities = reportService.getAllReport();
        return ResponseEntity.ok(reportEntities);
    }
}