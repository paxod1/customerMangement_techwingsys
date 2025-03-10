import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Getoneupdatecustomer } from "../API/ApiCalling";
import { TokenRequest } from '../AxiosCreate';
import Footer from "./Footer";
import UserNavbar from "./UserNavbar";
import "./DailycustomerUpdate.css";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

function DailyCustomerUpdate() {
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    fullname: "",
    course: "",
    email: "",
    phone: "",
    way: "",
    reason: "",
  });

  const [dailyUpdate, setDailyUpdate] = useState("");
  const [allDailyUpdates, setAllDailyUpdates] = useState([]);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [demireason, setDemireason] = useState("");
  const [method, setMethod] = useState("");
  const [contact, setContact] = useState("");
  const [way, setWay] = useState("");
  const [otherWay, setOtherWay] = useState("");
  const [followcontent, setFollowcontent] = useState('');
  const [followdate, setFollowdate] = useState('');
  const [followupassigndate, setFollowupassigndate] = useState('')

  const { id } = useParams();

  const submitUpdate = async () => {
    const finalReason = demireason || reason;
    const finalWay = way == "Others" ? otherWay : way;


    if (way === "Others" && !otherWay) {
      alert("Please specify the other way.");
      return;
    }

    try {
      console.log("from way", finalWay);

      const response = await TokenRequest.put("/user/custerdailyupdate", {
        id,
        updatedData: { ...updatedData },
        dailyUpdate: { update: dailyUpdate, contact },
        status,
        reason: finalReason,
        method,
        way: finalWay,
        followcontent,
        followdate,
        followupassigndate
      });

      console.log("Update Successful", response);
      alert("Data Updated");

      setAllDailyUpdates((prevUpdates) => [
        ...prevUpdates,
        { update: dailyUpdate, contact, date: new Date().toISOString() },
      ]);

      setDailyUpdate("");
      setContact("");
      setOtherWay("");
      setFollowcontent('');
      setFollowdate('');
      setFollowupassigndate('')
    } catch (err) {
      console.error("Error in updating customer:", err);
    }
  };

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await Getoneupdatecustomer(id);
        console.log(response.data);

        setData(response.data);
        setUpdatedData({
          fullname: response.data.fullname,
          course: response.data.course,
          email: response.data.email,
          phone: response.data.phone,
          reason: response.data.reason || "",
        });
        setDemireason(response.data.reason);
        setAllDailyUpdates(response.data.dailyUpdate || []);
        setStatus(response.data.status || "");
        setMethod(response.data.method || "");
        setWay(response.data.way || "");
        setFollowcontent(response.data.followcontent || '');
        setFollowdate(response.data.followdate || '');
      } catch (error) {
        console.error("Error fetching customer data:", error);
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
    if (e.target.value !== "dont_want_to_join") {
      setReason("");
      setDemireason("");
    }
  };

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleReasonChange = (e) => {
    setDemireason(e.target.value);
  };

  const fllowupassign = (e) => {
    setFollowdate(e.target.value)
    setFollowupassigndate(Date())
  };

  return (
    <>
      <UserNavbar />
      <div className="updatecustomerpage_container">
        <div className="updatecustomerpage_innerdiv">
          <h1 className="updatecustomerpage_heading">Executive Daily Update</h1>
          {data ? (
            <div>
              <div className="customer_card">
                <div className="customer_card_header">
                  <h3 className="customer_name">{data.fullname}</h3>
                  <a href={`tel:${data.phone}`} className="call-button">
                    <FaPhone className="phone-icon" />
                  </a>
                </div>

                <div className="customer_details">
                  <div className="left_column">
                    <label>
                      <span className="customer_label">Fullname:</span>
                      <input type="text" value={data.fullname} className="updatecustomerpage_input" disabled />
                    </label>
                    <label>
                      <span className="customer_label">Course:</span>
                      <input type="text" value={data.course} className="updatecustomerpage_input" disabled />
                    </label>
                    <label>
                      <span className="customer_label">Email:</span>
                      <input type="email" value={data.email} className="updatecustomerpage_input" disabled />
                    </label>
                    <label>
                      <span className="customer_label">Phone:</span>
                      <input type="text" value={data.phone} className="updatecustomerpage_input" />
                    </label>
                    <label>
                      <span className="customer_label">Way:</span>
                      <select
                        className="updatecustomerpage_input"
                        value={way}
                        onChange={(e) => setWay(e.target.value)}
                        required
                        disabled
                      >
                        <option value="way">{way}</option>

                      </select>
                      {way === "Others" && (
                        <input
                          className="updatecustomerpage_input"
                          type="text"
                          placeholder="Please specify"
                          value={otherWay}
                          onChange={(e) => setOtherWay(e.target.value)}
                          required
                        />
                      )}
                    </label>

                    <label>
                      <span className="customer_label">Method:</span>
                      <select value={method} onChange={handleMethodChange} className="updatecustomerpage_input" required>
                        <option value="">Select Method</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="undecided">Undecided</option>
                      </select>
                    </label>

                    <label>
                      <span className="customer_label">Status:</span>
                      <select
                        value={status}
                        onChange={handleStatusChange}
                        className="updatecustomerpage_input"
                      >
                        <option value="">Status</option>
                        <option value="interested">Interested</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="joined_course">Joined Course</option>
                        <option value="dont_want_to_join">
                          Don't want to join course
                        </option>
                      </select>
                    </label>

                    <label>
                      <span className="customer_label" style={{ color: 'black' }}>Write The Daily Updates:</span>
                      <textarea
                        value={dailyUpdate}
                        onChange={handleDailyUpdateChange}
                        placeholder="Add a new update"
                        className="updatecustomerpage_input"
                        required
                      />
                    </label>



                  </div>

                  <div className="right_column">

                    <label>
                      <span className="customer_label" style={{ color: 'black' }}>Contact Type:</span>
                      <select value={contact} onChange={handleContactChange} className="updatecustomerpage_input" required>
                        <option value="">Select Contact Method</option>
                        <option value="call">Call</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                        <option value="text_message">Text Message</option>
                      </select>
                    </label>


                    {/* Follow-up content and date */}
                    <label>
                      <span className="customer_label" style={{ color: 'black' }}>Follow-up Content:</span>
                      <textarea
                        value={followcontent}
                        onChange={(e) => setFollowcontent(e.target.value)}
                        placeholder="Enter follow-up content"
                        className="updatecustomerpage_input"
                      />
                    </label>
                    <label>
                      <span className="customer_label" style={{ color: 'black' }}>Follow-up Date:</span>
                      <input
                        type="datetime-local"
                        value={followdate}
                        onChange={fllowupassign}
                        className="updatecustomerpage_input"
                      />
                    </label>

                    <div className="daily_updates_list">
                      <h3>All Daily Updates:</h3>
                      <div className="daily_updates_box" style={{ whiteSpace: 'pre-wrap' }}>
                        {allDailyUpdates.length > 0 ? (
                          allDailyUpdates.slice().reverse().map((update, index) => (
                            <div key={index} className="daily_update_item">

                              <div className="daily_update_icon_timestamp" style={{ whiteSpace: 'pre-wrap' }}>
                                <div className="daily_update_icon">
                                  {update.contact === "N/A" && "N/A"}
                                  {update.contact === "call" && (
                                    <FaPhoneSquareAlt className="contact_icon" />
                                  )}
                                  {update.contact === "email" && (
                                    <MdMarkEmailRead className="contact_icon" />
                                  )}
                                  {update.contact === "whatsapp" && (
                                    <FaSquareWhatsapp className="contact_icon" />
                                  )}
                                  {update.contact === "text_message" && (
                                    <MdMessage className="contact_icon" />
                                  )}
                                </div>
                                <span className="daily_update_timestamp">
                                  {new Date(update.date).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: true,
                                  })}
                                </span>
                              </div>

                              <div className="daily_update_content">
                                <p>{update.update}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No updates available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" className="updatecustomerpage_button" onClick={submitUpdate}>
                  Save Updates
                </button>
              </div>
            </div>
          ) : (
            <div className="loading">
            
              <p className="spinner">
         
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DailyCustomerUpdate;
