package com.example.tuitionservice.services;

import com.example.tuitionservice.entities.TuitionEntity;
import com.example.tuitionservice.repositories.TuitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TuitionService {

    final TuitionRepository tuitionRepository;

    @Autowired
    public TuitionService(TuitionRepository tuitionRepository) {
        this.tuitionRepository = tuitionRepository;
    }

    public TuitionEntity createRegistration(TuitionEntity tuitionEntity){
        return tuitionRepository.save(tuitionEntity);
    }

    public List<TuitionEntity> getRegistrations(){
        return tuitionRepository.findAll();
    }

    public TuitionEntity getRegistrationByRut(String rut){
        return tuitionRepository.findByRut(rut);
    }
}
