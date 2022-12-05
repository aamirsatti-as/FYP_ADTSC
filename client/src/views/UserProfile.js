import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../app";
import FileBase from 'react-file-base64';
import axios from "axios";
// react-bootstrap components
// import FileBase from 'react-file-base64';
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateNotifier } from "../actions/updateUserAction";

function User() {
  const dispatch = useDispatch()
  const [result, setResult] = useState([]);
  const [user, setUser] = useState(true);
  var [check, setCheck] = useState(true);
  const [formData, setFormData] = useState();
  const [error, setError] = useState(false);
  const [userErr, setUserErr] = useState(false)
  const [phoneErr, setPhoneErr] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false);
  const [data1, setData1] = useState('')


  const fetchData = async () => {

    let result = await fetch("http://localhost:5000/getAdmin");
    result = await result.json();
    setResult(result);
    setCheck(false)
  };

  useEffect(() => {
    console.log('inside')

    fetchData()
  }, []);


  const navigate = useNavigate();
  const handleChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleEditProfile = async (e) => {
    e.preventDefault()
    let result1 = await fetch("http://localhost:5000/getAdmin");
    result1 = await result1.json();

    setFormData(result1);
    setUser(false)
  }

  // const handleReload =async()=>{
  //   let result1 = await fetch("http://localhost:5000/getAdmin");
  //   result1 = await result1.json();

  //   setFormData(result1);
  //   setUser(false)
  //   setResult(result1)
  // }

  // if(!result.email && !user){
  //   setUser(true)
  //   window.location.reload()
  // }


  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (formData.UserName.length == 0 || formData.LastName.length == 0 || formData.FirstName.length == 0 || formData.Phone.length == 0 || formData.City.length == 0 || formData.Country.length == 0 || formData.Address.length == 0 || formData.AboutMe.length == 0) {
      setError(true)
      return
    }
    const regexUsername = /^[a-zA-Z]{5,}[0-9]+[0-9]*$/;
    if (!regexUsername.test(formData.UserName)) {
      setUserErr(true)
      return
    }

    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!regexPhone.test(formData.Phone)) {
      setPhoneErr(true)
      return
    }

    // dispatch(UpdateNotifier(fzormData));


    const data = axios.post('http://localhost:5000/updateUser', formData).then((response) => {
      if (response.status == 200) {
        toast('Admin Profile Edited Successfully');
      }
    }).catch(function (error) {
      if (error.response.status == 422) {
        toast.error('Something Went Wrong, Try Again!');
        console.log(error)
        console.log(error.message)
      }

    })
    setUser(true)

  }

  return (
    <>
      {/* {result.UserName?<></>:fetchData()} */}
      {

        user == true ?

          <Container fluid>
            <Row>
              <Col md="8">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">User Profile</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            <label>Company </label>
                            <Form.Control
                              defaultValue={result.Company}
                              disabled
                              // placeholder="Company"
                              type="text"
                              name="Company"
                            ></Form.Control>
                          </Form.Group>
                        </Col>

                        <Col className="px-1" md="3">
                          <Form.Group>
                            <label>Username</label>
                            <Form.Control
                              defaultValue={result.UserName}
                              disabled
                              type="text"
                              name="UserName"
                            ></Form.Control>
                            <p className="error">{formErrors.Username}</p>

                          </Form.Group>
                        </Col>

                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Form.Control
                              defaultValue={result.email}
                              disabled
                              type="email"
                              name="Email"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>First Name</label>
                            <Form.Control
                              defaultValue={result.FirstName}
                              disabled
                              type="text"
                              name="FirstName"
                            ></Form.Control>
                            <p className="error">{formErrors.FirstName}</p>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label>Last Name</label>
                            <Form.Control
                              defaultValue={result.LastName}
                              disabled
                              type="text"
                              name="LastName"
                            ></Form.Control>
                            <p className="error">{formErrors.LastName}</p>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>Address</label>
                            <Form.Control
                              defaultValue={result.Address}
                              disabled
                              type="text"
                              name="Address"
                            ></Form.Control>
                            <p className="error">{formErrors.Address}</p>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>City</label>
                            <Form.Control
                              defaultValue={result.City}
                              disabled
                              type="text"
                              name="City"
                            ></Form.Control>
                            <p className="error">{formErrors.City}</p>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Country</label>
                            <Form.Control
                              defaultValue={result.Country}
                              disabled
                              type="text"
                              name="Country"
                            ></Form.Control>
                            <p className="error">{formErrors.Country}</p>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label>Phone </label>
                            <Form.Control
                              defaultValue={result.Phone}
                              disabled
                              type="number"
                              name="Phone"
                            ></Form.Control>
                            <p className="error">{formErrors.Phone}</p>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>About Me</label>
                            <Form.Control
                              defaultValue={result.AboutMe}
                              cols="80"
                              disabled
                              rows="4"
                              as="textarea"
                              name="AboutMe"
                            ></Form.Control>
                            <p className="error">{formErrors.AboutMe}</p>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        className="btn-fill pull-right"
                        id="btnEdit"
                        type="submit"
                        variant="info"
                        onClick={handleEditProfile}
                        style={{
                          float: 'right'
                        }}
                      >
                        Edit Profile
                      </Button>


                      <div className="clearfix"></div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className="card-user">
                  <div className="card-image">
                    <img
                      alt="..."
                      src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                    ></img>
                  </div>
                  <Card.Body>
                    <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={require("assets/img/faces/face-0.jpg")}
                        ></img>
                        <h5 className="title">{result.FirstName} {result.LastName}</h5>
                      </a>
                      <p className="description">{result.UserName}</p>
                    </div>
                    <p className="description text-center">
                      {result.AboutMe}<br></br>
                    </p>
                  </Card.Body>
                  <hr></hr>

                </Card>
              </Col>
            </Row>
          </Container>
          :
          <Container>
            <Row>

              <Col md="8">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Edit Profile</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            <label>Company </label>
                            <Form.Control
                              disabled
                              defaultValue={result.Company}
                              // placeholder="Company"
                              type="text"
                              name="Company"
                            ></Form.Control>
                          </Form.Group>
                        </Col>

                        <Col className="px-1" md="3">
                          <Form.Group>
                            <label>Username</label>
                            <Form.Control
                              defaultValue={result.UserName}
                              // placeholder={data1.result.email}
                              type="text"
                              name="UserName"
                              onChange={handleChange}
                            ></Form.Control>
                            {error & formData.UserName.length == 0 ? <p className="error">Username is Empty</p> : ""}
                            {userErr ? <p className="error">Invalid Username format</p> : ""}
                            {/* <p className="error">{formErrors.Username}</p> */}

                          </Form.Group>
                        </Col>

                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Form.Control
                              defaultValue={result.email}
                              disabled
                              type="email"
                              name="email"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>First Name</label>
                            <Form.Control
                              defaultValue={result.FirstName}
                              type="text"
                              name="FirstName"
                              onChange={handleChange}
                            ></Form.Control>
                            {error & formData.FirstName.length == 0 ? <p className="error">FirstName is Empty</p> : ""}
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label>Last Name</label>
                            <Form.Control
                              defaultValue={result.LastName}
                              type="text"
                              name="LastName"
                              onChange={handleChange}
                            ></Form.Control>
                            {error & formData.LastName.length == 0 ? <p className="error">LastName is Empty</p> : ""}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>Address</label>
                            <Form.Control
                              defaultValue={result.Address}
                              type="text"
                              name="Address"
                              onChange={handleChange}
                            ></Form.Control>
                            {error & formData.Address.length == 0 ? <p className="error">Address is Empty</p> : ""}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>City</label>
                            <Form.Control
                              defaultValue={result.City}
                              type="text"
                              name="City"
                              onChange={handleChange}
                            ></Form.Control>
                            {error & formData.City.length == 0 ? <p className="error">City is Empty</p> : ""}
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Country</label>
                            <Form.Control
                              defaultValue={result.Country}
                              type="text"
                              name="Country"
                              onChange={handleChange}
                            ></Form.Control>
                            {error & formData.Country.length == 0 ? <p className="error">Country is Empty</p> : ""}
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label>Phone </label>
                            <Form.Control
                              defaultValue={result.Phone}
                              type="number"
                              name="Phone"
                              onChange={handleChange}
                            ></Form.Control>
                            {error & formData.Phone.length == 0 ? <p className="error">Phone is Empty</p> : ""}
                            {phoneErr ? <p className="error">Invalid Phone format</p> : ""}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>About Me</label>
                            <Form.Control
                              defaultValue={result.AboutMe}
                              cols="80"
                              rows="4"
                              as="textarea"
                              name="AboutMe"
                              onChange={handleChange}
                            ></Form.Control>
                            {error & formData.AboutMe.length == 0 ? <p className="error">AboutMe is Empty</p> : ""}
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <div className="imageClass">
                        {/* <label htmlFor="formFileLg" className="form-label">Upload Image</label> */}
                        {/* <input className="form-control form-control-lg" id="formFileLg" type="file"/> */}
                        {/* <FileBase type="file" name="File" multiple={false} onDone={({ base64 }) => {handleChange(base64)}} /> */}
                      </div>
                      {/* <Row>
        <Col md="12">
          <Form.Group>
            <label>Image</label>
            <Form.Control        
              type="image"
              name="Address"
              onChange={handleChange}
            ></Form.Control>
            <p className="error">{formErrors.Address}</p>
          </Form.Group>
        </Col>
      </Row>  */}

                      <Button
                        className="btn-fill pull-right"
                        id="btnUpdate"
                        type="submit"
                        variant="info"
                        onClick={handleUpdateProfile}
                        style={{
                          float: 'right'
                        }}
                      >
                        Update Profile
                      </Button>

                      <div className="clearfix"></div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              <Col md="4">
                <Card className="card-user">
                  <div className="card-image">
                    <img
                      alt="..."
                      src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                    ></img>
                  </div>
                  <Card.Body>
                    <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={require("assets/img/faces/face-0.jpg")}
                        ></img>
                        <h5 className="title">{result.FirstName} {result.LastName}</h5>
                      </a>
                      <p className="description">{result.UserName}</p>
                    </div>
                    <p className="description text-center">
                      {result.AboutMe}<br></br>
                    </p>
                  </Card.Body>
                  <hr></hr>

                </Card>
              </Col>
            </Row>
          </Container>
      }
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

}

export default User;
