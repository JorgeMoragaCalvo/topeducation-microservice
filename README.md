# TopEducation — Microservices Platform

> Microservices platform simulating a Chilean university-prep institute: enrollments, score ingestion from Excel, and tuition discount calculation driven by school type, graduation year, and exam average.

![Java](https://img.shields.io/badge/Java-17-007396?logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.5.4-6DB33F?logo=springboot&logoColor=white)
![Spring Cloud](https://img.shields.io/badge/Spring%20Cloud-2020.0.3-6DB33F?logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB%20per%20service-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-containerized-2496ED?logo=docker&logoColor=white)
![Maven](https://img.shields.io/badge/Build-Maven-C71A36?logo=apachemaven&logoColor=white)

---

## Overview

TopEducation models the operations of a pre-university preparation institute: registering students, importing PAES-style exam scores from Excel sheets, recording tuition payments, and computing tuition discounts. The platform is decomposed into independently deployable Spring Boot services orchestrated through Spring Cloud (Eureka discovery, centralized config, API gateway), backed by a PostgreSQL-per-service data strategy and consumed by a React 18 single-page application.

The codebase is intentionally a portfolio piece: it demonstrates microservice decomposition, service discovery, centralized configuration, gateway routing, JPA persistence, file ingestion, inter-service orchestration, and full-stack integration in a single repository.

---

## Architecture

```diagram
                 ┌──────────────┐
                 │   React 18   │  :3000
                 │   Frontend   │
                 └──────┬───────┘
                        │ HTTP
                 ┌──────▼───────┐
                 │   Gateway    │  :8080  (Spring Cloud Gateway)
                 └──┬────┬───┬──┘
                    │    │   │      ┌──────────────┐
                    │    │   │ ◄────┤   Eureka     │ :8761
                    │    │   │      └──────────────┘
                    │    │   │      ┌──────────────┐
                    │    │   │ ◄────┤ Config Server│ :8081
                    │    │   │      └──────────────┘
           ┌────────▼─┐ ┌▼──────┐ ┌─▼──────────┐
           │ student- │ │tuition│ │ test-score │
           │ service  │ │service│ │  service   │
           └────┬─────┘ └───┬───┘ └─────┬──────┘
                │           │           │
             ┌──▼──┐     ┌──▼──┐     ┌──▼──┐
             │ PG  │     │ PG  │     │ PG  │
             └─────┘     └─────┘     └─────┘
```

- **Service discovery** via Netflix Eureka — services register on startup and discover each other by name.
- **Centralized configuration** via Spring Cloud Config Server, pulling from a dedicated GitHub repository.
- **Single ingress** via Spring Cloud Gateway — the React app and inter-service calls go through one routable entry point.
- **Database per service** — each domain service owns its PostgreSQL instance, enforcing bounded contexts.

---

## Microservices

| Service              | Port | Responsibility                                        | Key endpoints                                                                                 |
|----------------------|------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `config-service`     | 8081 | Centralized configuration server                      | —                                                                                             |
| `eureka-service`     | 8761 | Service registry & discovery                          | —                                                                                             |
| `gateway-service`    | 8080 | API gateway, single entry point                       | Routes `/student/**`, `/tuition/**`, `/score-report/**`                                       |
| `student-service`    | —    | Manage student data (PK = Chilean RUT)                | `POST /student/create`, `GET /student/get-students`, `GET /student/by-rut/{rut}`              |
| `tuition-service`    | —    | Register enrollments and payment type                 | `POST /tuition/create`, `GET /tuition/get`, `GET /tuition/by-rut/{rut}`                       |
| `test-score-service` | —    | Excel ingestion, score storage, discount/report calc. | `POST /score-report/process-excel`, `GET /score-report/{rut}`, `GET /score-report/all-report` |
| `frontend-service`   | 3000 | React 18 SPA consuming the gateway                    | —                                                                                             |

---

## Domain logic — discount calculation

When a student requests a tuition report, `test-score-service` orchestrates a call to `student-service` and `tuition-service`, then applies the following business rules:

- **Cash payment (`Contado`)** → flat **50%** discount, all other rules ignored.
- **Installments (`Cuotas`)** → discounts are **additive** across three axes:

  | School type        | Discount |
  |--------------------|----------|
  | Municipal          | 20%      |
  | Subvencionado      | 10%      |
  | Other / Privado    | 0%       |

  | Years since graduation | Discount |
  |------------------------|----------|
  | 1 year                 | 15%      |
  | ≤ 2 years              | 8%       |
  | 3–4 years              | 4%       |
  | > 4 years              | 0%       |

  | Exam average (PAES, 0–1000) | Discount |
  |-----------------------------|----------|
  | 950 – 1000                  | 10%      |
  | 900 – 949                   | 5%       |
  | 850 – 899                   | 2%       |
  | < 850                       | 0%       |

- **School type** also drives installment count (Municipal: 10, Subvencionado: 7, Other: 4).
- Final tuition = `(TARIFF + ENROLLMENT) × (1 − totalDiscount)`, with `TARIFF = 1,500,000 CLP` and `ENROLLMENT = 70,000 CLP`.

Source: [`ReportService.java`](test-score-service/src/main/java/com/example/testscoreservice/services/ReportService.java).

---

## Tech stack

**Backend** — Java 17 · Spring Boot 2.5.4 · Spring Cloud 2020.0.3 · Spring Data JPA / Hibernate · Lombok · Apache POI 4.1.2 (Excel) · Spring Cloud Gateway · Eureka · Config Server · Spring Boot Actuator + Micrometer Prometheus · RestTemplate · Maven.

**Frontend** — React 18.2 · React Router 6 · axios · React-Bootstrap · styled-components · SweetAlert2.

**Infra** — Docker (per-service `Dockerfile`) · PostgreSQL · GitHub-backed external config repo.

---

## Skills demonstrated

- **Microservice decomposition** by bounded context (student / tuition / test-score).
- **Service discovery** with Netflix Eureka.
- **Centralized configuration** with Spring Cloud Config + Git backend.
- **API Gateway pattern** with Spring Cloud Gateway for ingress routing.
- **REST API design** with Spring MVC controllers and JPA repositories.
- **Inter-service orchestration** via HTTP (RestTemplate through the gateway).
- **File ingestion** of `.xlsx` exam sheets with Apache POI.
- **Polyglot persistence layout** — separate PostgreSQL DB per service.
- **Containerization** — production-shaped Dockerfiles per service.
- **Full-stack delivery** — React 18 SPA wired to a Spring backend through the gateway.
- **Metrics-ready** — Actuator + Micrometer Prometheus endpoints exposed on every service.

---

## Getting started

### Prerequisites

- Java 17, Maven 3.8+
- Node.js 18+
- Docker (optional, for containerized run)
- A reachable PostgreSQL instance (one logical DB per service)

### Required environment variables

```
POSTGRES_DB_HOST=<host>
POSTGRES_DB_STUDENT=<student db name>
POSTGRES_DB_TEST_SCORE=<test-score db name>
POSTGRES_DB_TUITION=<tuition db name>
POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>
```

### Boot order

1. `config-service` (so others can fetch their config)
2. `eureka-service`
3. `student-service`, `tuition-service`, `test-score-service` (in any order)
4. `gateway-service`
5. `frontend-service`

Each Spring Boot service: `mvn spring-boot:run`. Frontend: `npm install && npm start`.

---

## Author

**Jorge Moraga Calvo** — Computer Engineering, Universidad de Santiago de Chile (USACH)

- Email: [jorge.moraga.c@usach.cl](mailto:jorge.moraga.c@usach.cl)
- GitHub: [JorgeMoragaCalvo](https://github.com/JorgeMoragaCalvo)
- LinkedIn: [Jorge](https://www.linkedin.com/in/jorge-moraga-calvo)