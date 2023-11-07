package com.example.tuitionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class TuitionServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TuitionServiceApplication.class, args);
    }

}
