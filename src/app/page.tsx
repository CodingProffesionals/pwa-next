'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
export default function Home() {
  const [isOnline, setIsOnline] = useState('/wifi-on.jpg');

  useEffect(() => {

    window.addEventListener("offline", (event) => {
      setIsOnline("/wifi-off.svg");
      console.log("The network connection has been lost.");
    });

    window.addEventListener("online", (event) => {
      setIsOnline("/wifi-on.jpg");
      console.log("The network connection is present");
    });

  }, [])
  
  async function registerSync() {
    console.log('registerSync');

    const swRegistration: any = await navigator.serviceWorker.ready;
    swRegistration.sync.register("send-message");
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('handleSubmit',event.target?.title?.value);
    const repwindow:any = window;
    await repwindow.navigator.serviceWorker.controller.postMessage({title: event.target?.title?.value, body: event.target?.body?.value})
    registerSync();

  }

  return (
    <>
      <Image src={isOnline} alt="" width="400" height="400" />
      <img src="img_la.jpg" alt="LA" style={{ width: "100%" }} />

      <div className="w3-container w3-center w3-teal">
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
        <p>This is another paragraph.</p>
      </div>
      <form id="myForm" onSubmit={handleSubmit}>
        <input type="text" id="title" name="title" required />
        <input type="text" id="body" name="body" required />
        <button type="submit" id="submitBtn">Submit</button>
      </form>
    </>
  );
}