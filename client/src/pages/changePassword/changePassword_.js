import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './changePassword.css';
import { changePassword } from '../../actions/auth';

const ChangePassword = () => {

	const initialState = { oldPassword: '', newPassword: '', cnfrmNewPassword: '' };
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handlePassword = (e) => {
		e.preventDefault();
		setFormErrors(validate(formData));
		setIsSubmit(true);	
	}

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
		  dispatch(changePassword(formData,navigate)); 
		}
	  }, [formErrors]);

	  const validate = (values) => {
		const errors = {};
		if (!values.oldPassword) {
		  errors.oldPassword = "Fill the Required Field";
		}
		if (!values.newPassword) {
		  errors.newPassword = "Fill the Required Field";
		} 
		if (!values.cnfrmNewPassword) {
		  errors.cnfrmNewPassword = "Fill the Required Field";
		} 
		return errors;
	  };


	return (

		<>

			<div className="limiter">
				<div className="container-login100">
					<div className="wrap-login100">
						<div className="login100-form-title" >
							<span className="login100-form-title-1">
								Change Password
							</span>
						</div>

						<form className="login100-form validate-form">
							<div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
								<span className="label-input100">Old Password </span>
								<input className="input100" type="text" name="oldPassword" placeholder="Enter Old Password" onChange={handleChange} />
								<span className="focus-input100"></span>
							</div>
							<p className="error">{formErrors.oldPassword}</p>

							<div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
								<span className="label-input100">New Password</span>
								<input className="input100" type="password" name="newPassword" placeholder="Enter New password"  onChange={handleChange} />
								<span className="focus-input100"></span>
							</div>
							<p className="error">{formErrors.newPassword}</p>
							<div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
								<span className="label-input100">New Password</span>
								<input className="input100" type="password" name="cnfrmNewPassword" placeholder="Confirm New password"  onChange={handleChange} />
								<span className="focus-input100"></span>
							</div>
							<p className="error">{formErrors.cnfrmNewPassword}</p>
							<div className="container-login100-form-btn">
								<button className="login100-form-btn" onClick={handlePassword}>
									ChangePassword
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)

}
export default ChangePassword