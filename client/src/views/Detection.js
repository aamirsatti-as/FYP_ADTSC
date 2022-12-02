import React, { useState, useEffect } from "react";

import ShowTraceBack from './ShowTraceback.js'
import { useHistory } from "react-router";
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import img from '../assets/img/sidebar-8.jpg'
import VideoPlayer from 'react-video-js-player';
import '../css/Detection.css'

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
import './Detection.css'

function TableList({ props }) {
  const navigate = useNavigate()
  // const history = useHistory()
  const [result, setResult] = useState([]);
  const [data, setData] = useState([{}]);
  const [modal, setModal] = useState(false);
  const [modalDetection, setModalDetection] = useState(false);
  const [downloadLink, setDownloadLink] = useState();
  const [detectionDownloadLink, setDetectionDownloadLink] = useState();
  const [detectionWatchLink, setDetectionWatchLink] = useState();

  const [downloadVideo, setDownloadVideo] = useState();
  // const [image, setImage] = useState('')
  // const [key, setKey] = useState(1)
  const [searchValue, setSearchValue] = useState('');
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
    console.log(data)

    let image = data.filter(arr => arr._id == d_id)
    let image1 = image[0].Traceback_Video;
    let downloadLink=image[0].Detection_Video;
    if(image1){
      setDownloadLink(image1)
      image1 = image1.substring(0, image1.length - 3)
      image1 = image1 + 'mp4'
      setDownloadVideo(image1)
    }
    if(downloadLink){
    setDetectionDownloadLink(downloadLink)
    downloadLink=downloadLink.substring(0, image1.length - 3)
    downloadLink=downloadLink+'mp4' 
    setDetectionWatchLink(downloadLink)
  }
    

    // <a
    //   href={image1}
    //   target="_blank"
    // ></a>

    // navigate('/traceback', { state: { image1 } })

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

    setResult(data.filter((item) => item.Anomaly_Name.includes(searchValue)))
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
              <input class="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search" onChange={(e) => setSearchValue(e.target.value)} />
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
                <Table className="table-hover  table-fixed  table-bordered
                table-sm same-col-widths">
                {/* <Table className="table-hover  table-fixed table-striped table-bordered
                table-sm same-col-widths"> */}
                  <thead>
                    <tr className="tableRow">
                      {/* <th className="border-0">ID</th> */}
                      <th className="border-1">Name</th>
                      <th className="border-2">Date</th>
                      <th className="border-3">Location</th>
                      <th className="border-4">Delete</th>
                      <th className="border-5">Detection Video</th>
                      <th className="border-6">Traceback Video</th>
                      {/* <button type="button" class="btn btn-primary"><span class="bi bi-eye"></span></button> */}
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
                          <tr className="tableRow">

                            {/* <td>{result.Anomaly_ID}</td> */}
                            <td>{result.Anomaly_Name}</td>
                            <td>{result.Anomaly_Date}</td>
                            <td>{result.Anomaly_Area}</td>

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

                              {/* <button
                                className="btn btn-danger "
                                onClick={() => deleteDetection(result._id)}
                              >
                                Delete
                              </button> */}
                            </td>

                            <td className="btnCenter">
                              <button className="btn btn-dark"
                                style={{
                                  // backgroundColor: '#eb0c21',
                                  borderRadius: "20px",
                                  color: '#FFFFFF',
                                }}
                                onClick={() => {
                                  viewTraceBack(result._id)
                                  if (detectionWatchLink)
                                  setModalDetection(true)

                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg>
                              </button>
                            </td>
                            <td className="btnCenter">
                              <button className="btn btn-dark"
                                style={{
                                  // backgroundColor: '#eb0c21',
                                  borderRadius: "20px",
                                  color: '#FFFFFF',
                                }}
                                onClick={() => {
                                  viewTraceBack(result._id)
                                  if (downloadVideo)
                                    setModal(true)

                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                </svg>
                              </button>
                              {/* <button
                                className="btn btn-success"
                                onClick={() => {
                                  viewTraceBack(result._id)
                                  if (downloadVideo)
                                    setModal(true)

                                }}
                              >
                                Download Result
                              </button> */}

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
      <Modal
        size="lg"
        isOpen={modal}
        aria-labelledby='contained-modal-title-vcenter'
        className="special_modal"
        width="720"
        height="420"
        centered


        toggle={() => setModal(!modal)}>
        <ModalHeader
          toggle={() => setModal(!modal)}>
          {/* <h4 className="cardTitle" style={{ fontWeight: 'bold', fontSize: '22px' }}>Download Detection Video</h4> */}

        </ModalHeader>
        <ModalBody>

          <Row>

            <Col className="px-1" md='12'>
              <VideoPlayer
                controls={true}
                src={downloadVideo}
                poster={img}
                width="720"
                height="520"
              // onReady={this.onPlayerReady.bind(this)}
              />
              {/* <p style={{ color: 'black', fontSize: '20px' }}>Click Yes to Download the detection video</p>

                       */
                <button
                  className="btn btn-dark"
                  // onClick={setModal(false)}
                  onClick={() => {
                    console.log(downloadVideo)
                    setModal(false)
                  }
                  }
                  style={{ padding: '10px 20px', marginTop: '20px', float: 'right' }}

                >
                  <a
                    href={downloadLink}
                    style={{ color: 'white', fontWeight: 'bold', }}
                  >
                    Download Video
                  </a>
                </button>
             /* <button
                className="btn btn-dark"
                onClick={() => setModal(false)}
                style={{ float: 'right', marginRight: '2%', color: 'white', fontWeight: 'bold', }}
              >Cancel</button> */}
            </Col>
          </Row>
        </ModalBody>
      </Modal>


      <Modal
        size="lg"
        isOpen={modalDetection}
        aria-labelledby='contained-modal-title-vcenter'
        className="special_modal"
        width="720"
        height="420"
        centered


        toggle={() => setModalDetection(!modalDetection)}>
        <ModalHeader
          toggle={() => setModalDetection(!modalDetection)}>
          {/* <h4 className="cardTitle" style={{ fontWeight: 'bold', fontSize: '22px' }}>Download Detection Video</h4> */}

        </ModalHeader>
        <ModalBody>

          <Row>

            <Col className="px-1" md='12'>
              <VideoPlayer
                controls={true}
                src={detectionWatchLink}
                poster={img}
                width="720"
                height="520"
              // onReady={this.onPlayerReady.bind(this)}
              />
              {/* <p style={{ color: 'black', fontSize: '20px' }}>Click Yes to Download the detection video</p>

                       */
                <button
                  className="btn btn-dark"
                  // onClick={setModal(false)}
                  onClick={() => {
                    console.log(detectionWatchLink)
                    setModal(false)
                  }
                  }
                  style={{ padding: '10px 20px', marginTop: '20px', float: 'right' }}

                >
                  <a
                    href={detectionDownloadLink}
                    style={{ color: 'white', fontWeight: 'bold', }}
                  >
                    Download Video
                  </a>
                </button>
             /* <button
                className="btn btn-dark"
                onClick={() => setModal(false)}
                style={{ float: 'right', marginRight: '2%', color: 'white', fontWeight: 'bold', }}
              >Cancel</button> */}
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

export default TableList;
