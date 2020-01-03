import Axios from 'axios';
import { API } from '../config';
import Authentication from './Authentication';

export default class Api {
    static async get(url, params) {
        try {
            const config = {
                headers: { Authorization: Authentication.bearerToken() },
                params: params
            }
            const response = Axios.get(`${API.BaseURL}/${url}`, config);
            return response;
        } catch (error) {
            return error.toJSON()
        }
    }
    static async post(url, data) {
        try {
            const config = { headers: { Authorization: Authentication.bearerToken() } };
            const response = Axios.post(`${API.BaseURL}/${url}`, data, config);
            return response;
        } catch (error) {
            return error.toJSON()
        }
    }
    static async put(url, data) {
        try {
            const config = { headers: { Authorization: Authentication.bearerToken() } };
            const response = Axios.put(`${API.BaseURL}/${url}`, data, config);
            return response;
        } catch (error) {
            return error.toJSON()
        }
    }
    static async delete(url, data) {
        try {
            const config = {
                headers: { Authorization: Authentication.bearerToken() },
                data: data
            }
            const response = Axios.delete(`${API.BaseURL}/${url}`, config);
            return response;
        } catch (error) {
            return error.toJSON()
        }
    }
}
