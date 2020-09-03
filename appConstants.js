const BASE_URL = `http://localhost:8000/`;
// const BASE_URL = `https://mighty-ravine-63394.herokuapp.com/api/user/register/`;

// others
COOKIE_NAME = 'token';

// urls to fethc and post
const UPLOADS = `${BASE_URL}uploads`;
const SIGNUP = `${BASE_URL}api/user/register`;
const SIGNIN = `${BASE_URL}api/user/login`;
const ARTICLE_CREATE = `${BASE_URL}api/article/create`;

export { UPLOADS, SIGNIN, SIGNUP, ARTICLE_CREATE, COOKIE_NAME };
