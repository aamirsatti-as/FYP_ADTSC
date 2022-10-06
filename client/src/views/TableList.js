import React, { useState, useEffect } from "react";
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
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TableList() {
  const [result, setResult] = useState([]);

  const deleteDetection = async (d_id) => {

    const res = await fetch("http://localhost:5000/deleteDetection", {
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

  const fetchData = async () => {

    let result = await fetch("http://localhost:5000/getDetection");
    result = await result.json();
    // console.log(this.result.status)
    if(result.status==404){
      const newArray={}
      setResult(newArray)
      return
    }
    else{
      console.log(result.status)
      setResult(result);
    }
  };

//   useEffect(() => {
//     fetchData()
// }, [result]);

  useEffect(() => {
    fetchData()
  }, []);
  return (
    <>
      <Container fluid>
        <Row>

          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Detection Records</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">time</th>
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

                            <td>{result.Anomaly_ID}</td>
                            <td>{result.Anomaly_Name}</td>
                            <td>{result.Anomaly_Date}</td>
                            <td>{result.Anomaly_Time}</td>

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

export default TableList;
