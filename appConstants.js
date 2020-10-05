const BASE_URL = `http://localhost:8000/`;

// others
const COOKIE_NAME = "token";

// urls to fethc and post
const UPLOADS = `${BASE_URL}uploads`;
const SIGNUP = `${BASE_URL}api/user/register`;
const SIGNIN = `${BASE_URL}api/user/login`;
const SIGNOUT = `${BASE_URL}api/user/logout`;
const ARTICLE_CREATE = `${BASE_URL}api/article/create`;
const FETCH_ARTICLES = `${BASE_URL}api/article`;
const FETCH_CATEGORY_ARTICLES = (category) =>
  `${BASE_URL}api/article/category/${category}`;
const FETCH_PARTICULAR_ARTILCE = (slug) => `${BASE_URL}api/article/one/${slug}`;
const FETCH_TYPE = `Single`;
const FETCH_HELP_ALL = `${BASE_URL}api/request`;
const CREATE_REQUEST = `${BASE_URL}api/request/create`;
export {
  UPLOADS,
  SIGNIN,
  SIGNUP,
  ARTICLE_CREATE,
  COOKIE_NAME,
  BASE_URL,
  SIGNOUT,
  FETCH_ARTICLES,
  FETCH_CATEGORY_ARTICLES,
  FETCH_PARTICULAR_ARTILCE,
  FETCH_TYPE,
  FETCH_HELP_ALL,
  CREATE_REQUEST,
};
