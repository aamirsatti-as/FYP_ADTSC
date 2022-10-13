/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component,useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button,Row,Col} from "react-bootstrap";
import { Modal,ModalHeader,ModalBody } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "routes.js";
import axios from "axios";
function Header() {
  const location = useLocation();
  const navigate= useNavigate();
  const [modal,setModal]=useState(false);
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

  const handlePassword = async(e) => {
		e.preventDefault();
		console.log(formData)

    const data = await axios.put('http://localhost:5000/changePassword', formData).then((response)=>{
            if (response.status==200) {
                toast('Password Changed Successfully ')
            }
           }).catch(function (error) {
                if (error.response.status==422) {
                    toast.error('Something Went wrong, Try Again');
                    console.log(error)
                    console.log(error.message)
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
                onClick={(e) =>{
                   e.preventDefault()
                navigate('/admin/notifications')
                }}
                className="m-0"
              >
                <i className="nc-icon nc-palette"></i>
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
                    window.location.reload()
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
    toggle={()=>setModal(!modal)}>
      <ModalHeader
      toggle={()=>setModal(!modal)}>
        
      </ModalHeader>

      <ModalBody>
        <form onSubmit={handlePassword}> 
          <Row>
          <Col lg={12}>
            <h1>Change Password</h1>
          </Col>
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
                    <input
                    type='text'
                    className='form-control'
                    placeholder='Enter New Password'
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
                    placeholder='Enter Old Password'
                    name='cnfrmNewPassword'
                    required
                    onChange={handleChange}>
                    

                    </input>
                  
                  </div>
            </Col>
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
