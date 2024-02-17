import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import reviewReducer from './ReviewModule';
import productReducer from './ProductModule';
import purchaseReducer from './PurchaseModule';

const rootReducer = combineReducers({
    memberReducer,
    reviewReducer,
    productReducer,
    purchaseReducer
});

export default rootReducer;
