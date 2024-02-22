# Educational Center Project  
This project simulates an educational center for university preparation, managing enrollments, fees, and discounts based on specific criteria. The following functionalities have been implemented:
* __Student Management__: Allows entering and listing student data.  
* __Enrollment and Payments__: Ability to register students and specify payment types.  
* __Notes Import__: Integration to import notes from an Excel file.  
* __Report Generation__: A summary report is generated with relevant information for each student.

Discounts are calculated based on the type of school, year of graduation, and average score. The project's architecture is based on microservices, using Spring Boot and PostgreSQL for the backend, and ReactJS for the frontend. Docker Hub is used for container storage, and Kubernetes for deployment in a local environment.


### Microservices  
* __student-service__: Manages student data.  
* __test-score-service__: Imports notes and calculates discounts.  
* __tuition-service__: Handles enrollments and payments.  



### Deployment
Deployment is done on a Kubernetes cluster using containers stored in Docker Hub.
