import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import LandingPage from "../components/LandingPage/LandingPage";
import Layout from "../components/Layout";

const Index = () => {
  const head = () => (
    <Head>
      <title>Titan Read</title>
      <meta
        name="description"
        content={`Find articles. Read about anything all at the same place. Pen down yout thoughts and let the world read them. Welcome to Titan Read.`}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js"></script>
    </Head>
  );

  return (
    <React.Fragment>
      {head()}
      <div style={{ overflowX: "hidden" }}>
        <LandingPage />
      </div>
    </React.Fragment>
  );
};

export default Index;
