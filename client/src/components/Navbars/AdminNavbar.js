import React, { Component, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button, Row, Col } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import routes from "routes.js";
import axios from "axios";
import { logout } from "../../actions/login";
function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin);
  const initialState = { oldPassword: '', newPassword: '', cnfrmNewPassword: '' };
  const [formData, setFormData] = useState(initialState);
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  // const fetchData = async () => {
  //   let result = await fetch("http://localhost:5000/getAdmin");
  //   result = await result.json();
  //   setResult(result);   

  // };

  // useEffect(() => {
  //   fetchData()
  // }, []);

  const handleLogout = async () => {

    // e.preventDefault()
    // dispatch(logout());
    // navigate('/') 
    // console.log('inside logout')
    // localStorage.clear('profile');
    // navigate('/')
    // window.location.reload()

  }

  const handlePassword = async (e) => {
    e.preventDefault();

    const data = await axios.put('http://localhost:5000/changePassword', formData).then((response) => {
      if (response.status == 200) {
        toast('Password Changed Successfully ')
      }
    }).catch(function (error) {
      if (error.response.status == 422) {
        toast.error('Something Went wrong, Try Again');
      }
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
            <Button
              variant="dark"
              className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
              onClick={mobileSidebarToggle}
            >
              <i className="fas fa-ellipsis-v"></i>
            </Button>
            <Navbar.Brand
              href="#home"
              onClick={(e) => e.preventDefault()}
              className="mr-2"
            >
              {getBrandText()}
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="nav mr-auto" navbar>
              <Nav.Item>
                <Nav.Link
                  data-toggle="dropdown"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="m-0"
                >
                  <span className="d-lg-none ml-1">Dashboard</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  data-toggle="dropdown"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/admin/notifications')
                  }}
                  className="m-0"
                >
                  <i class="bi bi-bell"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                  </svg></i>
                  {/* <span class="bi bi-bell" style={{color:'black'}}></span> */}
                  {/* <i className="bi bi-bell"></i> */}
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="ml-auto" navbar>
              <Nav.Item>
                <Nav.Link
                  className="m-0"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/admin/user')
                  }}
                >
                  <span className="no-icon">Account</span>
                </Nav.Link>
              </Nav.Item>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  variant="default"
                  className="m-0"
                >
                  <span className="no-icon">Settings</span>
                </Dropdown.Toggle>
                <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                  <Dropdown.Item
                    onClick={(e) => {
                      e.preventDefault()
                      setModal(true)
                      // navigate('/changePassword')
                    }}
                  >
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#pablo"

                    onClick={(e) => {
                      e.preventDefault()
                      localStorage.clear('profile');
                      navigate('/')
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        isOpen={modal}
        toggle={() => setModal(!modal)}>
        <ModalHeader
          toggle={() => setModal(!modal)}>
          <h4 className="cardTitle" style={{ color: '#fff' }}>Change Password</h4>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handlePassword}>
            <Row>

              <Col lg={12}>
                <div>
                  <label htmlFor='oldPassword'>
                    Old Password
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Old Password'
                    name='oldPassword'
                    onChange={handleChange}
                    required>


                  </input>

                </div>
              </Col>

              <Col lg={12}>
                <div>
                  <label htmlFor='newPassword'>
                    New Password
                  </label>
                  <input style={{ fontWeight: '14px', color: 'black' }}

                    type='text'
                    className='form-control'
                    placeholder="Enter New Password"
                    // color="black"
                    name='newPassword'
                    onChange={handleChange}
                    required>
                  </input>

                </div>
              </Col>

              <Col lg={12}>
                <div>
                  <label htmlFor='cnfrmNewPassword'>
                    Confirm New Password
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Old Passwoasd'
                    name='cnfrmNewPassword'
                    required
                    onChange={handleChange}>


                  </input>

                </div>
              </Col>
              <Col lg={12}>

                <input
                  style={{
                    backgroundColor: '#1DC7EA',
                    color: '#FFFFFF',
                    opacity: 1,
                    padding: '10px 20px',
                    borderRadius: '0.25rem',
                    margin: '10px',
                    textAlign: 'center',
                    border: '1px solid transparent',
                    borderColor: '#17a2b8',
                    float: 'right'
                  }}
                  type="submit"
                  value="Change Password"
                />
              </Col>
            </Row>
          </form>
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
}

export default Header;
