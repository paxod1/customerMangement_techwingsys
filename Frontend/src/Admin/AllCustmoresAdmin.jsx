import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { allfetchcustomers, DeleteCustomerdata } from './API_Calling_Admin/API';
import './AllCustmoresAdmin.css';
import AdminNavbar from './AdminNavbar';
import Footer from '../User/Footer';

function AllCustomersAdmin() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function apicallAllcustomers() {
            try {
                const response = await allfetchcustomers();
                console.log("from useEffect Allcustomers", response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        }

        apicallAllcustomers();
    }, []);

    async function deletecustomer(ID) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await DeleteCustomerdata(ID);
                    Swal.fire(
                        'Deleted!',
                        response.message || 'Customer has been deleted.',
                        'success'
                    );
                    setData(data.filter(customer => customer._id !== ID)); 
                } catch (error) {
                    Swal.fire('Error', 'Failed to delete customer. Please try again.', 'error');
                }
            } else {
                Swal.fire('Cancelled', 'The customer was not deleted.', 'info');
            }
        });
    }

    return (
        <div>
            <AdminNavbar />
            <div className="allCustomersPage-Admins-container">
                <h2 className="allCustomersPage-heading">List Of Customers</h2>
                <div className="allCustomersPage-Admins-list">
                    {data.map((customer, index) => (
                        <div className="allCustomersPage-Admin-card" key={index}>
                            <div className="allCustomersPage-Admin-details">
                                <p>
                                    <span className="allCustomersPage-Admin-label">Name:</span>{" "}
                                    {customer.fullname}
                                </p>
                                <p>
                                    <span className="allCustomersPage-Admin-label">Email:</span>{" "}
                                    {customer.email}
                                </p>
                                <p>
                                    <span className="allCustomersPage-Admin-label">Phone:</span>{" "}
                                    {customer.phone}
                                </p>
                                <p>
                                    <span className="allCustomersPage-Admin-label">Course:</span>{" "}
                                    {customer.course}
                                </p>
                                <p>
                                    <span className="allCustomersPage-Admin-label">Executive Name:</span>{" "}
                                    {customer.execuname}
                                </p>
                            </div>
                            <div className="allCustomersPage-Admin-card-footer">
                                <Link to={`/OneCustomerAdmin/${customer._id}`}>
                                    <button className="allCustomersPage-buttons-Admin">Daily Update</button>
                                </Link>
                                <button
                                    className="allCustomersPage-buttons-Admin"
                                    onClick={() => deletecustomer(customer._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AllCustomersAdmin;
