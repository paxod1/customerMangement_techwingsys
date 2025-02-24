import React, { useState } from 'react'
import './signup.css'
import { SignupAPI } from './API_Calling_Admin/API'
import { useNavigate } from 'react-router-dom'

function AdminSignup() {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate()

    console.log(fullname);

    async function sendSignupDataToApicalling() {
        try {
            await SignupAPI({fullname,email,password})
            navigate('/Admin')

        } catch (eroor) {
            alert(eroor)
        }
    }

    return (
        <div className='main_div_signup_page'>
            <div className='inner_main_div_signup_page'>
                <h3>ADMIN SIGNUP PAGE</h3>
                <div className='form_section_signup'>
                    <label className='input_heading_signup'>Full name:</label>
                    <input className='input_field_signup_page' type="text" placeholder='Enter your full name' required onChange={(e) => setFullname(e.target.value)} />
                    <label className='input_heading_signup'>Email:</label>
                    <input className='input_field_signup_page' type="email" placeholder='Enter your Email' required onChange={(e) => setEmail(e.target.value)} />
                    <label className='input_heading_signup'>Password</label>
                    <input className='input_field_signup_page' type="password" placeholder='Enter a password' required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='submit_button_signup' onClick={sendSignupDataToApicalling}>submit</button>


            </div>

        </div>
    )
}

export default AdminSignup