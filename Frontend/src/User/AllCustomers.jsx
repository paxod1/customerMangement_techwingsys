import React, { useEffect, useState } from 'react';
import { fetchcustomers } from '../API/ApiCalling';
import { useSelector } from 'react-redux';
import './AllCustomers.css'
import { Link } from 'react-router-dom';
import Footer from './Footer';
import UserNavbar from './UserNavbar';

function AllCustomers() {
    const [data, setData] = useState([]);
    const [execuId, setExecuId] = useState('');

    const logininfom = useSelector((state) => state.userlogin?.LoginInfo[0]);
    console.log("from allcustomer logininfom", logininfom?.id);

    useEffect(() => {
        if (logininfom) {
            setExecuId(logininfom.id);
        }
    }, [logininfom]);


    useEffect(() => {
        if (execuId) {
            async function apicallAllcustmores() {
                try {
                    const response = await fetchcustomers(execuId);
                    console.log("from useEffect Allcustomers", response.data);
                    setData(response.data);
                } catch (error) {
                    console.error("Error fetching executives data:", error);
                }
            }

            apicallAllcustmores();
        }
    }, [execuId]);

    return (
        <div>
            <UserNavbar />
            <div className="allCustomersPage_executives-container">
                <h2 className="allCustomersPage_heading">Your Customers</h2>
                <div className="allCustomersPage_executives-list">
                    {data.map((customer, index) => (
                        <div className="allCustomersPage_executive-card" key={index}>
                            <div className="allCustomersPage_executive-details">
                                <p>
                                    <span className="allCustomersPage_executive-label">Name:</span>{" "}
                                    {customer.fullname}
                                </p>
                                <p>
                                    <span className="allCustomersPage_executive-label">Email:</span>{" "}
                                    {customer.email}
                                </p>
                                <p>
                                    <span className="allCustomersPage_executive-label">Phone:</span>{" "}
                                    {customer.phone}
                                </p>
                                <p>
                                    <span className="allCustomersPage_executive-label">Course:</span>{" "}
                                    {customer.course}
                                </p>
                                <p>
                                    <span className="allCustomersPage_executive-label">How find:</span>{" "}
                                    {customer.way}
                                </p>
                                <p>
                                    <span className="allCustomersPage_executive-label">Date:</span>{" "}
                                    {customer.date}
                                </p>
                            </div>
                            <div className="allCustomersPage_executive-card-footer">
                                <Link  to={`/DailyCustomerUpdate/${customer._id}`}>
                                    <button className="allCustomersPage_buttons_allExecutive" >Daily update</button>
                                </Link>

                                <button className="allCustomersPage_buttons_allExecutive">Update Profile</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AllCustomers;
