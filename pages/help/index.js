import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Help from "../../components/help/Help";

const HelpPage = () => {
  return (
    <div>
      <Layout>
        <Header sidebar>
          <Help />
        </Header>
        <Footer />
      </Layout>
    </div>
  );
};

export default HelpPage;
