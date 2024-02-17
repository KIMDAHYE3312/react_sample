import { 
    GET_PURCHASE,
    POST_PURCHASE
} from '../modules/PurchaseModule';

export const callPurchaseListAPI = ({memberId}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/purchase/${memberId}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[PurchaseAPICalls] callPurchaseListAPI RESULT : ', result);

        dispatch({ type: GET_PURCHASE,  payload: result });
        
    };
}



export const callPurchaseAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/purchase`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                productCode : form.productCode,                
                memberId : form.orderMemberId,
                orderPhone : form.orderPhone,
                orderEmail : form.orderEmail,
                orderReceiver : form.orderReceiver,
                orderAddress : form.orderAddress,
                orderAmount : form.orderAmount  
            })
        })
        .then(response => response.json());

        console.log('[PurchaseAPICalls] callPurchaseAPI RESULT : ', result);

        dispatch({ type: POST_PURCHASE,  payload: result });
        
    };
}