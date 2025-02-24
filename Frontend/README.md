# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




import axios from "axios";

const getTokenFromLocalStorage = () => {
  const persistedLoginData = localStorage.getItem("persist:logindata");
  const loginData = persistedLoginData ? JSON.parse(persistedLoginData) : {};
  const loginInfo = loginData.userlogin ? JSON.parse(loginData.userlogin).LoginInfo[0] : null;
  console.log("Login Info:", loginInfo);
  return loginInfo ? loginInfo.Token : ''; 
};

const getTokenFromLocalStorage1 = () => { 
  const persistedLoginData = localStorage.getItem("persist:logindata");
  const loginData = persistedLoginData ? JSON.parse(persistedLoginData) : {};
  const Adminlogin = loginData.Adminlogin ? JSON.parse(loginData.Adminlogin).LoginInfo[0] : null;
  console.log("Admin Info:", Adminlogin);
  return Adminlogin ? Adminlogin.Token : ''; 
};

const SampleUrl = 'http://localhost:5000';

export const basicRequest = axios.create({
  baseURL: SampleUrl
});

export const TokenRequest = axios.create({
  baseURL: SampleUrl,
  headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` } 
});

export const AdminTokenRequest = axios.create({
  baseURL: SampleUrl,
  headers: { Authorization: `Bearer ${getTokenFromLocalStorage1()}` } 
});
        



















        useEffect(() => {
    async function fetchExecutive() {
      try {
        const response = await GetUpdateExecutivesData(id);
        setData(response.data);
        setUpdatedData({
          fullname: response.data.fullname,
          role: response.data.role,
          email: response.data.email,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error('Error fetching executive data:', error);
      }
    }
    fetchExecutive();
  }, [id]);

















  import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DailycustomerUpdate.css';
import { Getoneupdatecustomer } from '../API/ApiCalling';
import { TokenRequest } from '../AxiosCreate';

function DailyCustomerUpdate() {
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    fullname: '',
    course: '',
    email: '',
    phone: '',
    way: '',
  });

  const [dailyUpdate, setDailyUpdate] = useState(''); // State for daily updates
  const [status, setStatus] = useState(''); // State for status
  const [reason, setReason] = useState(''); // State for reason when "Don't want to join course" is selected

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await Getoneupdatecustomer(id);
        setData(response.data);
        setUpdatedData({
          fullname: response.data.fullname,
          course: response.data.course,
          email: response.data.email,
          phone: response.data.phone,
          way: response.data.way
        });
      } catch (error) {
        console.error('Error fetching executive data:', error);
      }
    }
    fetchCustomer();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDailyUpdateChange = (e) => {
    setDailyUpdate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (e.target.value !== 'dont_want_to_join') {
      setReason(''); // Clear reason if another status is selected
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  async function submitupdate() {
    try {
      const response = await TokenRequest.put("/user/custerdailyupdate", {
        id: id, // Pass the customer ID
        updatedData: updatedData, // Pass the updated data for the customer
        dailyUpdate: dailyUpdate, // Pass the daily update
        status: status, // Pass the status
        reason: reason, // Pass the reason (if applicable)
      });
      console.log("Update Successful", response);
    } catch (err) {
      console.log("Error in updating customer:", err);
    }
  }

  return (
    <div>
      <div className="updatecustomerpage_container">
        <h1 className="updatecustomerpage_heading">Daily Update</h1>
        {data ? (
          <div>
            <div className="customer_card">
              <div className="customer_card_header">
                <h3 className="customer_name">{data.fullname}</h3>
              </div>
              <div className="customer_details">
                <div className="left_column">
                  <label>
                    <span className="customer_label">Full Name:</span>
                    <input
                      type="text"
                      name="fullname"
                      value={updatedData.fullname}
                      onChange={handleInputChange}
                      className="updatecustomerpage_input"
                    />
                  </label>
                  <label>
                    <span className="customer_label">Course:</span>
                    <input
                      type="text"
                      name="course"
                      value={updatedData.course}
                      onChange={handleInputChange}
                      className="updatecustomerpage_input"
                    />
                  </label>
                  <label>
                    <span className="customer_label">Email:</span>
                    <input
                      type="email"
                      name="email"
                      value={updatedData.email}
                      onChange={handleInputChange}
                      className="updatecustomerpage_input"
                    />
                  </label>
                  <label>
                    <span className="customer_label">Phone:</span>
                    <input
                      type="text"
                      name="phone"
                      value={updatedData.phone}
                      onChange={handleInputChange}
                      className="updatecustomerpage_input"
                    />
                  </label>
                  <label>
                    <span className="customer_label">How find:</span>
                    <input
                      type="text"
                      name="way"
                      value={updatedData.way}
                      onChange={handleInputChange}
                      className="updatecustomerpage_input"
                    />
                  </label>
                </div>

                <div className="right_column">
                  <div>
                    <span className="customer_label">Daily Updates:</span>
                    <textarea
                      value={dailyUpdate}
                      onChange={handleDailyUpdateChange}
                      placeholder="Daily Updates"
                      className="updatecustomerpage_input"
                      required
                    />
                  </div>

                  <div>
                    <select
                      value={status}
                      onChange={handleStatusChange}
                      className="updatecustomerpage_input"
                      required
                    >
                      <option value="">Status</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="joined_course">Joined Course</option>
                      <option value="dont_want_to_join">Don't want to join course</option>
                    </select>
                  </div>

                  {status === 'dont_want_to_join' && (
                    <div>
                      <label>
                        <span className="customer_label">Reason for leaving:</span>
                        <input
                          type="text"
                          value={reason}
                          onChange={handleReasonChange}
                          className="updatecustomerpage_input"
                          placeholder="Please provide the reason"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <button type="button" className="updatecustomerpage_button" onClick={submitupdate}>
                Save Updates
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default DailyCustomerUpdate;













 AdminHome








                       <label>
                                    <span className="customer_label_admin">Executive ID:</span>
                                    <input
                                        type="text"
                                        value={updatedData.execuId.substring(0, 4)}
                                        className="updatecustomerpage_input_admin"
                                        disabled
                                    />
                                </label>


                                DailyCustomerUpdate