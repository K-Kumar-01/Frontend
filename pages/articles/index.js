import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Layout from "../../components/Layout";
import Preloader from "../../components/spinner/Preloader";
import { getAllArticles } from "../../actions/article";
import ArticleList from "../../components/articles/ArticleList";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    let response;
    try {
      response = await getAllArticles();
      if (response.error) {
        console.log(response.error);
      } else {
        setArticles(response.articles);
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
        <div style={{ minHeight: "60vh" }}>
          {loading ? <Preloader /> : <ArticleList articles={articles} />}
        </div>
      </Header>
      <Footer />
    </Layout>
  );
};

export default Articles;
