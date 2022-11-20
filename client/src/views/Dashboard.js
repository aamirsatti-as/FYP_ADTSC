import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateNotifier } from "../actions/addnotifier";
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import axios from "axios";
// react-bootstrap components
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
  OverlayTrigger,
  Tooltip,

} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [searchItem, setsearchItem] = useState(null);
  const [modalData, setModalData] = useState();
  const [editId, setEditId] = useState(null)
  const dispatch=useDispatch();
  const navigate = useNavigate()
  const fetchData = async () => {
    // localStorage.setItem('profile', JSON.stringify(items));
    const user = localStorage.getItem('profile')
    let result = await fetch("http://localhost:5000/getNotifier", {
      method: "GET",
      headers: {
        Accept: "applicatio/json",
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('profile')
      },
    });

    // const data = await res.json();
    // let result = await fetch("http://localhost:5000/getNotifier");
    result = await result.json();
    setResult(result);
    let data = await fetch("http://localhost:5000/getAllRecords");
    data = await data.json();
    setData(data);
  };


  useEffect(() => {
    fetchData()
  }, []);

  const handleDetection = (e) => {
    e.preventDefault()
    navigate('/admin/detection')
  }

  const handleNotifier = (e) => {
    e.preventDefault()
    navigate('/admin/notifiers')
  }

  const deleteDetection = async (d_id) => {

    const res = await fetch("http://localhost:5000/deleteNotifier", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        d_id,
      }),
      credentials: 'include'
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

  const handleSubmit = async (e_id) => {

    const res = await axios.post("http://localhost:5000/getUpdateNotifier", { e_id })
    setEditId(e_id)
    setsearchItem(res.data)
    setModalData(res.data)
    // setsearchItem(result.filter((item) => item._id === e_id))

  }

  const handleModalChange = (e) => setModalData({ ...modalData, [e.target.name]: e.target.value });
  const submitEditInformation = async (e) => {

    e.preventDefault()
    dispatch(UpdateNotifier(modalData, editId));
    fetchData()
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Detection Record</p>
                      <Card.Title as="h4">{data.TotalDetection}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats" onClick={handleDetection}>
                  <i className="far fa-calendar-alt mr-1" ></i>
                  View Details
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Notifiers</p>
                      <Card.Title as="h4">{data.TotalNotifier}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats" onClick={handleNotifier}>
                  <i className="far fa-calendar-alt mr-1"></i>
                  View Details
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers" onClick={handleDetection}>
                      <p className="card-category">Total Anomaly Detected in Last 2 Days</p>
                      <Card.Title as="h4">{data.TotalDetectionLastDay}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  View Details
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
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
                      <th className="border-0">Delete</th>
                      <th className="border-0">Update</th>
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

      {searchItem === null ? (
                                        <h1></h1>
                                    ) : (
            <Modal
                size="md"
                isOpen={modal}
                aria-labelledby='contained-modal-title-vcenter'
                centered
                toggle={() => setModal(!modal)}>
                <ModalHeader
                    toggle={() => setModal(!modal)}>
                    <h4 className="cardTitle">Update Notifier</h4>

                </ModalHeader>
                <ModalBody>

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
                                    value="Submit"
                                />

                            </Form>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            )}

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

export default Dashboard;
