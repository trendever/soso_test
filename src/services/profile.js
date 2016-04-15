import * as utils from './utils';

var prefix = '_te_';

var Storage = getStorage();
var cachedProfile = getProfile();

export function getProfile() {
  if (cachedProfile) {
    return cachedProfile;
  }

  var profile = {
    token: Storage.getItem('token'),
  };

  if (!profile.token) {
    profile.isAuthorized = false;
  } else {
    profile.isAuthorized = true;
  }

  cachedProfile = profile;

  return profile;
}

export function getStorage() {
    return new CookieStorage();
}

export function CookieStorage() {
  this.setItem = (name, value) => utils.setCookie(`${prefix}${name}`, value, 1095);
  this.getItem = (name) => utils.getCookie(`${prefix}${name}`);
  this.removeItem = utils.removeCookie;
}

export function setToken(token) {
  Storage.setItem('token', token);
}

/**
 * profile user
 * @type {string} token - токен авторизации
 * @ return {object}
 */
export default cachedProfile;
