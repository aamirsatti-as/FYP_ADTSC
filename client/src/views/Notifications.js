import React,{useState,useEffect} from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import {
  Alert,
  Badge,
  Button,
  Card,
  Modal,
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


const deleteNotification=async(d_id)=>{
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
    if(result.status==404){
      const newArray={}
      setResult(newArray)
      return
    }
    else{
      console.log(result.status)
      setResult(result.Last_24Hour_Notification);
    }
  };
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
          {result.length==0 ? (
            <tr >
              <h3 style={{paddingLeft:'3%'}}>No Record Found</h3>
            </tr>
          ) : (
            
            result.map((result ) => {
              {/* console.log(result) */}
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
              </Col>
            </Row>
          </Card.Body>
              );
            })
          )}
         
        </Card>
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

export default Notifications;
