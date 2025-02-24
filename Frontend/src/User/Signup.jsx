import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin/AdminNavbar';
import { AdminTokenRequest } from '../AxiosCreate';
import Footer from './Footer';

function Signup() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [profilepic, setProfilepic] = useState(null);
    const [preview, setPreview] = useState(null);

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfilepic(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullname || !email || !phone || !password || !role || !profilepic) {
            alert('Please fill in all fields, including uploading an image.');
            return;
        }

        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('role', role);
        formData.append('password', password);
        formData.append('profilepic', profilepic);

        try {
            const response = await AdminTokenRequest.post('/admin/AddExecutive', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message || 'Executive added successfully!');
            navigate('/AllExecutives');
        } catch (err) {
            console.error("Signup API Error:", err);
            alert(err.response?.data?.message || 'An error occurred during signup.');
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="user_signup-container">
                <div className="user_signup-box_main">
                    <div className="user_signup-logo">Add Executives</div>
                    <div className="user_inner_box_signup">
                        <div className="user_image-upload">
                            <label htmlFor="fileInput" className="user_image-upload-label">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="user_image-preview" />
                                ) : (
                                    <div className="user_image-upload-placeholder">+</div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleImageChange}
                                className="user_image-upload-input"
                                required
                            />
                        </div>
                        <div className="user_signup-form">
                            <input
                                className="user_signup-input"
                                type="text"
                                placeholder="Full Name"
                                value={fullname}
                                required
                                onChange={(e) => setFullname(e.target.value)}
                            />
                            <input
                                className="user_signup-input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="user_signup-input"
                                type="text"
                                placeholder="Phone Number"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                className="user_signup-input"
                                type="text"
                                placeholder="Role"
                                value={role}
                                required
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <input
                                className="user_signup-input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="user_signup-button" type="button" onClick={handleSubmit}>
                        Add Executive
                    </button>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Signup;
