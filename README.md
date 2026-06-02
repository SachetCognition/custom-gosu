# Guidewire InsuranceSuite Integration Toolkit

A comprehensive Gosu integration framework for Guidewire InsuranceSuite (PolicyCenter, ClaimCenter, BillingCenter, ContactManager) with a full-stack Spring Boot backend and PostgreSQL database.

## Overview

This repository demonstrates a modernized, production-grade integration approach for Guidewire InsuranceSuite. It expands upon the original SOAP-based web service framework with:

- **Modern REST API layer** alongside the legacy WS-I SOAP framework
- **Resilience patterns** — retry with exponential backoff, circuit breaker (CLOSED/OPEN/HALF_OPEN)
- **Product-specific integration modules** for all four InsuranceSuite products
- **Full Spring Boot backend** with JPA, PostgreSQL, and REST endpoints
- **17,000+ realistic seed records** across 10 database tables
- **Docker Compose** for local development environment

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Gosu Integration Layer                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │PolicyCtr │ │ClaimCtr  │ │BillingCtr│ │ContactManager│   │
│  └─────┬────┘ └────┬─────┘ └─────┬────┘ └──────┬───────┘   │
│        │           │             │              │            │
│  ┌─────┴───────────┴─────────────┴──────────────┴──────┐    │
│  │         REST / SOAP Service Base APIs                │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  Retry │ Circuit Breaker │ Logging │ Validation     │    │
│  └────────────────────────┬────────────────────────────┘    │
└───────────────────────────┼─────────────────────────────────┘
                            │ HTTP
┌───────────────────────────┼─────────────────────────────────┐
│              Spring Boot Backend (REST API)                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Policy   │ │ Claim    │ │ Billing  │ │  Contact     │   │
│  │Controller│ │Controller│ │Controller│ │ Controller   │   │
│  └─────┬────┘ └────┬─────┘ └─────┬────┘ └──────┬───────┘   │
│        └───────────┬┴─────────────┘              │           │
│              ┌─────┴──────┐                      │           │
│              │   JPA /    │──────────────────────┘           │
│              │ Hibernate  │                                   │
│              └─────┬──────┘                                   │
└────────────────────┼────────────────────────────────────────┘
                     │ JDBC
┌────────────────────┼────────────────────────────────────────┐
│              PostgreSQL Database                              │
│  policies │ claims │ billing_accounts │ contacts │ ...       │
│                  17,020+ seed records                        │
└─────────────────────────────────────────────────────────────┘
```

## Package Structure

```
atsynthesize/
└── suite/
    ├── integration/
    │   ├── exception/          # Enhanced exception hierarchy
    │   ├── service/
    │   │   ├── rest/           # REST API base classes
    │   │   ├── example/        # Original SOAP examples
    │   │   └── WsiServiceBaseAPI.gs
    │   ├── resilience/         # Retry & circuit breaker
    │   ├── logging/            # Structured logging with correlation IDs
    │   ├── config/             # Configuration management
    │   ├── domain/             # Shared domain model (MoneyAmount, etc.)
    │   ├── validation/         # Composable validation framework
    │   ├── transform/          # Entity mapping & data transformation
    │   ├── messaging/          # Event publishing & message transport
    │   ├── security/           # Auth context, credential & token mgmt
    │   └── plugin/             # Plugin registry & interfaces
    ├── batch/                  # Batch processing framework
    ├── testing/                # Test base classes & builders
    ├── policycenter/           # PolicyCenter integration
    │   ├── service/            # Quote, Issuance, Search, Rating, etc.
    │   ├── entity/             # PolicySummary, QuoteRequest/Response
    │   └── gxmodel/            # GX extraction models
    ├── claimcenter/            # ClaimCenter integration
    │   ├── service/            # FNOL, Search, Reserve, Payment, etc.
    │   ├── entity/             # ClaimSummary, ExposureDTO, etc.
    │   └── gxmodel/            # GX extraction models
    ├── billingcenter/          # BillingCenter integration
    │   ├── service/            # Invoice, Payment, Balance, etc.
    │   ├── entity/             # InvoiceDTO, ChargeDTO, etc.
    │   └── gxmodel/            # GX extraction models
    └── contactmanager/         # ContactManager integration
        ├── service/            # Search, CRUD, Address validation
        └── entity/             # ContactDTO, AddressDTO

backend/                        # Spring Boot application
├── src/main/java/.../
│   ├── controller/             # REST controllers
│   ├── model/                  # JPA entities
│   ├── repository/             # Spring Data repositories
│   ├── service/                # Business logic
│   └── config/                 # CORS, exception handling
└── src/main/resources/
    ├── schema.sql              # Database schema (10 tables)
    ├── data.sql                # 17,020+ seed records
    └── application.yml         # Spring config (H2 + PostgreSQL)
```

## Quick Start

### Option 1: Docker Compose (PostgreSQL)

```bash
docker-compose up -d
```

The API will be available at `http://localhost:8080/api/v1/`.

### Option 2: Local Development (H2 in-memory)

```bash
cd backend
mvn spring-boot:run
```

Runs with H2 in-memory database. Access the H2 console at `http://localhost:8080/api/h2-console`.

### Option 3: Maven Build Only

```bash
cd backend
mvn clean package
java -jar target/insurance-suite-api-1.0.0-SNAPSHOT.jar
```

## API Endpoints

### Policies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/policies` | List policies (paginated) |
| GET | `/api/v1/policies/{number}` | Get policy by number |
| GET | `/api/v1/policies/search?insuredName=` | Search by insured name |
| GET | `/api/v1/policies/search?productCode=` | Filter by product |
| GET | `/api/v1/policies/stats` | Policy statistics |
| POST | `/api/v1/policies` | Create policy |

### Claims
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/claims` | List claims (paginated) |
| GET | `/api/v1/claims/{number}` | Get claim by number |
| GET | `/api/v1/claims/policy/{policyNumber}` | Claims for a policy |
| GET | `/api/v1/claims/stats` | Claim statistics |
| POST | `/api/v1/claims` | Create claim (FNOL) |

### Billing
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/billing/accounts` | List billing accounts |
| GET | `/api/v1/billing/accounts/{number}` | Get account by number |
| GET | `/api/v1/billing/accounts/policy/{policyNumber}` | Accounts for policy |
| GET | `/api/v1/billing/accounts/delinquent` | Delinquent accounts |
| GET | `/api/v1/billing/stats` | Billing statistics |

### Contacts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/contacts` | List all contacts |
| GET | `/api/v1/contacts/{publicId}` | Get contact by ID |
| GET | `/api/v1/contacts/search?lastName=` | Search by last name |
| POST | `/api/v1/contacts` | Create contact |
| PUT | `/api/v1/contacts/{publicId}` | Update contact |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dashboard/summary` | Cross-module summary stats |

## Database Schema

10 tables with 17,020+ seed records:

| Table | Records | Description |
|-------|---------|-------------|
| `agents` | 20 | Insurance agents/brokers |
| `contacts` | 500 | Policyholders, claimants, companies |
| `policies` | 2,000 | Insurance policies across 15 product lines |
| `coverages` | 5,000 | Coverage details linked to policies |
| `claims` | 800 | Insurance claims with loss details |
| `exposures` | 1,500 | Claim exposures by coverage type |
| `billing_accounts` | 1,000 | Billing accounts with balances |
| `invoices` | 3,000 | Invoice records with payment status |
| `payments` | 2,000 | Payment transactions |
| `claim_activities` | 1,200 | Claim workflow activities |

## Gosu Integration Patterns

### REST API Integration
```gosu
class MyServiceAPI extends RestServiceBaseAPI {
    construct() { super("MyService") }

    public function getData(pInput : MyRequest) : RestServiceResponse<MyResponse> {
        return restExecute(
            \ req : MyRequest -> { return callBackend(req) },
            pInput,
            RestServiceExecutor.HTTP_METHOD.GET
        )
    }
}
```

### Retry with Circuit Breaker
```gosu
var retryPolicy = new RetryPolicy(3, 1000, 2.0, {RetryableException})
var circuitBreaker = new CircuitBreaker("my-service", 5, 30000, 2)
var executor = new RetryableServiceExecutor(retryPolicy, circuitBreaker)

var result = executor.executeWithRetry("operation", \ -> {
    return callExternalService()
})
```

### Validation Framework
```gosu
var validator = new ValidatorChain<PolicySummary>()
    .addRequired("PolicyNumber", \ p -> p.PolicyNumber)
    .addRequired("InsuredName", \ p -> p.PrimaryInsuredName)
    .addRule(new ValidationRule<PolicySummary>(
        "EffectiveDate", \ p -> p.EffectiveDate != null, "Date required", "REQUIRED"))

var result = validator.validate(policy)
if (!result.IsValid) { throw new ValidationException(result) }
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Integration Language | Gosu (Guidewire) |
| Backend Framework | Spring Boot 3.2 |
| Database | PostgreSQL 16 / H2 (dev) |
| ORM | Spring Data JPA / Hibernate |
| Build Tool | Maven |
| Containerization | Docker + Docker Compose |
| Java Version | 17 |

## License

Please read the license.txt file for licensing information.
