-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- =========================================================
-- USERS
-- =========================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    clerk_user_id VARCHAR(255) UNIQUE NOT NULL,

    name VARCHAR(150),
    email VARCHAR(255),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- BUSINESSES
-- =========================================================

CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    name VARCHAR(150) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- TRANSACTIONS
-- =========================================================

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL
        REFERENCES businesses(id)
        ON DELETE CASCADE,

    type VARCHAR(20) NOT NULL
        CHECK (
            type IN (
                'SALE',
                'EXPENSE',
                'WITHDRAWAL'
            )
        ),

    amount_paise INTEGER NOT NULL
        CHECK (amount_paise > 0),

    payment_method VARCHAR(30) NOT NULL
        CHECK (
            payment_method IN (
                'CASH',
                'UPI',
                'CARD',
                'BANK_TRANSFER',
                'CREDIT'
            )
        ),

    settlement_status VARCHAR(20)
        CHECK (
            settlement_status IN (
                'AVAILABLE',
                'PENDING',
                'SETTLED'
            )
        ),

    category VARCHAR(50),

    description TEXT,

    transaction_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- PAYABLES
-- =========================================================

CREATE TABLE payables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL
        REFERENCES businesses(id)
        ON DELETE CASCADE,

    supplier_name VARCHAR(150) NOT NULL,

    amount_paise INTEGER NOT NULL
        CHECK (amount_paise > 0),

    due_date DATE NOT NULL,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (
            status IN (
                'PENDING',
                'PAID'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- RECEIVABLES
-- =========================================================

CREATE TABLE receivables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    business_id UUID NOT NULL
        REFERENCES businesses(id)
        ON DELETE CASCADE,

    customer_name VARCHAR(150) NOT NULL,

    amount_paise INTEGER NOT NULL
        CHECK (amount_paise > 0),

    expected_date DATE,

    description TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (
            status IN (
                'PENDING',
                'RECEIVED'
            )
        ),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_businesses_user_id
ON businesses(user_id);


CREATE INDEX idx_transactions_business_id
ON transactions(business_id);

CREATE INDEX idx_transactions_business_date
ON transactions(business_id, transaction_date);


CREATE INDEX idx_payables_business_id
ON payables(business_id);

CREATE INDEX idx_payables_business_due_date
ON payables(business_id, due_date);


CREATE INDEX idx_receivables_business_id
ON receivables(business_id);

CREATE INDEX idx_receivables_business_expected_date
ON receivables(business_id, expected_date);