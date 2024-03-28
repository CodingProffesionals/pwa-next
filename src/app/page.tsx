import Image from "next/image";

export default function Home() {
  return (
    <>
      <img src="img_la.jpg" alt="LA" style={{width:"100%"}} />

      <div className="w3-container w3-center w3-teal">
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
        <p>This is another paragraph.</p>
      </div>
    </>
  );
}
