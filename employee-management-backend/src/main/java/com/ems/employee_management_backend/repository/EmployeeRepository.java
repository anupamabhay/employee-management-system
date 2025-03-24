package com.ems.employee_management_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.employee_management_backend.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}

