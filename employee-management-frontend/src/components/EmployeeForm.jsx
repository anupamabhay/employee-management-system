import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './EmployeeForm.module.css';

const EmployeeForm = ({ onFormSubmit, updateEmployee }) => {

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    // useEffect (listens to updateEmployee) to update employee during UPDATE operation
    useEffect(() => {
        if(updateEmployee) setEmployee(updateEmployee);
        else setEmployee({ firstName: '', lastName: '', email: '' });
    }, [updateEmployee]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmployee(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // if employee id exists, then it's an UPDATE operation
            if(employee.id) {
                // PUT operation to update employee
                await axios.put(`http://localhost:8080/api/employees/${employee.id}`, employee);
            } 
            // else, it's a POST operation
            else {
                // create a new employee
                await axios.post('http://localhost:8080/api/employees', employee);
            }

            onFormSubmit();
            setEmployee({ firstName: '', lastName: '', email: '' });
        } catch (error) {
            console.error('Error submitting form', error);
        }
    }

    return (
        <div className={styles.formContainer}>

            <h3 className={styles.formTitle}>{employee.id ? 'Edit Employee' : 'Add Employee'}</h3>
           
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text" 
                        name='firstName'
                        onChange={handleChange}
                        value={employee.firstName}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text" 
                        name='lastName'
                        onChange={handleChange}
                        value={employee.lastName}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name='email'
                        onChange={handleChange}
                        value={employee.email}
                        required
                    />
                </div>

                <button type='submit' className={styles.submitButton}>{employee.id ? 'Update' : 'Add'}</button>
            </form>
        </div>
    );
}

export default EmployeeForm;