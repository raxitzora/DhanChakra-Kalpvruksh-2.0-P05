ALTER TABLE businesses
ADD COLUMN opening_cash_paise INTEGER NOT NULL DEFAULT 0
CHECK (opening_cash_paise >= 0);