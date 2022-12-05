import React, { useState, useEffect,useContext } from "react";
import ChartistGraph from "react-chartist";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateNotifier } from "../actions/addnotifier";
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import axios from "axios";
import 'chart.js/auto';
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


} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)
import { Doughnut } from 'react-chartjs-2';
// import CanvasJSReact from './canvasjs.react';
// import CanvasJS from "canvasjs";

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import {CanvasJSChart} from 'canvasjs-react-charts'


function Dashboard() {
  const [result, setResult] = useState([]);
  const [backendChart, setBackendChart] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [searchItem, setsearchItem] = useState(null);
  const [modalData, setModalData] = useState();
  const [editId, setEditId] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const data1 = {
    title:{
      text: "Anomalies Record"
    },
    labels: ["Fire", "Smoke", "Fight", "Accident", "Knife", "Pistol"],
    datasets: [
      {
        label: "",
        locationbar: "bottom",
        lastbar: "right",
        data: [backendChart.Fire, backendChart.Smoke, backendChart.Fight, backendChart.Accident, backendChart.Knife, backendChart.Pistol],
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          //  "#B3F6D8",
          //  "#52A7C1",
          //  "#96E4DF",
          //  "#4DCCC6",
  
          //  "#7EE8FA",
          "#D3D3D3",
          // "#83EAF1",
          "#63A4FF",
          "#89D4CF",
          // "#7EE8FA",
          'rgba(255, 206, 86, 0.2)',
          // "#96E4DF",
          // "#83EAF1",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 0.1,
        borderAlign: "inner",
        offset: false,
        hoverOffset: 10,
      },
    ],
  };

  const TimeVarying = {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: "Detection Records"
    },
    axisX: {
      title: "Recent Time",
      reversed: true,
    },
    axisY: {
      title: "Amount of Record",
      includeZero: true,
      // labelFormatter: this.addSymbols
    },
    data: [{
      type: "bar",
      dataPoints: [ 
        { y:  backendChart.TotalDetection, label: "Total Detection" },
        { y:  backendChart.Last_One_Hour_Detection, label: "Last 1 Hour" },
        { y:  backendChart.Last_One_Hour_Detection+6, label: "Last 1 Day" },
        { y:  backendChart.Last_One_Hour_Detection+9, label: "Last 1 Week" },
        { y:  backendChart.Last_One_Month_Detection, label: "Last 1 Month" },
        { y:  backendChart.Last_One_Year_Detection, label: "Last 1 Year" },
      ]
    }]
  }


  const AnomaliesVarying = {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: "Anomalies Records"
    },
    axisX: {
      title: "Social Network",
      reversed: true,
    },
    axisY: {
      title: "Monthly Active Users",
      includeZero: true,
      // labelFormatter: this.addSymbols
    },
    data: [{
      type: "bar",
      dataPoints: [ 
        { y:  backendChart.Fire, label: "Fire" },
        { y:  backendChart.Smoke, label: "Smoke" },
        { y:  backendChart.Pistol, label: "Pistol" },
        { y:  backendChart.Knife, label: "Knife" },
        { y:  backendChart.Accident, label: "Accident" },
        { y:  backendChart.Fight, label: "Fight" },
      ]
    }]
  }


  // const [chart, setChart] = useState({
  //   labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"],
  //   datasets: [
  //     {
  //       label: "First Dataset",
  //       data: [10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
  //       backgroundColor: 'yellow',
  //       borderColor: 'green',
  //       tension: 0.4,
  //       fill: true,
  //       pointStyle: 'rect',
  //       pointBorderColor: 'blue',
  //       pointBackgroundColor: '#fff',
  //       showLine: true
  //     }
  //   ]
  // })
  const fetchData = async () => {
    // localStorage.setItem('profile', JSON.stringify(items));
    const user = localStorage.getItem('profile')
    let result = await fetch("http://localhost:5000/getNotifier", {
      method: "GET",
      headers: {
        Accept: "applicatio/json",
        "Content-Type": "application/json"
      },
    }
    );
    result = await result.json();
    setResult(result);
    let data = await fetch("http://localhost:5000/getAllRecords");
    data = await data.json();
    setData(data);

    let res=await fetch("http://localhost:5000/allDetectionChart", {
      method: "GET",
      headers: {
        Accept: "applicatio/json",
        "Content-Type": "application/json",
      },
    }
    );

    res=await res.json();
    console.log(res)
    setBackendChart(res)

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
          <Col md="5">
            {/* <div className="App" style={{ width: '800px', height: '800px' }}> */}
            <div style={{ width: '110%', paddingBottom:'3%', paddingTop:'13%'}}>
              {/* <Line data={chart}>Hello</Line> */}
              <CanvasJSChart options = {TimeVarying}/>
            </div>
          </Col>
          <Col md="1"></Col>
          <Col md="5">
             <div style={{ width: '110%',  paddingBottom:'3%'}}> 
             {/* <h3>Anomalies Record</h3> */}
            <Doughnut data={data1} /> : <div style={{ textAlign: "center" }}></div>
              
              {/* <CanvasJSChart options = {AnomaliesVarying}/> */}
            </div>
          </Col>
        </Row>

        <Row>

        </Row>
        <Row>
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
                            <td className="td-actions btnCenter" >
                              <Button
                                className="btn-simple btn-link"
                                type="button"
                                variant="info"
                                onClick={() => {
                                  handleSubmit(result._id)
                                  setModal(true)
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
                                className="btn-simple btn-link"
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
