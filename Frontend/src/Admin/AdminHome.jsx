import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from '../User/Footer';
import './AdminHome.css';
import { allfetchcustomers } from './API_Calling_Admin/API';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { MdCloudDone, MdOutlineMoving, MdPlaylistAddCheckCircle } from 'react-icons/md';

function AdminHome() {
  const [data, setData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [ongoingCustomers, setOngoingCustomers] = useState(0);
  const [interested, setInterested] = useState(0);
  const [joinedCustomers, setJoinedCustomers] = useState(0);
  const [notJoiningCustomers, setNotJoiningCustomers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // New state for selected filter

  useEffect(() => {
    async function apicallAllcustmores() {
      try {
        const response = await allfetchcustomers();
        const customers = response.data;
        console.log(customers);
        
        setData(customers);

        // Calculate counts
        setTotalCustomers(customers.length);
        setInterested(customers.filter((c) => c.status === 'interested').length);
        setOngoingCustomers(customers.filter((c) => c.status === 'Ongoing').length);
        setJoinedCustomers(customers.filter((c) => c.status === 'joined_course').length);
        setNotJoiningCustomers(customers.filter((c) => c.status === 'dont_want_to_join').length);
      } catch (error) {
        console.error('Error fetching executives data:', error);
      }
    }

    apicallAllcustmores();
  }, []);

  // Filter customers based on selected filter and search term
  const filteredData = data.filter((customer) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'interested' && customer.status === 'interested') ||
      (selectedFilter === 'ongoing' && customer.status === 'Ongoing') ||
      (selectedFilter === 'joined' && customer.status === 'joined_course') ||
      (selectedFilter === 'not_joining' && customer.status === 'dont_want_to_join');

    const matchesSearch =
      customer.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.toString().includes(searchTerm));

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <AdminNavbar />
      <div className="topSectionMain_div_adminHomepage">
        <div className="topsection_inner_div_adminHomepage">
          <div className="topsection_card_adminHomepage" onClick={() => setSelectedFilter('all')}>
            <MdPlaylistAddCheckCircle />
            <h3>Total Customers</h3>
            <p>{totalCustomers}</p>
          </div>
          <div className="topsection_card_adminHomepage" onClick={() => setSelectedFilter('interested')}>
            <AiFillLike />
            <h3>Interested Customers</h3>
            <p>{interested}</p>
          </div>
          <div className="topsection_card_adminHomepage" onClick={() => setSelectedFilter('ongoing')}>
            <MdOutlineMoving />
            <h3>Ongoing Customers</h3>
            <p>{ongoingCustomers}</p>
          </div>
          <div className="topsection_card_adminHomepage" onClick={() => setSelectedFilter('joined')}>
            <MdCloudDone />
            <h3>Joined Customers</h3>
            <p>{joinedCustomers}</p>
          </div>
          <div className="topsection_card_adminHomepage" onClick={() => setSelectedFilter('not_joining')}>
            <AiFillDislike />
            <h3>Not Joining</h3>
            <p>{notJoiningCustomers}</p>
          </div>
        </div>
      </div>

      <div className="middle_data_section_adminHomepage">
        <div className="middle_inner_div_adminHomepage">
          <input
            type="text"
            placeholder="Search by name or phone"
            className="searchbar_adminhomepage"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="customer_table_adminhomepage">
            <thead>
              <tr>
                <th>NO.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Method</th>
                <th>Status</th>
                <th>Counselor</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer.fullname}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.course}</td>
                  <td>{customer.method}</td>
                  <td>{customer.status}</td>
                  <td>{customer.execuname}</td>
                  <td>{new Date(customer.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}</td>
                  <td>
                    <Link to={`/OneCustomerAdmin/${customer._id}`}>
                      <button className="customer_actions_button_adminhomepage">Daily Update</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminHome;
