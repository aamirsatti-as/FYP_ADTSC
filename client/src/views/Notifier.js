import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AddNotifier } from "../actions/addnotifier";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateNotifier } from "../actions/addnotifier";
import { Modal, ModalHeader, ModalBody } from "reactstrap"

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
import './notifier.css'

function Notifier() {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    // const selector=useSelector()

    const [searchValue, setSearchValue] = useState();
    const [data, setData] = useState([{}]);
    const [result, setResult] = useState([]);
    const [searchItem, setsearchItem] = useState(null);
    const [modalData, setModalData] = useState();
    const [editId, setEditId] = useState(null)
    const [check,setCheck]=useState(false)
 
   
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

    if(check){
        console.log('inseide chekc true')
        const {cameras} = (useSelector((state) => {state.user}))
        // const state=localStorage.getItem('user')
        console.log("State:::",cameras)
        // const not=localStorage.getItem("add")
        // console.log("dsa ", not)
        setCheck(false)
        // console.log(state.isFetching)
    //     if(state){

        
    //     if(state.isFetching==1){
    //         toast('Notifier Added Successfully');
    //     }
    //     if(state.isFetching==2)
    //     {
    //         toast.error('Email Already Exists');
    //     }
    
    //     console.log( isFetching+ "inside Notifier")
    // }
        // setCheck(true)

    }

    const postNotifier = async (e) => {
        e.preventDefault()
        // dispatch(AddNotifier(formData)).then(()=>{
        //     console.log('asdfasd')
        //     setCheck(true)
        // })
        

        // testFun()
        
        // console.log(formData)
        // const data = await axios.post('http://localhost:5000/addNotifier', formData).then((response)=>{
        //     if (response.status==200) {
        //         toast('Notifier Added Successfully');
        //     }
        //    }).catch(function (error) {
        //         if (error.response.status==400) {
        //             toast.error('Email Already Exists');
        //             console.log(error)
        //             console.log(error.message)
        //         }

        //    })

        const response = await axios.post('http://localhost:5000/addNotifier', formData)
        // console.log(response.data.message)
        toast(response.data.message)
        fetchData()
        

    }
    const handleSearch = async () => {
        console.log(searchValue)
        setResult(data.filter((item) => {
            return item.FirstName.includes(searchValue) || item.LastName.includes(searchValue) || item.UserName.includes(searchValue) || item.Email.includes(searchValue) || item.Phone.includes(searchValue)
        }))
        console.log(result)
    }


    const fetchData = async () => {

        let result = await fetch("http://localhost:5000/getNotifier");
        result = await result.json();
        setResult(result);
        setData(result)
    };

    useEffect(() => {
        fetchData()
    }, []);

    // useEffect(() => {
    //     fetchData()
    // }, [result]);

    const initialState = { UserName: '', Email: '', FirstName: '', LastName: '', Phone: '', };
    const [formData, setFormData] = useState(initialState);

    const handleModalChange = (e) => setModalData({ ...modalData, [e.target.name]: e.target.value });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    const handleSubmit = async (e_id) => {

        const res = await axios.post("http://localhost:5000/getUpdateNotifier", { e_id })
        setEditId(e_id)
        setsearchItem(res.data)
        setModalData(res.data)
        // setsearchItem(result.filter((item) => item._id === e_id))

    }
    const submitEditInformation = async (e) => {

        e.preventDefault()
        // dispatch(UpdateNotifier(modalData, editId));
        
        setModal(false)
        // const UpdateNotifierState = useSelector((state) => state.updateNotifier);
        // console.log(UpdateNotifierState,'  jh')
        const UserName=modalData.UserName,Email=modalData.Email,Phone=modalData.Phone,FirstName=modalData.FirstName,LastName=modalData.LastName;

        if(editId)
        {
            const res=await axios.put('http://localhost:5000/updateNotifier',{UserName,Email,Phone,FirstName,LastName,editId})  
            console.log(res.data)
            toast(res.data.message) 
            fetchData()
            setModal(false)

        }
    }




    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
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

                    <Col md='12'>
                        <div className="input-group md-form form-sm form-2 pl-0 pb-1">
                            <input className="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" onChange={(e) => setSearchValue(e.target.value)} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary border-start-0 border rounded-pill ms-n3" type="button" onClick={handleSearch}>
                                    <i className="fas fa-search text-grey"
                                        aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </Col>



                    <Col md="12">
                        <Card className="card-plain table-plain-bg">
                            <Card.Header>
                                <Card.Title as="h4">Notifiers List</Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover  table-fixed  table-bordered
                table-sm same-col-widths">
                                    <thead>
                                        <tr>
                                            <th className="border-0">FirstName</th>
                                            <th className="border-0">LastName</th>
                                            <th className="border-0">UserName</th>
                                            <th className="border-0">Email</th>
                                            <th className="border-0">Phone</th>
                                            <th className="border-0">Update</th>
                                            <th className="border-0">Delete</th>
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
                                                        <td className="btnCenter">
                                                            <Button
                                                                className="btn-simple btn-link"
                                                                type="button"
                                                                variant="info"
                                                                onClick={() => {
                                                                    handleSubmit(result._id)
                                                                    setModal(true)
                                                                    // setModalData(searchItem[0])
                                                                }}
                                                                style={{
                                                                    backgroundColor: '#1DC7EA',
                                                                    color: '#F5F5F5',
                                                                    borderRadius: "20px",
                                                                    opacity: 0.8,
                                                                }}
                                                            >
                                                                <i className="fas fa-edit"></i>
                                                            </Button>
                                                        </td>
                                                        <td className="btnCenter">
                                                            <Button
                                                                className="btn-simple btn-link "
                                                                type="button"
                                                                variant="danger"
                                                                onClick={() => deleteDetection(result._id)}
                                                                style={{
                                                                    backgroundColor: '#eb0c21',
                                                                    borderRadius: "20px",
                                                                    color: '#FFFFFF',
                                                                }}
                                                            >
                                                                <i className="fas fa-times"></i>
                                                            </Button>
                                                        </td>
                                                        {/* <td>
                                                            <button
                                                                className="btn btn-danger "
                                                                onClick={() => deleteDetection(result._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>

                                                        <td>
                                                            <button
                                                                className="btn btn-dark"
                                                                onClick={() => {
                                                                    handleSubmit(result._id)
                                                                    setModal(true)
                                                                    // setModalData(searchItem[0])
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                        </td> */}

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
            {
                searchItem === null ? (
                    <h1></h1>
                ) : (
                    <div className="modaldiv">
                    <Modal
                        size="md"
                        isOpen={modal}
                        // className='modelNot'
                        aria-labelledby='contained-modal-title-vcenter'
                        centered
                        toggle={() => setModal(!modal)}>
                        <ModalHeader
                            toggle={() => setModal(!modal)}>
                            <h4 className="cardTitle" style={{color:'#000'}}>Update Notifier</h4>

                        </ModalHeader>
                        <ModalBody 
              className='modelNot'>

                            {/* <form > */}
                            <Row>

                                <Col className="px-1" md='12'>
                                    <Form onSubmit={submitEditInformation}>
                                        {/* <Form> */}
                                        <Form.Group>

                                            <Form.Control className="formControl"
                                                defaultValue={searchItem.Email}
                                                type='text'
                                                name='Email'
                                                onChange={handleModalChange}
                                                required
                                            >

                                            </Form.Control>

                                        </Form.Group>

                                        <Form.Group>

                                            <Form.Control
                                                className="formControl"
                                                type='text'
                                                name='FirstName'
                                                required
                                                onChange={handleModalChange}
                                                defaultValue={searchItem.FirstName}
                                            >

                                            </Form.Control>

                                        </Form.Group>

                                        <Form.Group>

                                            <Form.Control
                                                className="formControl"
                                                type='text'
                                                name='LastName'
                                                onChange={handleModalChange}
                                                required
                                                defaultValue={searchItem.LastName}
                                            >

                                            </Form.Control>

                                        </Form.Group>

                                        <Form.Group>

                                            <Form.Control
                                                className="formControl"
                                                type='text'
                                                name='UserName'
                                                onChange={handleModalChange}
                                                required
                                                defaultValue={searchItem.UserName}
                                            >

                                            </Form.Control>

                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                className="formControl"
                                                type='text'
                                                name='Phone'
                                                onChange={handleModalChange}
                                                required
                                                defaultValue={searchItem.Phone}
                                            >

                                            </Form.Control>

                                        </Form.Group>

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
                                            value="Update"
                                        />

                                    </Form>
                                </Col>
                            </Row>
                        </ModalBody>
                    </Modal>
                    </div>
                )
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

export default Notifier;
