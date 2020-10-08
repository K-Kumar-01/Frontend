import cookie from "js-cookie";
import jwt from "jsonwebtoken";

export const setCookie = (key, value) => {
  cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key) => {
  cookie.remove(key);
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const decodeCookie = (cookieValue) => {
  return jwt.decode(cookieValue);
};

export const removeCookieonExp = (key) => {
  if (!authenticate(key)) {
    removeCookie(key);
  }
};

export const authenticate = (key) => {
  let token = getCookie(key);
  let decodedCookie = decodeCookie(token);
  if (!decodedCookie || !token) {
    return false;
  }
  let expDate = decodedCookie.exp * 1000;
  if (parseInt(new Date().getTime()) > expDate) {
    return false;
  } else {
    return decodedCookie;
  }
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  }
  return null;
};

export const removeLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};
