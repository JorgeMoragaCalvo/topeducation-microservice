package com.example.testscoreservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class TestScoreServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestScoreServiceApplication.class, args);
    }

}
