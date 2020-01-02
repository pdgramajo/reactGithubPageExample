import Axios from "axios";
import { API } from '../config';
import Authentication from '../lib/Authentication';

export default {
    state: {
        paginatedRoles: [],
        usersByRole: [],
        pagination: {},
        allRolesForSelect: []
    },
    reducers: {
        getAllRoles: (state, data) => {
            return {
                ...state,
                paginatedRoles: data
            }
        },
        getAllRolesForSelect: (state, data) => {
            return {
                ...state,
                allRolesForSelect: data
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
                dispatch.loader.isLoading(true);
                const pageNumber = page ? page : 1;
                const response = await Axios.get(`${API.BaseURL}/Roles?PageNumber=${pageNumber}&PageSize=4`, { headers: { Authorization: Authentication.bearerToken() } })
                dispatch.role.pagination(JSON.parse(response.headers['x-pagination']));
                dispatch.role.getAllRoles(response.data);
                dispatch.loader.isLoading(false);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error fetching data.'));
            }
        },
        async getAllRolesForSelectAsync() {
            try {
                dispatch.loader.isLoading(true);
                const response = await Axios.get(`${API.BaseURL}/Roles`, { headers: { Authorization: Authentication.bearerToken() } })
                dispatch.role.getAllRolesForSelect(response.data);
                dispatch.loader.isLoading(false);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error fetching data.'));
            }
        },
        async getAllUsersByRoleIdAsync(roleId) {
            try {
                dispatch.loader.isLoading(true);
                const response = await Axios.get(`${API.BaseURL}/Roles/${roleId}/Users`, { headers: { Authorization: Authentication.bearerToken() } })
                dispatch.role.getAllUsersByRoleId(response.data);
                dispatch.loader.isLoading(false);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error fetching data.'));
            }
        },
        async createRoleAsync(roleName) {
            try {
                dispatch.loader.isLoading(true);
                const response = await Axios.post(`${API.BaseURL}/Roles`, roleName, { headers: { Authorization: Authentication.bearerToken() } })
                dispatch.loader.isLoading(false);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error adding role.'));
            }
        },
        async deleteRoleAsync(roleId) {
            try {
                dispatch.loader.isLoading(true);
                await Axios.delete(`${API.BaseURL}/Roles/${roleId}`, { headers: { Authorization: Authentication.bearerToken() } })
                dispatch.loader.isLoading(false);
            } catch (error) {
                return Promise.reject(new Error('Error deleting role.' + error.message));
            }
        }
    }),
}