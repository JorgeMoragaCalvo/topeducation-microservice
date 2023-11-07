package com.example.testscoreservice.services;

import com.example.testscoreservice.entities.ReportEntity;
import com.example.testscoreservice.entities.TestScoreEntity;
import com.example.testscoreservice.model.Student;
import com.example.testscoreservice.model.Tuition;
import com.example.testscoreservice.repositories.ReportRepository;
import com.example.testscoreservice.repositories.TestScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;


@Service
public class ReportService {

    @Autowired
    ReportRepository reportRepository;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    TestScoreService testScoreService;

    @Autowired
    TestScoreRepository testScoreRepository;

    private static final int TARIFF_AMOUNT = 1500000;
    private static final int TUITION_AMOUNT = 70000;

    public ReportEntity getReport(String rut){

        ReportEntity existingReport = reportRepository.findByRut(rut);
        if(existingReport != null) return existingReport;

        Tuition tuition = restTemplate.getForObject("http://localhost:8080/tuition/by-rut/" + rut, Tuition.class);
        Student student = restTemplate.getForObject("http://localhost:8080/student/by-rut/" + rut, Student.class);
        TestScoreEntity testScores = testScoreService.getTestScoreByRut(rut);

        double discount;
        int dues;
        assert student != null;
        dues = calculateDues(student);
        int total, dto;

        ReportEntity reportEntity = new ReportEntity();
        assert tuition != null;

        if(tuition.getPaymentType().equals("Contado")) discount = 0.5;
        else {
            discount = calculateDiscountBySchoolType(student) +
                    calculateDiscountByGraduationYear(student) +
                    calculateDiscountByAverageScore(testScores);
        }

        dto = (int) (discount * 100);
        total = (int) ((TARIFF_AMOUNT + TUITION_AMOUNT) * (1 - discount));

        reportEntity.setRut(tuition.getRut());
        reportEntity.setPaymentType(tuition.getPaymentType());
        reportEntity.setDiscount(dto);
        reportEntity.setDues(dues);
        reportEntity.setTotalPay(total);
        reportEntity.setName(student.getName());
        reportEntity.setLastName(student.getLastName());
        reportEntity.setTotalExams(testScores.getTotalTests());
        reportEntity.setAverageScore(testScores.getTestAverage());

        return reportRepository.save(reportEntity);
    }

    public Double calculateDiscountBySchoolType(Student student){
        String schoolType = student.getSchoolType();

        return switch (schoolType){
            case "Municipal" -> 0.2;
            case "Subvencionado" -> 0.1;
            default -> 0.0;
        };
    }

    public Double calculateDiscountByGraduationYear(Student student){
        int year = student.getGraduationYear();
        double discount;
        LocalDate currenDate = LocalDate.now();
        int currentYear = currenDate.getYear();
        int yearDifference = currentYear - year;

        if(yearDifference == 1) discount = 0.15;
        else if (yearDifference <= 2) discount = 0.08;
        else if (yearDifference >= 3 && yearDifference <= 4) discount = 0.04;
        else discount = 0.0;

        return discount;
    }

    public Integer calculateDues(Student student){
        String dues = student.getSchoolType();

        return switch (dues){
            case "Municipal" -> 10;
            case "Subvencionado" -> 7;
            default -> 4;
        };
    }

    public Double calculateDiscountByAverageScore(TestScoreEntity testScoreEntity){
        double averageScore = testScoreEntity.getTestAverage();
        double discount = 0.0;
        if(averageScore >= 950 && averageScore <=1000) discount = 0.1;
        else if (averageScore >= 900 && averageScore < 950) discount = 0.05;
        else if (averageScore >= 850 && averageScore < 900) discount = 0.02;
        else if (averageScore < 850) discount = 0.0;

        return discount;
    }

    public List<ReportEntity> getAllReport(){
        return reportRepository.findAll();
    }
}
