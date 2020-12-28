import React, { useEffect, useState } from "react";
import Head from "next/head";

import Layout from "../../components/Layout";
import Preloader from "../../components/spinner/Preloader";
import ArticleList from "../../components/articles/ArticleList";
import { getAllArticles } from "../../actions/article";
import { DOMAIN } from "../../appConstants";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    let response;
    try {
      response = await getAllArticles();
      if (response.error) {
      } else {
        setArticles(response.articles);
      }
    } catch (error) {}
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
      <Layout headerSearch={true} headerSidebar={true}>
        <div style={{ minHeight: "70vh" }}>
          {loading ? <Preloader /> : <ArticleList articles={articles} />}
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Articles;
