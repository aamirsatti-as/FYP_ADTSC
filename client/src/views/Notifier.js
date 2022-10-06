import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Table,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from "react-bootstrap";

function Notifier() {
    const deleteDetection = async (d_id) => {

        const res = await fetch("http://localhost:5000/deleteNotifier", {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                d_id,
            }),
        });
        const data = await res.json();
        if (res.status === 422) {
          toast.error(data.message);
        }
        if (res.status === 200) {
          toast(data.message);
        }
    
        fetchData()

    }
    const [result, setResult] = useState([]);
    const postNotifier = async (e) => {
        e.preventDefault()
        console.log(formData)
    //     axios.delete("https://aa-cattle-farm.herokuapp.com/admin/product/"+ID).then((response)=>{
    //  alert('Card Deleted Successfully')
  
    // }).catch((err)=>{
    //  alert('Card Not deleted'+err)
   
    // })
        const data = await axios.post('http://localhost:5000/addNotifier', formData).then((response)=>{
            if (response.status==200) {
                toast('Notifier Added Successfully');
            }
           }).catch(function (error) {
                if (error.response.status==400) {
                    toast.error('Email Already Exists');
                    console.log(error)
                    console.log(error.message)
                }
          
           })

    }

    const fetchData = async () => {

        let result = await fetch("http://localhost:5000/getNotifier");
        result = await result.json();
        setResult(result);
    };

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        fetchData()
    }, [result]);

    const initialState = { UserName: '', Email: '', FirstName: '', LastName: '', Phone: '', };
    const [formData, setFormData] = useState(initialState);


    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Add Notifier</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={postNotifier}>
                                    <Row>
                                        <Col className="px-1" md="6">
                                            <Form.Group>
                                                <label>Username</label>
                                                <Form.Control
                                                    //   defaultValue="Aamir123"
                                                    placeholder="Username"
                                                    type="text"
                                                    name="UserName"
                                                    required
                                                    onChange={handleChange}
                                                    pattern='[a-zA-Z]{3,}[0-9]{1,}'
                                                    title='Username should contain atleast 3 alphabets and 2 digit'
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Form.Control
                                                    placeholder="Email Address"
                                                    type="email"
                                                    name="Email"
                                                    required
                                                    onChange={handleChange}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>First Name</label>
                                                <Form.Control
                                                    required
                                                    placeholder="First Name"
                                                    type="text"
                                                    name="FirstName"
                                                    onChange={handleChange}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Last Name</label>
                                                <Form.Control
                                                    required
                                                    placeholder="Last Name"
                                                    type="text"
                                                    name="LastName"
                                                    onChange={handleChange}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Phone</label>
                                                <Form.Control
                                                    placeholder="Phone"
                                                    required
                                                    type="text"
                                                    name="Phone"
                                                    pattern="[0-9]{1}[0-9]{10}"
                                                    title="Phone Number Should be more than 10 digits"
                                                    onChange={handleChange}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
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
                                        value="Add Notifier"
                                    />
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
                                    "Lamborghini Mercy <br></br>

                                </p>
                            </Card.Body>
                            <hr></hr>
                        </Card>
                    </Col>

                    <Col md="12">
                        <Card className="card-plain table-plain-bg">
                            <Card.Header>
                                <Card.Title as="h4">Notifiers List</Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th className="border-0">FirstName</th>
                                            <th className="border-0">LastName</th>
                                            <th className="border-0">UserName</th>
                                            <th className="border-0">Email</th>
                                            <th className="border-0">Phone</th>
                                            <th className="border-0">Remove Notifier</th>
                                        </tr>
                                    </thead>
                                    {result === null ? (
                                        <tr>
                                            <td>No Record </td>
                                        </tr>
                                    ) : (
                                        result.map((result) => {
                                            // const { id, name, email } = user;
                                            return (
                                                <tbody key={result._id}>
                                                    <tr >

                                                        <td>{result.FirstName}</td>
                                                        <td>{result.LastName}</td>
                                                        <td>{result.UserName}</td>
                                                        <td>{result.Email}</td>
                                                        <td>{result.Phone}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger "
                                                                onClick={() => deleteDetection(result._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            );
                                        })
                                    )}
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
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

export default Notifier;
