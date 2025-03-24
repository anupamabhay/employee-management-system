import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmployeeForm from './EmployeeForm';
import styles from './EmployeeList.module.css';

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);
    const [updateEmployee, setUpdateEmployee] = useState(null);

    // GET operation
    const getEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/employees');
            console.log(response.data); // Debug
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees: ', error);
        }
    }

    // useEffect when component mounts
    useEffect(() => {
        getEmployees();
    }, []);

    // DELETE operation
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/employees/${id}`);
            getEmployees();
        } catch (error) {
            console.error(error);
        }
    } 

    // UPDATE operation
    const handleUpdate = (employee) => setUpdateEmployee(employee);

    // handle form submission
    const handleFormSubmit = () => {
        setUpdateEmployee(null);
        getEmployees();
    }

    return (
        <>
            <h1 className={styles.header}>Employee Management System</h1>

            <div className={styles.tableContainer}>

                <EmployeeForm onFormSubmit={handleFormSubmit} updateEmployee={updateEmployee} />

                <div>
                    <h3 className={styles.listHeader}>Employee List</h3>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map(emp => (
                                    <tr key={emp.id}>
                                        <td>{emp.id}</td>
                                        <td>{emp.firstName}</td>
                                        <td>{emp.lastName}</td>
                                        <td>{emp.email}</td>
                                        <td>
                                            <button className={styles.editButton} onClick={() => handleUpdate(emp)}>Edit</button>
                                            
                                            <button className={styles.deleteButton} onClick={() => handleDelete(emp.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            )}                                     
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

export default EmployeeList;