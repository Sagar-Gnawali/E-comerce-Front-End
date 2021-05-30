const defaultState = {
    users: [],
    isLoaading: false
}
export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return {
                ...state
            }
    }
}
