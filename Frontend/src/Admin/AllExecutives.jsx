import React, { useEffect, useState } from "react";
import { AllExecutivesData } from "./API_Calling_Admin/API";
import AdminNavbar from "./AdminNavbar";
import "./AllExecutives.css";
import Footer from "../User/Footer";
import { Link } from "react-router-dom";

function AllExecutives() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchExecutives() {
      try {
        const response = await AllExecutivesData();
        console.log("from useEffect AllExecutives", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching executives data:", error);
      }
    }
    fetchExecutives();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="allExecutivePage_executives-container">
        <h2 className="allExecutivePage_heading">Our Executives</h2>
        <div className="allExecutivePage_executives-list">
          {data.map((executive, index) => (
            <div className="allExecutivePage_executive-card" key={index}>
              <div className="allExecutivePage_executive-card-header">
                <img
                  src={`/Images/${executive.profilepic}`} // Adjust image path
                  alt={`${executive.fullname}'s profile`}
                  className="allExecutivePage_executive-avatar"
                />
                <h3 className="allExecutivePage_executive-name">{executive.fullname}</h3>
              </div>
              <div className="allExecutivePage_executive-details">
                <p>
                  <span className="allExecutivePage_executive-label">Role:</span>{" "}
                  {executive.role}
                </p>
                <p>
                  <span className="allExecutivePage_executive-label">Email:</span>{" "}
                  {executive.email}
                </p>
                <p>
                  <span className="allExecutivePage_executive-label">Phone:</span>{" "}
                  {executive.phone}
                </p>
              </div>
              <div className="allExecutivePage_executive-card-footer">
                <Link to={`/ExecutiveUpdate/${executive._id}`}>
                  <button className="allExecutivePage_buttons_allExucutive">Update Data</button>
                </Link>

                <button className="allExecutivePage_buttons_allExucutive">View Customers</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllExecutives;
