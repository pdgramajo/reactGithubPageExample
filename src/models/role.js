import Axios from "axios";
import { API } from '../config';
import Authentication from '../lib/Authentication';

export default {
    state: {
        paginatedRoles: [],
        usersByRole: [],
        pagination: {}
    },
    reducers: {
        getAllRoles: (state, data) => {
            return {
                ...state,
                paginatedRoles: data
            }
        },
        getAllUsersByRoleId: (state, data) => {
            return {
                ...state,
                usersByRole: data
            }
        },
        pagination: (state, data) => {
            return {
                ...state,
                pagination: data
            }
        },
    },
    effects: dispatch => ({
        async getAllRolesAsync(page) {
            try {
                const pageNumber = page ? page : 1;
                const response = await Axios.get(`${API.BaseURL}/Roles?PageNumber=${pageNumber}&PageSize=4`, { headers: { Authorization: Authentication.bearerToken() } })
                dispatch.role.pagination(JSON.parse(response.headers['x-pagination']));
                dispatch.role.getAllRoles(response.data);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error fetching data.'));
            }
        },
        async getAllUsersByRoleIdAsync(roleId) {
            try {
                const response = await Axios.get(`${API.BaseURL}/Roles/${roleId}/Users`, { headers: { Authorization: Authentication.bearerToken() } })
                dispatch.role.getAllUsersByRoleId(response.data);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error fetching data.'));
            }
        },
        async createRoleAsync(roleName) {
            try {
                const response = await Axios.post(`${API.BaseURL}/Roles`, roleName, { headers: { Authorization: Authentication.bearerToken() } })
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error adding role.'));
            }
        },
        async deleteRoleAsync(roleId) {
            try {
                await Axios.delete(`${API.BaseURL}/Roles/${roleId}`, { headers: { Authorization: Authentication.bearerToken() } })
            } catch (error) {
                return Promise.reject(new Error('Error deleting role.' + error.message));
            }
        }
    }),
}