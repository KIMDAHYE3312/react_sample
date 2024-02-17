import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_REVIEW     = 'review/GET_REVIEW';
export const GET_REVIEWS    = 'review/GET_REVIEWS';
export const POST_REVIEW    = 'review/POST_REVIEW';
export const PUT_REVIEW     = 'review/PUT_REVIEW';

const actions = createActions({
    [GET_REVIEW]: () => {},
    [GET_REVIEWS]: () => {},
    [POST_REVIEW]: () => {},
    [PUT_REVIEW]: () => {}
});

/* 리듀서 */
const reviewReducer = handleActions(
    {
        [GET_REVIEW]: (state, { payload }) => {
            
            return payload;
        },
        [GET_REVIEWS]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REVIEW]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_REVIEW]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default reviewReducer;