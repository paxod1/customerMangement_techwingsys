import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OneCustomerAdmin.css";
import { AdminTokenRequest } from "../AxiosCreate";
import Footer from "../User/Footer";
import AdminNavbar from "./AdminNavbar";
import { Getoneupdatecustomer } from "./API_Calling_Admin/API";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdMarkEmailRead, MdMessage } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";

function OneCustomerAdmin() {
    const [data, setData] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        fullname: "",
        course: "",
        email: "",
        phone: "",
        way: "",
    });

    const [dailyUpdate, setDailyUpdate] = useState("");
    const [allDailyUpdates, setAllDailyUpdates] = useState([]);
    const [status, setStatus] = useState("");
    const [reason, setReason] = useState("");
    const [demireason, setDemireason] = useState("");
    const [reasonSubmitted, setReasonSubmitted] = useState(false);
    const [method, setMethod] = useState("");
    const [contact, setContact] = useState("");
    const [way, setWay] = useState("");
    const [otherWay, setOtherWay] = useState("");

    const { id } = useParams();

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
                    execuname: response.data.execuname,
                    execuId: response.data.execuId,
                    way: response.data.way || "",
                });

                setAllDailyUpdates(response.data.dailyUpdate || []);
                setStatus(response.data.status || "");
                setReason(response.data.reason || "");
                setMethod(response.data.method || "");
                setReasonSubmitted(
                    response.data.status === "dont_want_to_join" && response.data.reason !== ""
                );
                setWay(response.data.way || "");
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

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
    };

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        if (e.target.value !== "dont_want_to_join") {
            setReason("");
            setDemireason("");
            setReasonSubmitted(false);
            localStorage.removeItem("reasonSubmitted");
        }
    };

    const handleReasonChange = (e) => {
        setDemireason(e.target.value);
    };

    const handleWayChange = (e) => {
        setWay(e.target.value);
    };

    const handleOtherWayChange = (e) => {
        setOtherWay(e.target.value);
    };

    async function submitupdate() {
        const finalReason = demireason || reason;
        const finalWay = way === "Others" ? otherWay : way;

        if (way === "Others" && !otherWay) {
            alert("Please specify the other way.");
            return;
        }

        try {
            const response = await AdminTokenRequest.put("/user/custerdailyupdate", {
                id: id,
                updatedData: updatedData,
                dailyUpdate: { update: dailyUpdate, contact },
                status: status,
                reason: finalReason,
                method: method,
                way: finalWay,
            });

            setAllDailyUpdates((prevUpdates) => [
                ...prevUpdates,
                { update: dailyUpdate, contact, date: new Date().toLocaleString() },
            ]);
            alert("Data Updated");
            setDailyUpdate("");
            setContact("");
        } catch (err) {
            console.error("Error in updating customer:", err);
        }
    }

    return (
        <>
            <AdminNavbar />
            <div className="main_div_updatecustomerpage_admin">
                <div className="updatecustomerpage_container_admin">
                    <h1 className="updatecustomerpage_heading_admin">Daily Update</h1>
                    {data ? (
                        <div className="customer_card_admin">
                            <div className="customer_card_header_admin">
                                <h3 className="customer_name_admin">{data.fullname}</h3>
                            </div>
                            <div className="customer_details_admin">
                                <div className="left_column_admin">
                                    {["fullname", "course", "email", "phone"].map((field) => (
                                        <label key={field}>
                                            <span className="customer_label_admin">
                                                {field.charAt(0).toUpperCase() + field.slice(1)}:
                                            </span>
                                            <input
                                                type="text"
                                                name={field}
                                                value={updatedData[field]}
                                                onChange={handleInputChange}
                                                className="updatecustomerpage_input_admin"
                                            />
                                        </label>
                                    ))}

                                    <label>
                                        <span className="customer_label_admin">Way:</span>
                                        <select
                                            className="updatecustomerpage_input_admin"
                                            value={way}
                                            onChange={handleWayChange}
                                        >
                                            <option value="">Select Way</option>
                                            <option value="Instagram">Instagram</option>
                                            <option value="Facebook">Facebook</option>
                                            <option value="YouTube">YouTube</option>
                                            <option value="Reference">Reference</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        {way === "Others" && (
                                            <input
                                                className="updatecustomerpage_input_admin"
                                                type="text"
                                                placeholder="Please specify"
                                                value={otherWay}
                                                onChange={handleOtherWayChange}
                                            />
                                        )}
                                    </label>
                                    <label>
                                        <span className="customer_label_admin">Executive Name:</span>
                                        <input
                                            type="text"
                                            value={updatedData.execuname}
                                            className="updatecustomerpage_input_admin"
                                            disabled
                                        />
                                    </label>
                                    <label>
                                        <span className="customer_label_admin">Executive ID:</span>
                                        <input
                                            type="text"
                                            value={updatedData.execuId.substring(0, 4)}
                                            className="updatecustomerpage_input_admin"
                                            disabled
                                        />
                                    </label>
                                </div>
                                <div className="right_column_admin">
                                    <label>
                                        <span className="customer_label_admin">Status:</span>
                                        <select
                                            value={status}
                                            onChange={handleStatusChange}
                                            className="updatecustomerpage_input_admin"
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
                                    {status === "dont_want_to_join" && (
                                        <label>
                                            <span className="customer_label_admin">
                                                Reason for leaving:
                                            </span>
                                            <input
                                                type="text"
                                                value={demireason}
                                                onChange={handleReasonChange}
                                                className="updatecustomerpage_input_admin"
                                            />
                                        </label>
                                    )}
                                    <div>
                                        <span className="customer_label_admin">Method:</span>
                                        <select
                                            value={method}
                                            onChange={handleMethodChange}
                                            className="updatecustomerpage_input_admin"
                                        >
                                            <option value="">Select Method</option>
                                            <option value="online">Online</option>
                                            <option value="offline">Offline</option>
                                            <option value="undecided">Undecided</option>
                                        </select>
                                    </div>
                                    <label>
                                        <span className="customer_label_admin">Daily Updates:</span>
                                        <textarea
                                            value={dailyUpdate}
                                            onChange={handleDailyUpdateChange}
                                            placeholder="Add a new update"
                                            className="updatecustomerpage_input_admin"
                                            rows={5}
                                        />
                                    </label>
                                    <div>
                                        <span className="customer_label_admin">Contact Type:</span>
                                        <select
                                            value={contact}
                                            onChange={handleContactChange}
                                            className="updatecustomerpage_input_admin"
                                        >
                                            <option value="">Select Contact Method</option>
                                            <option value="call">Call</option>
                                            <option value="whatsapp">WhatsApp</option>
                                            <option value="email">Email</option>
                                            <option value="text_message">Text Message</option>
                                        </select>
                                    </div>



                                    

                                    <div className="daily_updates_list_admin">
                                    <h3>All Daily Updates:</h3>
                                    <div className="daily_updates_box_admin">
                                      {allDailyUpdates.length > 0 ? (
                                        allDailyUpdates.slice().reverse().map((update, index) => (
                                          <div key={index} className="daily_update_item_admin">

                                          <div className="daily_update_icon_timestamp_admin">
                                          <div className="daily_update_icon_admin">
                                            {update.contact === "N/A" && "N/A"}
                                            {update.contact === "call" && (
                                              <FaPhoneSquareAlt className="contact_icon_admin" />
                                            )}
                                            {update.contact === "email" && (
                                              <MdMarkEmailRead className="contact_icon_admin" />
                                            )}
                                            {update.contact === "whatsapp" && (
                                              <FaSquareWhatsapp className="contact_icon_admin" />
                                            )}
                                            {update.contact === "text_message" && (
                                              <MdMessage className="contact_icon_admin" />
                                            )}
                                          </div>
                                          <span className="daily_update_timestamp_admin">
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
                                          
                                            <div className="daily_update_content_admin">
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
                            <button
                                type="button"
                                className="updatecustomerpage_button_admin"
                                onClick={submitupdate}
                            >
                                Save Updates
                            </button>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OneCustomerAdmin;
