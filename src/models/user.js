import Axios from 'axios';
import { API } from '../config';
import Authentication from '../lib/Authentication';

const user = {
  state: {
    userLogged: Authentication.getUser(),
    paginatedUsers: [],
    userFound: {},
    isLogged: false,
    loading: false,
    pagination: {}
  },
  reducers: {
    add: (state, newUser) => {
      return {
        ...state,
        userLogged: newUser,
        isLogged: true
      }
    },
    delete: (state) => {
      return {
        ...state,
        userLogged: null,
        isLogged: false
      }
    },
    getAllUsers: (state, paginatedUsers) => {
      return {
        ...state,
        paginatedUsers: paginatedUsers
      }
    },
    pagination: (state, data) => {
      return {
        ...state,
        pagination: data
      }
    },
    getUserById: (state, userFound) => {
      return {
        ...state,
        userFound: userFound
      }
    },
    setLoading: (state, isloading) => {
      return {
        ...state,
        loading: isloading
      }
    }
  },
  effects: dispatch => ({
    async loginAsync({ email, password, token }) {
      dispatch.user.setLoading(true);
      try {
        let userToken;
        if (token) {
          userToken = token;
        } else {
          const response = await Axios.post(`${API.BaseURL}/Accounts/Login`, { email, password });

          userToken = response.data.token;
        }

        Authentication.setJWTCookie(userToken);
        dispatch.user.add(Authentication.getUser());
        dispatch.user.setLoading(false);
        return Promise.resolve();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          return Promise.reject(new Error('Email and/or password was invalid'));
        }

        if (error.name === 'InvalidTokenError') {
          return Promise.resolve();
        }

        return Promise.reject(new Error('Network error'));
      }
    },

    logout() {
      Authentication.deleteJwt();

      dispatch.user.delete();
    },
    async createUserAsync(userData) {
      try {
        const response = await Axios.post(`${API.BaseURL}/Accounts/Create`, userData, { headers: { Authorization: Authentication.bearerToken() } })
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(new Error('Error adding Files.'));
      }
    },
    async updateUserAsync(data) {
      try {
        const response = await Axios.put(`${API.BaseURL}/Users/${data.userId}`, data.user, { headers: { Authorization: Authentication.bearerToken() } })
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(new Error('Error adding Files.'));
      }
    },
    async getAllUsersAsync(page) {
      try {

        const response = await Axios.get(`${API.BaseURL}/Users?PageNumber=${page}&PageSize=2`, { headers: { Authorization: Authentication.bearerToken() } });
        dispatch.user.pagination(JSON.parse(response.headers['x-pagination']));
        dispatch.user.getAllUsers(response.data);

        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(new Error('Error fetching data.'));
      }
    },
    async getUserByIdAsync(userId) {
      try {
        const response = await Axios.get(`${API.BaseURL}/Users/${userId}`, { headers: { Authorization: Authentication.bearerToken() } })
        dispatch.user.getUserById(response.data);
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(new Error('Error fetching data.'));
      }
    },
    async deleteUserAsync(UserId) {
      try {
        await Axios.delete(`${API.BaseURL}/Users/${UserId}`, { headers: { Authorization: Authentication.bearerToken() } })
      } catch (error) {
        return Promise.reject(new Error('Error adding Files.' + error.message));
      }
    }

  }),
};

export default user;
