import React, { useEffect, useState } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCreate from "../../components/crud/article/ArticleCreate";
import Layout from "../../components/Layout";
import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";
import { useRouter } from "next/router";
import Preloader from "../../components/spinner/Preloader";

const ComponentWithToasts = () => {
  const { addToast } = useToasts();
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (authenticate(COOKIE_NAME)) {
      setIsAuth(true);
    } else {
      addToast("Login required to perform this task", {
        appearance: "error",
        autoDismiss: true,
      });
      router.push("/signin");
    }
  }, []);
  return (
    <>
      {isAuth ? (
        <main>
          <Layout>
            <Header sidebar>
              <ArticleCreate />
            </Header>
            <Footer />
          </Layout>
        </main>
      ) : (
        <Preloader message={`Redirecting to signin page`} />
      )}
    </>
  );
};

const CreateArticle = () => {
  return (
    <ToastProvider>
      <ComponentWithToasts />
    </ToastProvider>
  );
};

export default CreateArticle;
