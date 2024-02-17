
import { 
    GET_REVIEW
  , GET_REVIEWS
  , POST_REVIEW
  , PUT_REVIEW
} from '../modules/ReviewModule';

export const callReviewDetailAPI = ({reviewCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/reviews/product/${reviewCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[ReviewAPICalls] callReviewDetailAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[ReviewAPICalls] callReviewDetailAPI SUCCESS');
            dispatch({ type: GET_REVIEW,  payload: result });
        }

        
    };
}

export const callReviewWriteAPI = ({form}) => {
    console.log('[ReviewAPICalls] callReviewWriteAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/reviews`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                productCode: form.productCode,
                memberCode: form.memberCode,
                reviewTitle: form.reviewTitle,
                reviewContent: form.reviewContent
            })
        })
        .then(response => response.json());

        console.log('[ReviewAPICalls] callReviewWriteAPI RESULT : ', result);

        dispatch({ type: POST_REVIEW,  payload: result });
        
    };    
}

export const callReviewUpdateAPI = ({form}) => {
    console.log('[ReviewAPICalls] callReviewUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/reviews`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                reviewCode: form.reviewCode,
                reviewTitle: form.reviewTitle,
                reviewContent: form.reviewContent
            })
        })
        .then(response => response.json());

        console.log('[ReviewAPICalls] callReviewUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_REVIEW,  payload: result });
        
    };    
}

export const callReviewsAPI = ({productCode, currentPage}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/reviews/${productCode}?offset=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        console.log('[ReviewAPICalls] callReviewsAPI RESULT : ', result);
        if(result.status === 200){
            console.log('[ReviewAPICalls] callReviewsAPI SUCCESS');
            dispatch({ type: GET_REVIEWS,  payload: result.data });
        }

        
    };
}