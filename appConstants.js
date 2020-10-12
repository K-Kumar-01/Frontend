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
const SINGLE_REQUEST = (slug) => `${BASE_URL}api/request/one/${slug}`;
const SUGGEST_ARTICLE_REQUEST = (slug) =>
  `${BASE_URL}api/request/suggest/one/${slug}`;
const APPROVE_REQUEST = (slug) => `${BASE_URL}api/request/close/one/${slug}`;
const TOGGLE_FAVOURITE = (slug) => `${BASE_URL}api/article/favourite/${slug}`;
const FETCH_FAVOURITES = (username) =>
  `${BASE_URL}api/user/favourites/${username}`;
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
  SINGLE_REQUEST,
  SUGGEST_ARTICLE_REQUEST,
  APPROVE_REQUEST,
  TOGGLE_FAVOURITE,
  FETCH_FAVOURITES,
};
