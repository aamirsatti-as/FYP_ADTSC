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
  Table
} from "react-bootstrap";



import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notifications() {
  const notificationAlertRef = React.useRef(null);
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState();
  const [notificationLog, setNotificationLog] = useState(null);
  const [check, setCheck] = useState(true);


  const deleteNotification = async (d_id) => {
    setCheck(false)

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
    // let del=await axios.delete('http://localhost:5000/deleteNotification');
    
    let result = await fetch("http://localhost:5000/getNotification");
    result = await result.json();
    console.log(result)
    if (result.status == 404) {
      const newArray = {}
      setResult(newArray)
      return
    }
    else {
      // console.log(result.status)
      setResult(result.notification);
    }
  };

  const NotificatoinLog = async (id) => {
    // setNotificationLog(result.filter((item) => {
    //   console.log('_id ',item._id, "id ",id)
    //   return item._id === id
    // }))

    axios.get("http://localhost:5000/searchNotificationLog/" + id).then((response) => {
      console.log(response.data[0])
      setNotificationLog(response.data[0])
      console.log(notificationLog.Notification_Name)

    }).catch((err) => {
      console.log(err)

    })
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
                      <Alert className="alert-with-icon" variant="info" onClick={() => {
                        console.log(check)
                        if(check==false){
                          setCheck(true)
                          console.log(check)
                          return
                        }
                        NotificatoinLog(result._id)
                        setModal(true)
                        // {console.log(notificationLog)}
                        console.log(check)
                        // if(check==true){
                        //   console.log(check)
                        //   setModal(true)
                        // }
                        // else{
                        //   check=true
                        // }
                        // console.log(notificationLog.length)
                        // {notificationLog==null?setModal(false):setModal(true)}


                      }}>
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
                      {/* onClick={() => {
                                  NotificatoinLog(result._id)
                                  if(notificationLog)
                                  setModal(true)

                                }}> */}



                    </Col>
                  </Row>
                </Card.Body>
              );
            })
          )}

        </Card>
      </Container>

      {

        notificationLog == null ? (
          <h1></h1>
        ) : (
          <div className="modaldiv">
          <Modal
          className="modal-lg"
            size="md"
            isOpen={modal}
            // className='modelNot'
            width='100%'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            toggle={() => setModal(!modal)}>
            <ModalHeader
              className='modelNot'
              toggle={() => setModal(!modal)}>
              <h2 className="cardTitle" style={{ color: '#000' }}>Notification Log</h2>

            </ModalHeader>
            <ModalBody
              className='modelNot'>

              {/* <form > */}
              <Row>

                <Col className="px-1" md='12'>

                  <Table className="table-hover  table-fixed  table-bordered
                table-sm same-col-widths">
                    <thead>
                      <tr className="tableRow">
                        <th className="border-1">Anomaly Name</th>
                        <td>{notificationLog.Notification_Name}</td>
                      </tr>
                      <tr className="tableRow">
                        <th className="border-7">Anomaly Area</th>
                        <td>{notificationLog.Notification_Area}</td>
                      </tr>

                      <tr className="tableRow">
                        <th className="border-7">Anomaly Date</th>
                        <td>{notificationLog.Notification_Date}</td>
                      </tr>

                      <tr className="tableRow">
                        <th className="border-1">Notification Send To</th>
                        <td>{notificationLog.Notification_Receiver}</td>
                      </tr>


                    </thead>
                    <button className="btn btn-dark"

                      
                       onClick={() => {
                       setModal(false)                   }
                  }
                      style={{
                        // backgroundColor: '#eb0c21',
                        marginTop: '8%',
                        marginBottom: '8%',
                        borderRadius: "20px",
                        color: '#FFFFFF',
                        float: 'right'
                      }}
                    >
                      Close
                    </button>
                  </Table>

                </Col>
              </Row>
            </ModalBody>
          </Modal>
          </div>
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

export default Notifications;
