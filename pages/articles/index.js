import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Layout from "../../components/Layout";


const Articles = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {}, []);

  return (
    <Layout>
      <Header sidebar></Header>
      <Footer />
    </Layout>
  );
};

export default Articles;
