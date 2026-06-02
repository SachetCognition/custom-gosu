-- InsuranceSuite Database Schema
-- Supports PostgreSQL and H2

CREATE TABLE IF NOT EXISTS contacts (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    public_id       VARCHAR(50)  NOT NULL UNIQUE,
    contact_type    VARCHAR(30)  NOT NULL,
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    company_name    VARCHAR(200),
    display_name    VARCHAR(200),
    email_address   VARCHAR(200),
    work_phone      VARCHAR(30),
    home_phone      VARCHAR(30),
    cell_phone      VARCHAR(30),
    date_of_birth   DATE,
    address_line1   VARCHAR(200),
    city            VARCHAR(100),
    state           VARCHAR(50),
    postal_code     VARCHAR(20),
    country         VARCHAR(5)   DEFAULT 'US',
    status          VARCHAR(30),
    created_date    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    modified_date   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS policies (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    policy_number         VARCHAR(30)    NOT NULL UNIQUE,
    public_id             VARCHAR(50)    NOT NULL UNIQUE,
    product_code          VARCHAR(50)    NOT NULL,
    product_name          VARCHAR(100),
    status                VARCHAR(30)    NOT NULL,
    effective_date        DATE           NOT NULL,
    expiration_date       DATE           NOT NULL,
    total_premium         DECIMAL(12,2),
    currency_code         VARCHAR(3)     DEFAULT 'USD',
    primary_insured_name  VARCHAR(200)   NOT NULL,
    primary_insured_id    VARCHAR(50),
    agent_code            VARCHAR(30),
    agent_name            VARCHAR(200),
    uw_company            VARCHAR(100),
    term_number           INT            DEFAULT 1,
    cancellation_date     DATE,
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    modified_date         TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS claims (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    claim_number          VARCHAR(30)    NOT NULL UNIQUE,
    public_id             VARCHAR(50)    NOT NULL UNIQUE,
    policy_number         VARCHAR(30)    NOT NULL,
    status                VARCHAR(30)    NOT NULL,
    loss_date             DATE           NOT NULL,
    reported_date         DATE,
    closed_date           DATE,
    loss_cause            VARCHAR(100),
    loss_type             VARCHAR(100),
    loss_description      VARCHAR(2000),
    loss_location_city    VARCHAR(100),
    loss_location_state   VARCHAR(50),
    claimant_name         VARCHAR(200),
    insured_name          VARCHAR(200),
    adjuster_name         VARCHAR(200),
    adjuster_code         VARCHAR(30),
    total_incurred        DECIMAL(12,2),
    total_paid            DECIMAL(12,2),
    total_reserves        DECIMAL(12,2),
    total_recoveries      DECIMAL(12,2),
    severity              VARCHAR(30),
    litigation_status     VARCHAR(30),
    catastrophe_number    VARCHAR(30),
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    modified_date         TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS billing_accounts (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_number        VARCHAR(30)    NOT NULL UNIQUE,
    account_name          VARCHAR(200),
    policy_number         VARCHAR(30),
    total_billed          DECIMAL(12,2),
    total_paid            DECIMAL(12,2),
    current_balance       DECIMAL(12,2),
    past_due_balance      DECIMAL(12,2),
    delinquency_status    VARCHAR(30),
    billing_plan          VARCHAR(50),
    payment_plan          VARCHAR(50),
    status                VARCHAR(30),
    last_payment_date     DATE,
    last_payment_amount   DECIMAL(12,2),
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    modified_date         TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coverages (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    public_id             VARCHAR(50)    NOT NULL UNIQUE,
    policy_number         VARCHAR(30)    NOT NULL,
    coverage_code         VARCHAR(50)    NOT NULL,
    coverage_name         VARCHAR(200),
    deductible            DECIMAL(12,2),
    coverage_limit        DECIMAL(12,2),
    premium               DECIMAL(12,2),
    effective_date        DATE,
    expiration_date       DATE,
    is_required           BOOLEAN        DEFAULT FALSE,
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exposures (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    public_id             VARCHAR(50)    NOT NULL UNIQUE,
    claim_number          VARCHAR(30)    NOT NULL,
    exposure_type         VARCHAR(100),
    coverage_type         VARCHAR(100),
    status                VARCHAR(30),
    claimant_name         VARCHAR(200),
    loss_party            VARCHAR(30),
    reserve_amount        DECIMAL(12,2),
    paid_amount           DECIMAL(12,2),
    incurred_amount       DECIMAL(12,2),
    adjuster_name         VARCHAR(200),
    severity              VARCHAR(30),
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    closed_date           DATE
);

CREATE TABLE IF NOT EXISTS invoices (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    invoice_number        VARCHAR(30)    NOT NULL UNIQUE,
    account_number        VARCHAR(30)    NOT NULL,
    policy_number         VARCHAR(30),
    invoice_date          DATE           NOT NULL,
    due_date              DATE           NOT NULL,
    paid_date             DATE,
    status                VARCHAR(30),
    total_amount          DECIMAL(12,2),
    paid_amount           DECIMAL(12,2),
    balance_due           DECIMAL(12,2),
    invoice_type          VARCHAR(30),
    installment_number    INT            DEFAULT 1,
    total_installments    INT            DEFAULT 1,
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    transaction_id        VARCHAR(50)    NOT NULL UNIQUE,
    account_number        VARCHAR(30)    NOT NULL,
    invoice_number        VARCHAR(30),
    amount                DECIMAL(12,2)  NOT NULL,
    currency_code         VARCHAR(3)     DEFAULT 'USD',
    payment_method        VARCHAR(30),
    payment_date          DATE,
    status                VARCHAR(30),
    payer_name            VARCHAR(200),
    reference_number      VARCHAR(50),
    confirmation_code     VARCHAR(50),
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS claim_activities (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    activity_id           VARCHAR(50)    NOT NULL UNIQUE,
    claim_number          VARCHAR(30)    NOT NULL,
    activity_type         VARCHAR(50),
    subject               VARCHAR(200),
    description           VARCHAR(2000),
    status                VARCHAR(30),
    priority              VARCHAR(20),
    assigned_to           VARCHAR(200),
    due_date              DATE,
    completed_date        DATE,
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agents (
    id                    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    agent_code            VARCHAR(30)    NOT NULL UNIQUE,
    agent_name            VARCHAR(200)   NOT NULL,
    agency_name           VARCHAR(200),
    email                 VARCHAR(200),
    phone                 VARCHAR(30),
    license_number        VARCHAR(50),
    state                 VARCHAR(50),
    status                VARCHAR(30),
    commission_rate       DECIMAL(5,4),
    appointed_date        DATE,
    created_date          TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);
