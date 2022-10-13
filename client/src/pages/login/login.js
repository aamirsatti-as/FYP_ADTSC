import React, { useState,useEffect } from 'react'
import './login.css';
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { signin} from '../../actions/auth';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const login = () => {
    const initialState = { email: '', password: '' };
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const handleLogin =async (e) => {
        e.preventDefault();
        console.log(formData)
        const email=formData.email;
        const password=formData.password;
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password
            }),
          });
          const data = await res.json();
          var token=data.token;
        //   console.log(data.token+"asdf")
          if (res.status === 422) {
            toast.error(data.message);
          }
          if (res.status === 200) {
            toast(data.message);
            localStorage.setItem('profile', JSON.stringify({ data }));
            navigate('/admin/dashboard');
          }

        // const data = await axios.post('http://localhost:5000/login', formData).then((response)=>{
        //     if (response.status==200) {
        //         navigate('/admin/dashboard')
        //     }
        //    }).catch(function (error) {
        //         if (error.response.status==422) {
        //             toast.error('Invalid Credentials');
        //             console.log(error)
        //             console.log(error.message)
        //             // toast(error.message)
        //         }
          
        //    })

        // dispatch(signin(formData,navigate));
        // navigate('/admin')
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    
    return (
        <>
        <div className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <div className="wrap d-md-flex">
                            <div className="img">
                            </div>
                            <div className="login-wrap p-4 p-md-5">
                                <div className="d-flex">
                                    <div className="w-100">
                                        <h3 className="mb-4">Sign In</h3>
                                    </div>
                                    <div className="w-100">
                                        <p className="social-media d-flex justify-content-end">
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
                                            <a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
                                        </p>
                                    </div>
                                </div>
                                <form onSubmit={handleLogin}>
                                    <div className="form-group mb-3">
                                        <label className="label" >Email</label>
                                        <input type="text" name='email' className="form-control" placeholder="Email" required onChange={handleChange} />
                                    </div>
                                    <p className="error">{formErrors.email}</p>
                                    <div className="form-group mb-3">
                                        <label className="label" >Password</label>
                                        <input type="password" name='password' className="form-control" placeholder="Password" required onChange={handleChange}/>
                                    </div>
                                    <p className="error">{formErrors.password}</p>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary rounded submit px-3" >Sign In</button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50 text-left">
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="reset">Forgot Password</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        </>
    )
}

export default login