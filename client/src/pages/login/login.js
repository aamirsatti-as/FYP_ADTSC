import React, { useState,useEffect } from 'react'
import './login.css';
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { signin} from '../../actions/auth';
const login = () => {
    const initialState = { email: '', password: '' };
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(formData)
        setFormErrors(validate(formData));
        setIsSubmit(true);	
        // dispatch(signin(formData,navigate));
        // navigate('/admin')
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
		  console.log(Object.keys(formErrors));
          
          navigate('/admin')
		//   dispatch(changePassword(formData,navigate));
		  
		}
		
	  }, [formErrors]);

	  const validate = (values) => {
		const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.email) {
		  errors.email = "Email is Required";
		}
        else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
          }
		if (!values.password) {
		  errors.password = "Password is Required";
		} 
		return errors;
	  };


    return (
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
                                <form action="#" className="signin-form">
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
                                        <button type="submit" className="form-control btn btn-primary rounded submit px-3" onClick={handleLogin}>Sign In</button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50 text-left">
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="#">Forgot Password</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default login