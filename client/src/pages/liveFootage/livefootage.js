import React, { useState,useEffect } from 'react'
import './liveFootage.css';
import { useGeolocated } from "react-geolocated";
import VideoPlayer from 'react-video-js-player';
import img from '../../assets/img/sidebar-8.jpg';
const Livefootage = () => {
  const [latitude,setLatitude]=useState()
  const [longitude,setLongitude]=useState()
  
  
  const [data,setData] = useState({"label":"","link":"nothing"})

    

  const getData = async () => {
    
    
try{
  

    var res = await fetch("http://20.106.75.53:8080/api/anomalyType")
      res = await res.json();
      setData(res)
      if(res.link && res.label)
      {
        // if(res.label){
          const label= res.label
          const link= res.link
  
          const res1 = await fetch("http://localhost:5000/liveStream", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              link,
              label,
              detection,
              
              
            }),
          });
        // }
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      getData();
    },1000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);



  return (
    <div style={{
      // width:"700%",
      // height:"700%"
      }} >
    
        <img className='LiveFootage' src='http://20.106.75.53:8080/api/video' alt='Not showing'/>
        {/* <VideoPlayer
                controls={true}
                src='http://20.106.75.53:8080/api/video'
                poster={img}
                width="1220%"
                height="600%"
              /> */}
    </div>
  )
}

export default Livefootage