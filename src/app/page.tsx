'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
export default function Home() {
  // const [isOnline, setIsOnline] = useState('/wifi-on.jpg');
  const imgref = useRef(null);
  useEffect(() => {
    const srcimg:any = imgref.current;
    console.log('addEventListener',srcimg.src);

   window.addEventListener("offline", (event) => {
    event.preventDefault();
    // setIsOnline("/wifi-off.svg");
    const domget:any = imgref
    srcimg.src = "/wifi-off.svg"
    console.log("The network connection has been lost.");
  });
  
  window.addEventListener("online", (event) => {
    event.preventDefault();
    // setIsOnline("/wifi-on.jpg");
    
    
    const domget:any = imgref
    srcimg.src = "/wifi-on.jpg"
    console.log("The network connection is present");
  });

  },[])
  return (
    <>
      <img ref={imgref} id="imgwifi" src="/wifi-on.jpg" alt="" width="400" height="400"  />
      <img src="img_la.jpg" alt="LA" style={{width:"100%"}} />

      <div className="w3-container w3-center w3-teal">
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
        <p>This is another paragraph.</p>
      </div>
    </>
  );
}
