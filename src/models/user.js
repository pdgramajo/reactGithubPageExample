import Authentication from '../lib/Authentication';
import Api from '../lib/Api';

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
      dispatch.loader.isLoading(true);
      try {
        let userToken;
        if (token) {
          userToken = token;
        } else {
          const response = await Api.post('Accounts/Login', { email, password })
          userToken = response.data.token;
        }

        Authentication.setJWTCookie(userToken);
        dispatch.user.add(Authentication.getUser());
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
      finally {
        dispatch.loader.isLoading(false);
      }
    },
    logout() {
      Authentication.deleteJwt();

      dispatch.user.delete();
    },
    async createUserAsync(userData) {
      try {
        dispatch.loader.isLoading(true);
        const response = await Api.post('Accounts/Create', userData);
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(new Error('Error adding Files.'));
      }
      finally {
        dispatch.loader.isLoading(false);
      }
    },
    async updateUserAsync(data) {
      try {
        dispatch.loader.isLoading(true);
        const response = await Api.put(`Users/${data.userId}`, data.user);
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(new Error('Error adding Files.'));
      }
      finally {
        dispatch.loader.isLoading(false);
      }
    },
    async getAllUsersAsync(page) {
      try {
        dispatch.loader.isLoading(true);

        const params = {
          PageNumber: page ? page : 1,
          PageSize: 4
        }

        const response = await Api.get('Users', params);

        dispatch.user.pagination(JSON.parse(response.headers['x-pagination']));
        dispatch.user.getAllUsers(response.data);

        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(new Error('Error fetching data.'));
      }
      finally {
        dispatch.loader.isLoading(false);
      }

    },
    async getUserByIdAsync(userId) {
      try {
        dispatch.loader.isLoading(true);
        const response = await Api.get(`Users/${userId}`)
        dispatch.user.getUserById(response.data);
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(new Error('Error fetching data.'));
      }
      finally {
        dispatch.loader.isLoading(false);
      }
    },
    async deleteUserAsync(UserId) {
      try {
        dispatch.loader.isLoading(true);
        await Api.delete(`Users/${UserId}`);
      } catch (error) {
        return Promise.reject(new Error('Error deleting.' + error));
      }
      finally {
        dispatch.loader.isLoading(false);
      }
    }
  }),
};

export default user;
