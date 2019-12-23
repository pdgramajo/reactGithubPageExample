export const API = {
    BaseURL: process.env.REACT_APP_API_BASEURL || window.env.API_BASEURL,
  };
  
  export const Auth = {
    JWTKey: process.env.REACT_APP_JWT_KEY || window.env.JWT_KEY,
    JWTSecure: (process.env.REACT_APP_JWT_SECURE || window.env.JWT_SECURE) === 'true',
  };