import Axios from "axios";
import { API } from '../config';
import Authentication from '../lib/Authentication';
// import Lazy from 'lazy.js';

export default {
    state: [],
    reducers: {
        addFile: (state, data) => {
            return data;
        }
    },
    effects: dispatch => ({
        async addFileAsync(file) {
            try {
                const response = await Axios.post(`${API.BaseURL}/File`, file, { headers: { Authorization: Authentication.bearerToken() } })
                dispatch.file.addFile(response.data);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error adding Files.'));
            }
        },
        async deleteFileAsync(fileId) {
            try {
                await Axios.delete(`${API.BaseURL}/File/${fileId}`, { headers: { Authorization: Authentication.bearerToken() } })
            } catch (error) {
                return Promise.reject(new Error('Error adding Files.' + error.message));
            }
        }
    }),
}