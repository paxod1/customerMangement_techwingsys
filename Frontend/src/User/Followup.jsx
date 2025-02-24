import React, { useState, useEffect } from "react";
import "./Followup.css";
import { TokenRequest } from "../AxiosCreate";

function FollowUpSidebar({ followups }) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([])
    const { alerts, setAlerts } = useState()


    useEffect(() => {

        setData(followups)
        console.log(data.length);
        console.log(data);



    }, [followups]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    async function deletefollowups(id) {
        try {
            const response = await TokenRequest.put('/user/removeFollowContent', { id });
            alert(response.data.message);
        } catch (error) {
            console.error('Error deleting follow-up:', error);
            alert('Error deleting follow-up');
        }
    }

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const day = String(formattedDate.getDate()).padStart(2, '0');
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const year = formattedDate.getFullYear();
        let hours = formattedDate.getHours();
        const minutes = String(formattedDate.getMinutes()).padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return `${day}-${month}-${year} ${formattedTime}`;
    };

    return (
        <>
            <button className="followup_toggle_button" onClick={toggleSidebar}>
                <div className="followup_button_content">
                    {data.length > 0 && (
                        <span className="followup_button_count">{data.length}</span>
                    )}
                    Follow-Ups
                </div>
            </button>



            <div className={`followup_sidebar ${isOpen ? "open" : ""}`}>
                <h3>Follow-Up List</h3>
                <p>Total Follow-ups: {followups.length}</p>
                <ul className="followup_list">
                    {data.length > 0 ? (
                        data.map((followup) => (
                            <li key={followup.id} className="followup_item">
                                <p>
                                    <strong>Name:</strong> {followup.name}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {followup.phone}
                                </p>
                                <p>
                                    <strong>Content:</strong> {followup.content}
                                </p>
                                <p>
                                    <strong>Date:</strong> {formatDate(followup.followDate)}
                                </p>

                                <p>
                                    <strong>AssignedDate:</strong> {formatDate(followup.followupassigndate)}
                                </p>

                                <button className="buton_followupsdoned" onClick={() => { deletefollowups(followup.id) }}>
                                    Done
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No follow-ups available.</p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default FollowUpSidebar;
