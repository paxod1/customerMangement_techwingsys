import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ExectiveUpdate.css';
import { GetUpdateExecutivesData } from './API_Calling_Admin/API';
import { AdminTokenRequest } from '../AxiosCreate';
import Footer from '../User/Footer';
import AdminNavbar from './AdminNavbar';

function ExecutiveUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    fullname: '',
    role: '',
    email: '',
    phone: '',
    profilepic: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedData((prevData) => ({
        ...prevData,
        profilepic: file,
      }));
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('fullname', updatedData.fullname);
    formData.append('role', updatedData.role);
    formData.append('email', updatedData.email);
    formData.append('phone', updatedData.phone);
    if (updatedData.profilepic) {
      formData.append('profilepic', updatedData.profilepic);
    }

    try {
      const response = await AdminTokenRequest.put('/admin/UpdateExecutives', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Updated Data:', response.data);
      navigate('/AllExecutives')

      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error updating executive data:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="updatePageExecutive-container">
        <h1 className="updatePageExecutive-heading">Executive Update</h1>
        {data ? (
          <div className="executive-card">
            <div className="executive-card-header">
              <img
                src={imagePreview || `/Images/${data.profilepic}`}
                alt={`${data.fullname}'s profile`}
                className="executive-avatar"
              />
              <h3 className="executive-name">{data.fullname}</h3>
            </div>
            <div className="executive-details">
              <label>
                <span className="executive-label">Full Name:</span>
                <input
                  type="text"
                  name="fullname"
                  value={updatedData.fullname}
                  onChange={handleInputChange}
                  className="updatePageExecutive-input"
                />
              </label>
              <label>
                <span className="executive-label">Role:</span>
                <input
                  type="text"
                  name="role"
                  value={updatedData.role}
                  onChange={handleInputChange}
                  className="updatePageExecutive-input"
                />
              </label>
              <label>
                <span className="executive-label">Email:</span>
                <input
                  type="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleInputChange}
                  className="updatePageExecutive-input"
                />
              </label>
              <label>
                <span className="executive-label">Phone:</span>
                <input
                  type="text"
                  name="phone"
                  value={updatedData.phone}
                  onChange={handleInputChange}
                  className="updatePageExecutive-input"
                />
              </label>
              <label>
                <span className="executive-label">Profile Picture:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="updatePageExecutive-input"
                />
              </label>
              <button
                type="button"
                onClick={handleSave}
                className="updatePageExecutive-button"
              >
                Save Changes
              </button>
            </div>
           
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ExecutiveUpdate;
