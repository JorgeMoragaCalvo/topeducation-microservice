package com.example.testscoreservice.services;

import com.example.testscoreservice.entities.TestScoreEntity;
import com.example.testscoreservice.repositories.TestScoreRepository;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

@Service
public class TestScoreService {

    final
    TestScoreRepository testScoreRepository;

    @Autowired
    public TestScoreService(TestScoreRepository testScoreRepository) {
        this.testScoreRepository = testScoreRepository;
    }

    public List<TestScoreEntity> allTests(){
        return testScoreRepository.findAll();
    }

    public void processingExcelFile() throws IOException {
        try (InputStream inputStream = new ClassPathResource("/excel-files/scores-data.xlsx").getInputStream()){
            Workbook workbook = WorkbookFactory.create(inputStream);

            for(int i = 0; i < workbook.getNumberOfSheets(); i++){
                Sheet sheet = workbook.getSheetAt(i);
                processingSheet(sheet);
            }
        }
    }

    private void processingSheet(Sheet sheet){
        Iterator<Row> rowIterator = sheet.iterator();
        if(rowIterator.hasNext()) rowIterator.next();

        while(rowIterator.hasNext()){
            Row row = rowIterator.next();
            processingRow(row);
        }
    }

    private void processingRow(Row row){
        Cell rutCell = row.getCell(1);
        Cell scoreCell = row.getCell(3);

        if(rutCell != null && scoreCell != null){
            String rut = rutCell.getStringCellValue();
            int score = (int) scoreCell.getNumericCellValue();

            persistOnDataBase(rut, score);
        }
        else System.err.println("Al menos una de las celdas es nula en la fila " + row.getRowNum());
    }

    private void persistOnDataBase(String rut, int score){
        TestScoreEntity testScore = testScoreRepository.findByRut(rut);

        if(testScore == null){
            testScore = new TestScoreEntity();
            testScore.setRut(rut);
            testScore.setTotalTests(1);
            testScore.setTestAverage(score);
        } else {
            int tests = testScore.getTotalTests();
            double currentAverage = testScore.getTestAverage();
            double newAverage = (currentAverage * tests + score) / (tests + 1);

            testScore.setTotalTests(tests + 1);
            testScore.setTestAverage(newAverage);
        }
        testScoreRepository.save(testScore);
    }

    public TestScoreEntity getTestScoreByRut(String rut){
        return testScoreRepository.findByRut(rut);
    }
}
