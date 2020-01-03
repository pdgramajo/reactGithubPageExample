import Api from '../lib/Api';

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
                const response = await Api.post('File', file);
                dispatch.file.addFile(response.data);
                return Promise.resolve(response.data);
            } catch (error) {
                return Promise.reject(new Error('Error adding Files.'));
            }
        },
        async deleteFileAsync(fileId) {
            try {
                await Api.delete(`File/${fileId}`);
            } catch (error) {
                return Promise.reject(new Error('Error adding Files.' + error.message));
            }
        }
    }),
}