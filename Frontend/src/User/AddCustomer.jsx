import React, { useState, useEffect } from 'react';
import './AddCustomer.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import UserNavbar from './UserNavbar';
import { addcustomer } from '../API/ApiCalling';
import { useSelector } from 'react-redux';

function AddCustomer() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [way, setWay] = useState('');
    const [course, setCourse] = useState('');
    const [date, setDate] = useState('');
    const [execuId, setExecuId] = useState('');
    const [otherWay, setOtherWay] = useState('');
    const [execuname, setExecuname] = useState('')
    const [loading, setLoading] = useState(false);

    const logininfom = useSelector((state) => state.userlogin?.LoginInfo[0]);
    console.log("from addcustomer logininfom", logininfom);

    const navigate = useNavigate();

    useEffect(() => {
        if (logininfom) {
            setExecuId(logininfom.id);
            setExecuname(logininfom.execuname)
        }
    }, [logininfom]);

    async function apicallAdd() {
        setLoading(true);
        await addcustomer({ fullname, email, phone, way: way === "Others" ? otherWay : way, course, date, execuId, execuname });
        navigate('/');
        setLoading(false);
    }

    return (
        <>
            <UserNavbar />
            <div className="custmerAdd-container">
                <div className="custmerAdd-box_main">
                    <div className="custmerAdd-logo">Add Customer</div>
                    <div className="custmerAdd_inner_box_signup">
                        <div className="custmerAdd-form">
                            <input
                                className="custmerAdd-input"
                                type="text"
                                placeholder="Full Name"
                                value={fullname}
                                required
                                onChange={(e) => setFullname(e.target.value)}
                            />
                            <input
                                className="custmerAdd-input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="custmerAdd-input"
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <select
                                className="custmerAdd-input"
                                value={way}
                                onChange={(e) => setWay(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    How did you find us?
                                </option>
                                <option value="Instagram" >Instagram</option>
                                <option value="Facebook">Facebook</option>
                                <option value="YouTube">YouTube</option>
                                <option value="Reference">Reference</option>
                                <option value="Website">Website</option>
                                <option value="Others">Others</option>
                            </select>

                            {way === "Others" && (
                                <input
                                    className="custmerAdd-input"
                                    type="text"
                                    placeholder="Please specify"
                                    value={otherWay}
                                    onChange={(e) => setOtherWay(e.target.value)}
                                />
                            )}

                            <select
                                className="custmerAdd-input"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Select Course
                                </option>
                                <option value="MERN Stack">MERN Stack</option>
                                <option value="Python Django">Python Django</option>
                            </select>

                            <input
                                className="custmerAdd-input calander"
                                type="date"
                                value={date}
                                required
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className="custmerAdd-button"
                        type="button"
                        onClick={apicallAdd}
                    >
                        {loading ? <div className="spinner"></div> : "Add Customer"}
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AddCustomer;
