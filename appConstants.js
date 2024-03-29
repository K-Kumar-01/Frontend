const BASE_URL = `https://mighty-ravine-63394.herokuapp.com/`;
// const BASE_URL = `http://localhost:8000/`;

const DOMAIN = `https://frontend-three-kappa.vercel.app/`;
// const DOMAIN = `http://localhost:3000`;

// others
const COOKIE_NAME = "token";

// CHATBOT endpoint
const CHATBOT = `https://titanreadchatbot.herokuapp.com/webhooks/rest/webhook`;

// urls to fetch and post
const UPLOADS = `${BASE_URL}uploads`;
const SIGNUP = `${BASE_URL}api/user/register`;
const SIGNIN = `${BASE_URL}api/user/login`;
const GOOGLESIGNIN = `${BASE_URL}api/user/googleSignin`;
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
const TOGGLE_LIKE = (slug) => `${BASE_URL}api/article/react/${slug}`;
const FETCH_FAVOURITES = (username) =>
  `${BASE_URL}api/user/favourites/${username}`;
const SEARCH_ARTICLES = (search) =>
  `${BASE_URL}api/article/search?search=${search}`;
const ARTICLES_BY_SPECIFIC_USER = (username) =>
  `${BASE_URL}api/user/articles/${username}`;
const EMAIL_VERIFICATION = (username) =>
  `${BASE_URL}api/user/emailverification/${username}`;
const RECOVER_PASSWORD = (username) =>
  `${BASE_URL}api/user/recoverpassword/${username}`;
export {
  UPLOADS,
  CHATBOT,
  SIGNIN,
  GOOGLESIGNIN,
  SIGNUP,
  ARTICLE_CREATE,
  COOKIE_NAME,
  BASE_URL,
  DOMAIN,
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
  TOGGLE_LIKE,
  FETCH_FAVOURITES,
  SEARCH_ARTICLES,
  ARTICLES_BY_SPECIFIC_USER,
  EMAIL_VERIFICATION,
  RECOVER_PASSWORD,
};
