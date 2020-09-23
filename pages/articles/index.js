import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Layout from "../../components/Layout";
import Preloader from "../../components/spinner/Preloader";
import { getAllArticles } from "../../actions/article";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const fetchArticles = async () => {
    let response;
    try {
      response = await getAllArticles();
      console.log(response);
      console.log("********");
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Layout>
      <Header sidebar>
        <div style={{ minHeight: "60vh" }}>{loading && <Preloader />}</div>
      </Header>
      <Footer />
    </Layout>
  );
};

export default Articles;
