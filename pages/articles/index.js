import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "../../components/Layout";
import SkeletonArticle from "../../components/Skeleton/SkeletonArticle";
import { getAllArticles } from "../../actions/article";
import { DOMAIN } from "../../appConstants";

const ArticleList = dynamic(()=>import("../../components/articles/ArticleList"))

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
          {loading ? (
            <div className="container">
              <SkeletonArticle main />
              <div className="row">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    className="col-md-3 col-sm-6 col-xs-12 mt-3"
                    key={`side-article-${i}`}
                  >
                    <SkeletonArticle />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ArticleList articles={articles} />
          )}
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default Articles;
