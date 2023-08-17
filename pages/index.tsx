import Head from 'next/head'
import styles from '../styles/Home.module.css'
import type { FunctionComponent } from "react"
import { InView } from 'react-intersection-observer';
import Recommended from "../components/Recommended";
import Offer from "../components/Offer";
import Link from "next/link"
import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const img_data = [
  "https://images.unsplash.com/photo-1604601815764-6d01fc6bebde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80",
  "https://images.unsplash.com/photo-1589124223359-1ef39c61ee88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
]

const Home = () => {
  const [current_img, setCurrentImg] = useState<string>(img_data[0]);
  useEffect(() => {
    var i = 0;
    AOS.init({
      disable: false,
     
      offset:300
    
    })
    setInterval(function ()
    { 
      i++;
      if (i > 1) {
        i = 0;
      }
      setCurrentImg(img_data[i])
     }, 5000);
  }, [])
  return (
    <div style={{ width: "100vw",height:"85vh" }}>
      <div data-aos="fade-left"
          
          data-aos-delay="50"
        data-aos-duration="2000"
          data-aos-easing="ease-in-out"
          data-aos-mirror="true"
          data-aos-once="false"
          data-aos-anchor-placement="top-center">
        <Link href="/flights"><a className="jsx-4035712791 button booknow-main">Check for flights</a></Link>
        </div>
      <div className="main-first"  >
      {/* <div data-aos="fade-right"
data-aos-delay="50"
data-aos-duration="2000"
data-aos-easing="ease-in-out"
>
          <p className="main-header">RECOMMENDED FLIGHTS</p>
          <Recommended />
        </div> */}
      <img
        className="home-img"
          src={current_img} />
        
     
      </div>
      

       
    {/* <p className="main-header"  >BEST OFFERS</p>
       <div className="offer-list">
          <Offer name="Your first booking" perce={20} />
          <Offer name="Your first booking" perce={20} />
          <Offer name="Your first booking" perce={20} />
          
        </div>
    
     
       <div className="offer-list">
          <Offer name="Your first booking" perce={20} />
          <Offer name="Your first booking" perce={20} />
          <Offer name="Your first booking" perce={20}/>
        </div>
        </div> */}
     {/* <InView as="div" onChange={(inView, entry) => //console.log('Inview:', inView)}>
     <h2>Plain children are always rendered. Use onChange to monitor state.</h2>
      </InView> */}
        
      </div>
  )
}
export default Home;