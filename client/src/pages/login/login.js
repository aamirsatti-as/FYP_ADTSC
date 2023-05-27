import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import {
  PasswordOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [OTP, setOTP] = useState();
  const [modalOTP, setModalOTP] = useState();
  const [modalForget, setModalForget] = useState(false);
  const [password, setPassword] = useState();
  const [cnfrmpassword, setCnfrmPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailForget, setEmailForget] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleChangeForget = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    if (password != cnfrmpassword) {
      toast("Password does not match with confirm password ");
      return;
    }

    axios
      .put("http://localhost:5000/forgetPassword", { password })
      .then((res) => {
        toast(res.data.message);
        setModalForget(false);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const res = await axios.post("http://localhost:5000/login", formData);
    const data = res.data;

    if (res.status === 422) {
      toast(res.data.message);
    }
    if (res.status === 200) {
      toast(res.data.message);
      localStorage.setItem("profile", JSON.stringify({ data }));
      navigate("/admin/dashboard");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitForget = async (e) => {
    e.preventDefault();
    let email = emailForget;
    setModal(false);
    setModalOTP(true);

    await axios.post("http://localhost:5000/sendOTP", { email }).then((res) => {
      if (res.data.User_Email) {
        setModalOTP(true);
        // if(modal==false)
      } else {
        toast("Invalid Email");
      }
    });
  };
  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    let email = emailForget;

    let otp = OTP;

    if (email && otp) {
      await axios
        .post("http://localhost:5000/verifyOTP", { email, otp })
        .then((res) => {
          if (res.status == 200) {
            // setModalOTP(true)
            // toast('change')
            setModalOTP(false);
            setModalForget(true);
          } else {
            toast("Invalid OTP");
            setModalOTP(false);
          }
        });
    }
  };

  return (
    <>
      <div className="ftco-section">
        <div className="container">
          <div className="row justify-content-center"></div>
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img"></div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    {/* <div className="w-100">
                      <h3 className="mb-4">Sign In</h3>
                    </div> */}
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="text-center mb-5">
                      <Typography variant="h4">Login</Typography>
                    </div>

                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          name="email"
                          label="Email"
                          placeholder="Email"
                          required
                          onChange={handleChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type={showPassword ? "text" : "password"}
                          name="password"
                          label="Password"
                          placeholder="Enter your password"
                          required
                          onChange={handleChange}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleTogglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>

                    <p className="error">{formErrors.password}</p>
                    <div className="form-group mt-5">
                      <button
                        type="submit"
                        className="form-control btn btn-primary rounded submit px-3"
                      >
                        Sign In
                      </button>
                    </div>
                    {/* <div className="form-group d-md-flex">
                                            <div className="w-50 text-left">
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <a onClick={() => {
                                                    // setModal(true)
                                                    // setModalOTP(true)
                                                    // setModalForget(true)

                                                }}>Forgot Password</a>
                                            </div>
                                        </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="md"
        isOpen={modal}
        // className='modelNot'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        toggle={() => setModal(!modal)}
      >
        <ModalHeader className="modelNot" toggle={() => setModal(!modal)}>
          <h2 className="cardTitle" style={{ color: "#000" }}>
            ForgetPassword
          </h2>
        </ModalHeader>
        <ModalBody className="modelNot">
          <Form onSubmit={handleSubmitForget}>
            <Row>
              <Col className="pl-1" md="12">
                <Form.Group>
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <Form.Control
                    // defaultValue={result.email}
                    placeholder="Enter Email"
                    type="email"
                    name="emailForget"
                    value={emailForget}
                    required
                    onChange={(e) => setEmailForget(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {/* <Button
                            className="btn-fill pull-right"
                            id="btnEdit"
                            type="submit"
                            variant="info"
                            onClick={handleSubmitForget}
                            style={{
                                float: 'right'
                            }}
                        >
                            Submit
                        </Button> */}

            <input
              style={{
                backgroundColor: "#1DC7EA",
                color: "#FFFFFF",
                opacity: 1,
                padding: "10px 20px",
                borderRadius: "0.25rem",
                margin: "10px",
                textAlign: "center",
                border: "1px solid transparent",
                borderColor: "#17a2b8",
                float: "right",
              }}
              type="submit"
              value="Update"
            />
          </Form>
        </ModalBody>
      </Modal>

      <Modal
        size="md"
        isOpen={modalOTP}
        // className='modelNot'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        toggle={() => setModal(!modal)}
      >
        <ModalHeader className="modelNot" toggle={() => setModal(!modal)}>
          <h2 className="cardTitle" style={{ color: "#000" }}>
            ForgetPassword
          </h2>
        </ModalHeader>
        <ModalBody className="modelNot">
          <Form onSubmit={handleSubmitOTP}>
            <Row>
              <Col className="pl-1" md="12">
                <Form.Group>
                  <label htmlFor="exampleInputEmail1">Enter OTP</label>
                  <Form.Control
                    // defaultValue={result.email}
                    placeholder="Enter OTP"
                    type="email"
                    name="emailForget"
                    required
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {/* <Button
                            className="btn-fill pull-right"
                            id="btnEdit"
                            type="submit"
                            variant="info"
                            onClick={handleSubmitOTP}
                            style={{
                                float: 'right'
                            }}
                        >
                            Submit
                        </Button> */}
            <input
              style={{
                backgroundColor: "#1DC7EA",
                color: "#FFFFFF",
                opacity: 1,
                padding: "10px 20px",
                borderRadius: "0.25rem",
                margin: "10px",
                textAlign: "center",
                border: "1px solid transparent",
                borderColor: "#17a2b8",
                float: "right",
              }}
              type="submit"
              value="Update"
            />
          </Form>
        </ModalBody>
      </Modal>

      <Modal
        size="md"
        isOpen={modalForget}
        // className='modelNot'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        toggle={() => setModal(!modal)}
      >
        <ModalHeader className="modelNot" toggle={() => setModal(!modal)}>
          <h2 className="cardTitle" style={{ color: "#000" }}>
            ForgetPassword
          </h2>
        </ModalHeader>
        <ModalBody className="modelNot">
          <Form onSubmit={handleForgetPassword}>
            <Row>
              <Col className="pl-1" md="12">
                <Form.Group>
                  <label htmlFor="exampleInputEmail1">Enter Password</label>
                  <Form.Control
                    // defaultValue={result.email}
                    placeholder="New Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <label htmlFor="exampleInputEmail1">Enter Password</label>
                  <Form.Control
                    // defaultValue={result.email}
                    placeholder="Confirm New Password"
                    type="password"
                    required
                    name="confirm new password"
                    value={cnfrmpassword}
                    onChange={(e) => setCnfrmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <input
              style={{
                backgroundColor: "#1DC7EA",
                color: "#FFFFFF",
                opacity: 1,
                padding: "10px 20px",
                borderRadius: "0.25rem",
                margin: "10px",
                textAlign: "center",
                border: "1px solid transparent",
                borderColor: "#17a2b8",
                float: "right",
              }}
              type="submit"
              value="Update"
            />
          </Form>
        </ModalBody>
      </Modal>

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
  );
};

export default Login;
