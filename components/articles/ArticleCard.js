import React from "react";
import { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import styles from "./ArticleCard.module.css";
import Link from "next/link";

const Item = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { article } = props;

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
      <div className={`d-flex align-items-center`}>
        <motion.div
          layout
          className={`${styles.avatar} ${isOpen && styles.avatarBig}`}
        >
          <Link href="articles/[slug]" as={`/articles/${article.slug}`}>
            <a>
              <motion.img
                className={`img img-fluid ${styles.avatarImg} ${
                  isOpen && styles.avatarBigImg
                }`}
                src={article.featuredPhoto}
                alt={article.title}
              />
            </a>
          </Link>
        </motion.div>
        <motion.div
          layout
          className={`${styles.text} ${isOpen && styles.textBig}`}
        >
          <Link href="articles/[slug]" as={`/articles/${article.slug}`}>
            <a className={`${styles.link}`}>{article.title}</a>
          </Link>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && <Content articleData={article} />}
      </AnimatePresence>
    </motion.li>
  );
};

const Content = (props) => {
  const article = props.articleData;

  const renderCategories = (data) =>
    data.map((d) => (
      <Link
        key={d._id}
        href="/category/[category]"
        as={`/category/${d.name.toLowerCase()}`}
      >
        <a className={`mr-3 h6 font-weight-bold ${styles.badge}`}>{d.name}</a>
      </Link>
    ));

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
    >
      <div className={`container`}>
        <div className={`${styles.row}`}>
          <strong className={`heading`}>Posted by : </strong>{" "}
          <Link
            href="/user/profile/[username]"
            as={`/user/profile/${article.postedBy.username}`}
          >
            <a>{article.postedBy.name}</a>
          </Link>
        </div>
        <div className={`${styles.row}`}>
          <strong className={`heading`}>Posted on :</strong>{" "}
          {` ${new Date(article.createdAt).toLocaleDateString()}`}
        </div>
        <div className={`${styles.row} my-3`}>
          {renderCategories(article.category)}
        </div>
        <div className={`${styles.row} ${styles.desc}`}>
          {article.mdesc + " ..."}
        </div>
      </div>
    </motion.div>
  );
};

const ArticleCard = (props) => {
  return (
    <AnimateSharedLayout>
      <section className={`${styles.articleEl}`}>
        <motion.ul layout initial={{ borderRadius: 25 }}>
          {props.articles.map((article) => (
            <Item key={article._id} article={article} />
          ))}
        </motion.ul>
      </section>
    </AnimateSharedLayout>
  );
};

export default ArticleCard;
