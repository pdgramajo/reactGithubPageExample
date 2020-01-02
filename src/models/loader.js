export default {
    state: {
        loading: false
    },
    reducers: {
        isLoading: (state, data) => {
            return {
                ...state,
                loading: data
            }
        }
    },
}