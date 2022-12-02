import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Player } from 'video-react';
import img from '../assets/img/sidebar-8.jpg'

import VideoPlayer from 'react-video-js-player';
const ShowTraceback = () => {
  const location = useLocation()
  // const useStyle=makeStyles({
  //   playerWrapper:{
  //     width:'100%',
  //     position:'relative'
  //   }
  // })

  var image1
  try {
    image1 = location.state.image1
    console.log(image1.length)
    image1 = image1.substring(0, image1.length - 3)
    image1 = image1 + 'mp4'
    console.log(image1)
    console.log('location', location)
  }
  catch (e) {
    console.log(e)
  }
  if (image1) {
    return (

      <div >
        <h1 style={{ fontWeight: 'bold', alignContent: 'center' }}> Traceback Result</h1>
        {/* <div style={{paddingLeft:'1px'}}> */}
        {/* <img src={image1} height={600} width={1000} /> */}
        {/* <video width={520} height={400}>
          <source src='https://res.cloudinary.com/dsycufi98/video/upload/v1669148633/efqblxwptj1opvbdgqrw.avi'></source>
        </video> */}

        {/* <ReactPlayer url='https://res.cloudinary.com/dsycufi98/video/upload/v1669061039/jj5juh0w40mn9cuwx5fm.mp4'
                className='react-player  '
                width='100%'
                height='40%'
                volume={1}
                controls={true}
            /> */}

        <VideoPlayer
          controls={true}
          src={image1}
          poster={img}
          width="720"
          height="420"
        // onReady={this.onPlayerReady.bind(this)}
        />

        {/* <Player
      playsInline
      poster="../assets/img/bg-01.jpg"
      src={image1}
      style={{paddingTop:'0%',float:'Top',marginRight:'10%'}}
    /> */}
        {/* </div>         */}
      </div>


    )

  }
  else {
    <h1>Loading...</h1>
  }

}

export default ShowTraceback