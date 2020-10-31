import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Layout from "../../components/Layout";
import Preloader from "../../components/spinner/Preloader";
import { getAllArticles } from "../../actions/article";
import ArticleList from "../../components/articles/ArticleList";
import Head from "next/head";
import { DOMAIN } from "../../appConstants";

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

  const head = () => (
    <Head>
      <title>Articles | TITAN READ</title>
      <meta
        name="description"
        content="Read the articles on various topics written by people with their imagination, skill, personal opinions. Wander the different categories present. Find the latest and the trending articles."
      />
      <link rel="canonical" href={`${DOMAIN}/articles`} />
      <meta property="og:title" content={`Articles | TITAN READ`} />
      <meta
        property="og:description"
        content={`Read the articles on various topics written by people with their imagination, skill, personal opinions. Wander the different categories present. Find the latest and the trending articles.`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/articles`} />
      <meta property="og:site_name" content={`TITAN READ`} />
    </Head>
  );

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <Header sidebar search={true}>
          <div style={{ minHeight: "70vh" }}>
            {loading ? <Preloader /> : <ArticleList articles={articles} />}
          </div>
        </Header>
        <Footer />
      </Layout>
    </React.Fragment>
  );
};

export default Articles;
