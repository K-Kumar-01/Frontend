const BASE_URL = `http://localhost:8000/`;


// others
const COOKIE_NAME = 'token';

// urls to fethc and post
const UPLOADS = `${BASE_URL}uploads`;
const SIGNUP = `${BASE_URL}api/user/register`;
const SIGNIN = `${BASE_URL}api/user/login`;
const SIGNOUT = `${BASE_URL}api/user/logout`;
const ARTICLE_CREATE = `${BASE_URL}api/article/create`;

export { UPLOADS, SIGNIN, SIGNUP, ARTICLE_CREATE, COOKIE_NAME, BASE_URL, SIGNOUT };
