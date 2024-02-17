import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_PURCHASE      = 'purchase/GET_PURCHASE';
export const POST_PURCHASE     = 'purchase/POST_PURCHASE';

const actions = createActions({
    [GET_PURCHASE]: () => {},
    [POST_PURCHASE]: () => {}
});

/* 리듀서 */
const purchaseReducer = handleActions(
    {
        [GET_PURCHASE]: (state, { payload }) => {
            
            return payload;
        }
    },
    {
        [POST_PURCHASE]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default purchaseReducer;