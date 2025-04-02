-- enums
CREATE TYPE user_type AS ENUM ('PATIENT', 'EMPLOYEE');
CREATE TYPE employee_role AS ENUM ('DOCTOR', 'NURSE', 'IT_SUPPORT', 'MAINTENANCE', 'ADMINISTRATOR');
CREATE TYPE department AS ENUM ('CARDIOLOGY', 'NEUROLOGY', 'IT', 'FACILITIES', 'ADMINISTRATION');
CREATE TYPE gender AS ENUM ('MALE', 'FEMALE', 'NON_BINARY', 'OTHER', 'PREFER_NOT_TO_SAY');

-- tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type user_type DEFAULT 'PATIENT',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT user_email_unique UNIQUE (email)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    department department,
    role employee_role,
    on_shift BOOLEAN DEFAULT false,
    user_id INT UNIQUE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    patient_id VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender gender,
    phone VARCHAR(255),
    user_id INT UNIQUE,
    assigned_doctor_id INT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_assigned_doctor FOREIGN KEY (assigned_doctor_id) REFERENCES employees(id)
);