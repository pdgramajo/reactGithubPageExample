import Api from '../lib/Api';

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

                const params = {
                    PageNumber: page ? page : 1,
                    PageSize: 4
                }
                const response = await Api.get('Roles', params);

                dispatch.role.pagination(JSON.parse(response.headers['x-pagination']));
                dispatch.role.getAllRoles(response.data);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error fetching data.'));
            }
            finally {
                dispatch.loader.isLoading(false);
            }
        },
        async getAllRolesForSelectAsync() {
            try {
                dispatch.loader.isLoading(true);
                const response = await Api.get('Roles');
                dispatch.role.getAllRolesForSelect(response.data);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error fetching data.'));
            }
            finally {
                dispatch.loader.isLoading(false);
            }
        },
        async getAllUsersByRoleIdAsync(roleId) {
            try {
                dispatch.loader.isLoading(true);
                const response = await Api.get(`Roles/${roleId}/Users`)
                dispatch.role.getAllUsersByRoleId(response.data);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error fetching data.'));
            }
            finally {
                dispatch.loader.isLoading(false);
            }
        },
        async createRoleAsync(roleName) {
            try {
                dispatch.loader.isLoading(true);
                const response = await Api.post('Roles', roleName);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error adding role.'));
            }
            finally {
                dispatch.loader.isLoading(false);
            }
        },
        async deleteRoleAsync(roleId) {
            try {
                dispatch.loader.isLoading(true);
                await Api.delete(`Roles/${roleId}`);
            } catch (error) {
                return Promise.reject(new Error('Error deleting role.' + error.message));
            }
            finally {
                dispatch.loader.isLoading(false);
            }
        }
    }),
}