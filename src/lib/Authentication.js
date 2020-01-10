import JWTDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import moment from 'moment';
import { Auth, API } from '../config';


export default class Authentication {
  static setJWTCookie(jwtData) {
    const jwt = JWTDecode(jwtData);
    const expires = moment(0).utc().seconds(jwt.exp).local();
    const secure = Auth.JWTSecure ? ';secure' : '';
    Cookies.set(Auth.JWTKey, jwtData, { expires: expires.diff(moment(), 'seconds') / 86400, secure });
  }

  static deleteJwt() {
    Cookies.remove(Auth.JWTKey);
  }

  static isAuthenticated() {
    return !!this.getJwt();
  }

  static getJwt() {
    return Cookies.get(Auth.JWTKey);
  }

  static bearerToken() {
    return `Bearer ${this.getJwt()}`;
  }

  static _getDecodedJwt() {
    if (this.isAuthenticated()) {
      return JWTDecode(this.getJwt());
    }

    return null;
  }

  static getUser() {

    if (this.isAuthenticated()) {
      const jwt = this._getDecodedJwt();
      let image = 'https://www.achievesuccesstutoring.com/wp-content/uploads/2019/05/no-photo-icon-22.jpg-300x300.png';

      if (jwt['avatar'] !== '') {
        image = `${API.BaseURL.replace('api', '')}${jwt['avatar']}`
      }

      return {
        userId: jwt.sub,
        name: jwt['name'],
        email: jwt['email'],
        handle: '@test',
        securityGroup: jwt['roles'],
        avatarURL: image,
      };
    }
    return null;
  }

  static getCalendarKey() {
    if (this.isAuthenticated()) {
      const jwt = this._getDecodedJwt();
      return jwt['se:calendarKey'];
    }
    return null;
  }
}
