import React,{useState,useEffect} from 'react'

const notification = () => {

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position)
        })
    },[])
  return (
    <div>notification</div>
  )
}

export default notification