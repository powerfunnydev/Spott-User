import cookie from 'react-cookie';
import * as api from '../../api/configuration';
import { apiBaseUrlSelector } from './selector';
import { getLocalStorage } from '../../utils';

const storage = getLocalStorage();

export const CONFIGURE = 'CONFIGURE';
export function doInit () {
  return async (dispatch) => {
    const configuration = await api.getConfiguration();
    // Extend configuration from server with the configuration saved in the cookie.
    configuration.acceptCookies = parseInt(cookie.load('acceptCookies'), 10);
    dispatch({ type: CONFIGURE, configuration });
  };
}

export const ACCEPT_COOKIES = 'ACCEPT_COOKIES';
export function acceptCookies () {
  const now = new Date();
  const nextYear = new Date(now.getTime());
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  // Accept cookies and save the Unix timestamp in the cookie.
  cookie.save('acceptCookies', now.getTime(), { expires: nextYear, path: '/' });
  return { type: ACCEPT_COOKIES };
}

export const DOWNLOAD_PAGE_SHOWED = 'DOWNLOAD_PAGE_SHOWED';
export function downloadPageShowed () {
  return (dispatch, getState) => {
    const date = new Date();
    storage.setItem('downloadPageShowed', JSON.stringify(date));
    dispatch({ type: DOWNLOAD_PAGE_SHOWED, downloadPageShowed: date });
  };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export function doLogin ({ email, password }) {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const baseUrl = apiBaseUrlSelector(getState());
      const data = await api.login(baseUrl, { email, password });
      dispatch({ data, type: LOGIN_SUCCESS });
      storage.setItem('session', JSON.stringify(data));
      if (data.user.id && window && window.appboy) {
        window.appboy.changeUser(data.user.id);
      }
      return data;
    } catch (error) {
      dispatch({ error, type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function doLoginFacebook ({ facebookAccessToken }) {
  return async (dispatch, getState) => {
    const baseUrl = apiBaseUrlSelector(getState());
    dispatch({ type: LOGIN_REQUEST });
    try {
      const data = await api.loginFacebook(baseUrl, { facebookAccessToken });
      dispatch({ data, type: LOGIN_SUCCESS });
      if (data.user.id && window && window.appboy) {
        window.appboy.changeUser(data.user.id);
      }
      storage.setItem('session', JSON.stringify(data));
    } catch (error) {
      dispatch({ error, type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function doTryLoginFacebook ({ facebookAccessToken }) {
  return async (dispatch, getState) => {
    const baseUrl = apiBaseUrlSelector(getState());
    const data = await api.loginFacebook(baseUrl, { facebookAccessToken });
    dispatch({ data, type: LOGIN_SUCCESS });
    if (data.user.id && window && window.appboy) {
      window.appboy.changeUser(data.user.id);
    }
    storage.setItem('session', JSON.stringify(data));
  };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export function doLogout () {
  return (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    dispatch({ type: LOGOUT_SUCCESS });
    storage.removeItem('session');
  };
}

export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export function changeLocale (locale) {
  return { locale, type: CHANGE_LOCALE };
}
