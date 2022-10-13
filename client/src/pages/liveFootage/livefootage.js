import React, { useState,useEffect } from 'react'
import './liveFootage.css';
import { useGeolocated } from "react-geolocated";

const Livefootage = () => {
  const [latitude,setLatitude]=useState()
  const [longitude,setLongitude]=useState()
  
  const [data,setData] = useState({"label":"","link":"nothing"})

    

  const getData = async () => {
    
    
try{
  

    var res = await fetch("http://20.106.75.53:8080/api/anomalyType")
      res = await res.json();
      setData(res)
      console.log(res);
    //   var values=Object.values(data.label)
      // console.log(values,'aadsf')
      // console.log(res.label)
      if(res.link && res.label)
      {
        // console.log('sadf ', res.link)
        // if(res.label){
          const label= res.label
          const link= res.link
  
          console.log("lat ",latitude," lon ",longitude," lab ",label, " link ",link)
          const res1 = await fetch("http://localhost:5000/liveStream", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              link,
              label,
              
              
            }),
          });
        // }
      }
    } catch (e) {
      // console.log('a')
      console.log(e);
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
    <div >
    
        <img className='LiveFootage' src='http://20.106.75.53:8080/api/video' alt='Not showing'/>
    </div>
  )
}

export default Livefootage