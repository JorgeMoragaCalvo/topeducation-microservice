package com.example.tuitionservice.controllers;

import com.example.tuitionservice.entities.TuitionEntity;
import com.example.tuitionservice.services.TuitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tuition")
public class TuitionController {

    final
    TuitionService tuitionService;

    @Autowired
    public TuitionController(TuitionService tuitionService) {
        this.tuitionService = tuitionService;
    }

    @PostMapping("/create")
    public TuitionEntity registration(@RequestBody TuitionEntity tuitionEntity){
        return tuitionService.createRegistration(tuitionEntity);
    }

    @GetMapping("/get")
    public ResponseEntity<List<TuitionEntity>> allTuition(){
        List<TuitionEntity> tuitionEntities = tuitionService.getRegistrations();
        return ResponseEntity.ok(tuitionEntities);
    }

    @GetMapping("/by-rut/{rut}")
    public ResponseEntity<TuitionEntity> getRegistrationByRut(@PathVariable("rut") String rut){
        TuitionEntity tuitionEntity = tuitionService.getRegistrationByRut(rut);
        if(tuitionEntity == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(tuitionEntity);
    }
}