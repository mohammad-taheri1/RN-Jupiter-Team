const initialState = {
    loading: false,
    moreLoading: false,
    error: null,
    // moreError: null,
    data: [],
    isListEnd: false,
}
export const producReducer = (state = initialState, action) => {
    console.log({ action });
    switch (action.type) {
        case 'API_REQUEST':
            if (action.payload.page === 1) {
                return { ...state, loading: true }
            } else {
                return { ...state, moreLoading: true }
            }

        case 'API_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.data],
                error: '',
                loading: false,
                moreLoading: false
            }

        case 'API_FAILURE':
            return {
                ...state,
                error: action.error,
                loading: false,
                moreLoading: false
            }

        case 'API_LIST_END':
            return {
                ...state,
                isListEnd: true,
                loading: false,
                moreLoading: false
            }

        default: return state;
    }
}