import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../app";
import FileBase from 'react-file-base64';
import axios from "axios";
import './UserProfile.css'
// react-bootstrap components
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

function User() {
  const [result, setResult] = useState([]);
  const{user,setUser} = useContext(UserContext);
  const [check,setCheck]=useState(true);
  const initialState = { Company: 'ADTSC', Username: '', Email: 'aamirsatti507@gmail.com', Firstname: '', Lastname: '', Address: '', City: '', Country: '', Phone: '', Aboutme: '' }
  const [formData, setFormData] = useState(initialState);
  // const [formData, setFormData] = useState({ Company: 'ADTSC', Username: '', Email: 'aamirsatti507@gmail.com', Firstname: '', Lastname: '', Address: '', City: '', Country: '', Phone: '', Aboutme: '' });  
  // var [formData, setFormData] = useState({ Company: 'ADTSC', Username: '', Email: 'aamirsatti507@gmail.com', Firstname: '', Lastname: '', Address: '', City: '', Country: '', Phone: '', Aboutme: '' }); 
  const fetchData = async () => {

    let result = await fetch("http://localhost:5000/getAdmin");
    result = await result.json();
    setResult(result);
    console.log(result)
    setFormData(formData.Company=result.Company,formData.Username=result.UserName)
    setCheck(false)
    console.log(FormData.Company,FormData.Username)
  };


  useEffect(() => {
    fetchData()
  }, []);

  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const [formErrors, setFormErrors] = useState({});
  
  const [isSubmit, setIsSubmit] = useState(false);
  const [data1, setData1] = useState('')

  const handleEditProfile=(e)=>{
    setUser(false)
  }

  const handleUpdateProfile=(e)=>{
    e.preventDefault();
    console.log(formData)
    setFormErrors(validate(result));
    setIsSubmit(true);
    setUser(true)
  }


  const handleUserProfile = (e) => {
    e.preventDefault();
    console.log(formData)
    setFormErrors(validate(formData));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(Object.keys(formErrors));
      // const data=axios.post('http://localhost:5000/updateUser',formData)

      // dispatch(changePassword(formData,navigate)); 
    }
  }, [formErrors]);





  const validate = (values) => {
    const errors = {};
    //Rules
    // At least 5 alphabets
    //At least 1 letter 
    const regexUsername = /^[a-zA-Z]{5,}[0-9]+[0-9]*$/;
    //Rules
    //At least 10 letter 
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    // const regexUsername = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!values.Username) {
      errors.Username = "Username is Required";
    }
    else if (!regexUsername.test(values.Username)) {
      errors.Username = "This is not a valid Username";
    }
    if (!values.Phone) {
      errors.Phone = "Phone is Required";
    }
    else if (!regexPhone.test(values.Phone)) {
      errors.Phone = "This is not a valid Phone Number";
    }
    if (!values.Firstname) {
      errors.Firstname = "Firstname is Required";
    }
    if (!values.Lastname) {
      errors.Lastname = "Lastname is Required";
    }
    if (!values.Address) {
      errors.Address = "Address is Required";
    }
    if (!values.City) {
      errors.City = "City is Required";
    }
    if (!values.Country) {
      errors.Country = "Country is Required";
    }
    if (!values.Aboutme) {
      errors.Aboutme = "About Me is Required";
    }

    return errors;
  };


  if(user){
  return (
    <>
      <Container fluid>
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
                          // placeholder={data1.result.email}
                          type="text"
                          name="Username"
                          onChange={handleChange}
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
                          name="Firstname"
                          onChange={handleChange}
                        ></Form.Control>
                        <p className="error">{formErrors.Firstname}</p>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue={result.LastName}
                          disabled
                          type="text"
                          name="Lastname"
                          
                          onChange={handleChange}
                        ></Form.Control>
                        <p className="error">{formErrors.Lastname}</p>
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          name="Aboutme"
                          onChange={handleChange}
                        ></Form.Control>
                        <p className="error">{formErrors.Aboutme}</p>
                      </Form.Group>
                    </Col>
                  </Row>
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
                  </Row> */}
                  <Button
                    className="btn-fill pull-right"
                    id="btnEdit"
                    type="submit"
                    variant="info"
                    onClick={handleEditProfile}
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
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  Student<br></br>
                </p>
              </Card.Body>
              <hr></hr>

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );

}
if(!user){
  return (
    <>
      <Container fluid>
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
                          name="Username"
                          onChange={handleChange}
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
                          type="text"
                          name="Firstname"
                          onChange={handleChange}
                        ></Form.Control>
                        <p className="error">{formErrors.Firstname}</p>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue={result.LastName}
                          type="text"
                          name="Lastname"
                          onChange={handleChange}
                        ></Form.Control>
                        <p className="error">{formErrors.Lastname}</p>
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
                          type="text"
                          name="City"
                          onChange={handleChange}
                        ></Form.Control>
                        <p className="error">{formErrors.City}</p>
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
                        <p className="error">{formErrors.Country}</p>
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
                          rows="4"
                          as="textarea"
                          name="Aboutme"
                          onChange={handleChange}
                        ></Form.Control>
                        <p className="error">{formErrors.Aboutme}</p>
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
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  Student<br></br>
                </p>
              </Card.Body>
              <hr></hr>
              {/* <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
} 
}

export default User;
