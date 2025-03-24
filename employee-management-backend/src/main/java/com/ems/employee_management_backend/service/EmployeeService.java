package com.ems.employee_management_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.employee_management_backend.model.Employee;
import com.ems.employee_management_backend.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository empRepository;

	public List<Employee> getAllEmployees() {
		return empRepository.findAll();
	}

	public Employee getEmployeeById(Long id) {
		return empRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Employee not found with the id: " + id));
	}

	public Employee saveEmployee(Employee emp) {
		return empRepository.save(emp);
	}

	public Employee updateEmployee(Long id, Employee updatedEmp) {
		Employee emp = getEmployeeById(id);
		emp.setFirstName(updatedEmp.getFirstName());
	    emp.setLastName(updatedEmp.getLastName());
	    emp.setEmail(updatedEmp.getEmail());
	    return empRepository.save(emp);
	}
	
	public void deleteEmployee(Long id) {
		Employee emp = getEmployeeById(id);
		empRepository.delete(emp);
	}
}
