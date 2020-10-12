import React from "react";
import { IconContext } from "react-icons";
import { HiOutlineEmojiSad } from "react-icons/hi";
import ArticleCategoryCard from "../category/ArticleCategoryCard";

const Favourites = (props) => {
  const { favs } = props;
  const renderFavourites = (data = []) => (
    <React.Fragment>
      {data.length === 0 ? (
        <div
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          <IconContext.Provider value={{ size: "4rem" }}>
            <HiOutlineEmojiSad />
          </IconContext.Provider>
        </div>
      ) : (
        <div>
          {data.map((d) => (
            <ArticleCategoryCard key={d._id} article={d} fav={true} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
  return (
    <section className={``} style={{ minHeight: "75vh" }}>
      {renderFavourites(favs)}
    </section>
  );
};

export default Favourites;
