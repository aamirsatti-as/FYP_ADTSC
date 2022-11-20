import React, { useState, useEffect } from "react";

import ShowTraceBack from './ShowTraceback.js'
import { useHistory } from "react-router";

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
import { useNavigate } from "react-router-dom";

function TableList({ props }) {
  const navigate = useNavigate()
  // const history = useHistory()
  const [result, setResult] = useState([]);
  const [data, setData] = useState([{}]);
  // const [image, setImage] = useState('')
  // const [key, setKey] = useState(1)
  const [searchValue,setSearchValue]=useState('');
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
  const viewTraceBack = async (d_id) => {

    const res = await fetch("http://localhost:5000/getDetection", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();

    let image = data.filter(arr => arr._id == d_id)
    // console.log('aa', image[0].Traceback_Image)
    let image1 = image[0].Traceback_Image;

    navigate('/traceback', { state: { image1 } })

    // this.history.push({
    //   pathname: '/traceback',
    //   image1: { image1 },
    // });
    // }
    // console.log(image+"aa")
    // console.log('after')
    // showTraceBack(image);
    // this.props.history.push({
    //   pathname: '/admin/detection',
    //   image: { image }
    // });


    // fetchData()
  }


  const handleSearch = async () => {

      setResult(data.filter((item)=>item.Anomaly_Name.includes(searchValue)))
  }

  const fetchData = async () => {

    let result = await fetch("http://localhost:5000/getDetection");
    result = await result.json();
    if (result.status == 404) {
      const newArray = {}
      setResult(newArray)
      return
    }
    else {
      setResult(result);
      setData(result);
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
          <Col md='12'>
            <div class="input-group md-form form-sm form-2 pl-0 pb-1">
              <input class="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" onChange={(e) => setSearchValue(e.target.value)}/>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary border-start-0 border rounded-pill ms-n3" type="button" onClick={handleSearch}>
                  <i class="fas fa-search text-grey"
                    aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </Col>

        </Row>
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
                      {/* <th className="border-0">ID</th> */}
                      <th className="border-0">Name</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">time</th>
                      <th className="border-0">Delete</th>
                      <th className="border-0">Traceback Result</th>
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

                            {/* <td>{result.Anomaly_ID}</td> */}
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

                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  viewTraceBack(result._id)

                                }}
                              >
                                View Result
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
