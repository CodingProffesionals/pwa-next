'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
export default function Home() {
  const [isOnline, setIsOnline] = useState('/wifi-on.jpg');
  const [data, setdata] = useState<any>('');

  useEffect(() => {

    window.addEventListener("offline", (event) => {
      setIsOnline("/wifi-off.svg");
      console.log("The network connection has been lost.");
    });

    window.addEventListener("online", (event) => {
      setIsOnline("/wifi-on.jpg");
      console.log("The network connection is present");
    });

    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log('message in the main thread');
      console.log(event.data);
      setdata(event.data)
    });

  }, [])

  async function registerSync() {
    console.log('registerSync');

    const swRegistration: any = await navigator.serviceWorker.ready;
    swRegistration.sync.register("send-message");
  }



  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('handleSubmit', event.target?.title?.value);
    const repwindow: any = window;
    await repwindow.navigator.serviceWorker.controller.postMessage({ title: event.target?.title?.value, body: event.target?.body?.value })
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
      <div className="w-full flex gap-16">
        <form id="myForm" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input type="text" id="title" name="title" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
              Body
            </label>
            <input type="text" id="body" name="body" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <button type="submit" id="submitBtn" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </form>
        {
          data != '' ? <div className="mt-8">
            <ul className="list-disc">
              {data?.title && <li>Title: {data?.title}</li>}
              {data?.body && <li>Body: {data?.body}</li>}
            </ul>
          </div> : <div className="mt-8">No data</div>
        }
      </div>

    </>
  );
}