import React, { useState, useEffect } from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap"

import {
  Alert,
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notifications() {
  const notificationAlertRef = React.useRef(null);
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState();
  const [notificationLog,setNotificationLog]=useState([]);


  const deleteNotification = async (d_id) => {
    const res = await fetch("http://localhost:5000/deleteNotification", {
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
      // window.location.reload();
      toast(data.message);
      //   navigate("/studentRoutes");
    }
    fetchData()
  }

  const fetchData = async () => {

    let result = await fetch("http://localhost:5000/getNotification");
    result = await result.json();
    console.log(result.Last_24Hour_Notification)
    if (result.status == 404) {
      const newArray = {}
      setResult(newArray)
      return
    }
    else {
      console.log(result.status)
      setResult(result.Last_24Hour_Notification);
    }
  };

  const NotificatoinLog= async(id)=>{
    setNotificationLog(result.filter((item) => {
      console.log('re ',id,"  it ",item._id)
      return item._id==id
  }))
  console.log(notificationLog)
  }
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Card>
          <Card.Header>
            <Card.Title as="h4">Notifications</Card.Title>
          </Card.Header>
          {result.length == 0 ? (
            <tr >
              <h3 style={{ paddingLeft: '3%' }}>No Record Found</h3>
            </tr>
          ) : (

            result.map((result) => {
              {/* console.log(result) */ }
              // const { id, name, email } = user;
              return (
                <Card.Body >
                  <Row>
                    <Col md="12">
                      <Alert className="alert-with-icon" variant="info">
                        <button
                          aria-hidden={true}
                          className="close"
                          data-dismiss="alert"
                          type="button"
                          onClick={() => deleteNotification(result._id)}
                        >
                          <i className="nc-icon nc-simple-remove"></i>
                        </button>
                        <span
                          data-notify="icon"
                          className="nc-icon nc-bell-55"
                        ></span>
                        <span>
                          {result.Notification_Name} is Detected in the Live Video
                        </span>

                        <span>
                          {result.Notification_Area}
                        </span>

                        <span>
                          {result.Notification_Date}
                        </span>


                      </Alert>
                      <button className="btn btn-dark"
                          style={{
                            // backgroundColor: '#eb0c21',
                            borderRadius: "20px",
                            color: '#FFFFFF',
                            float:'right'
                          }}
                          onClick={() => {
                                  NotificatoinLog(result._id)
                                  if(notificationLog)
                                  setModal(true)

                                }}>
                        
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        </button>


                    </Col>
                  </Row>
                </Card.Body>
              );
            })
          )}

        </Card>
      </Container>
      <Modal
                        size="md"
                        isOpen={modal}
                        // className='modelNot'
                        aria-labelledby='contained-modal-title-vcenter'
                        centered
                        toggle={() => setModal(!modal)}>
                        <ModalHeader
                            toggle={() => setModal(!modal)}>
                            <h4 className="cardTitle" style={{color:'#fff'}}>Update Notifier</h4>

                        </ModalHeader>
                        <ModalBody>

                            {/* <form > */}
                            <Row>

                                <Col className="px-1" md='12'>
                                  <h1>hello</h1>

                                    
                                </Col>
                            </Row>
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

export default Notifications;
