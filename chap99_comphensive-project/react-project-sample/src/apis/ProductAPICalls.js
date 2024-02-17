import {
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCTS_MEAL,
    GET_PRODUCTS_DESSERT,
    GET_PRODUCTS_BEVERAGE,
    POST_PRODUCT,
    PUT_PRODUCT,
} from '../modules/ProductModule.js';

export const callSearchProductAPI = ({ search }) => {
    console.log('[ProduceAPICalls] callSearchProductAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products/search?s=${search}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());

        console.log('[ProduceAPICalls] callSearchProductAPI RESULT : ', result);

        dispatch({ type: GET_PRODUCTS, payload: result.data });
    };
};

export const callProductRegistAPI = ({ form }) => {
    console.log('[ProduceAPICalls] callProductRegistAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

        console.log('[ProduceAPICalls] callProductRegistAPI RESULT : ', result);

        dispatch({ type: POST_PRODUCT, payload: result });
    };
};

export const callProductUpdateAPI = ({ form }) => {
    console.log('[ProduceAPICalls] callProductUpdateAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

        console.log('[ProduceAPICalls] callProductUpdateAPI RESULT : ', result);

        dispatch({ type: PUT_PRODUCT, payload: result });
    };
};

export const callProductDetailForAdminAPI = ({ productCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products-management/${productCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[ProduceAPICalls] callProductDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[ProduceAPICalls] callProductDetailAPI SUCCESS');
            dispatch({ type: GET_PRODUCT, payload: result.data.data.content });
        }
    };
};

export const callProductDetailAPI = ({ productCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products/${productCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());

        console.log('[ProduceAPICalls] callProductDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[ProduceAPICalls] callProductDetailAPI SUCCESS');
            dispatch({ type: GET_PRODUCT, payload: result.data });
        }
    };
};

export const callProductListForAdminAPI = ({ currentPage }) => {
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products-management?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products-management`;
    }

    console.log('[ProduceAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        if (result.status === 200) {
            console.log('[ProduceAPICalls] callProductListForAdminAPI RESULT : ', result);
            dispatch({ type: GET_PRODUCTS, payload: result.data });
        }
    };
};

export const callProductListAPI = ({ currentPage }) => {
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products`;
    }

    console.log('[ProduceAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());
        if (result.status === 200) {
            console.log('[ProduceAPICalls] callProductAPI RESULT : ', result);
            dispatch({ type: GET_PRODUCTS, payload: result.data });
        }
    };
};

export const callProductListAboutMealAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products/meals`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());
        if (result.status === 200) {
            console.log('[ProduceAPICalls] callProductListAboutMeal RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_MEAL, payload: result.data });
        }
    };
};

export const callProductListAboutDessertAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products/dessert`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());
        if (result.status === 200) {
            console.log('[ProduceAPICalls] callProductListAboutDessert RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_DESSERT, payload: result.data });
        }
    };
};

export const callProductListAboutBeverageAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/v1/products/beverage`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
        }).then((response) => response.json());
        if (result.status === 200) {
            console.log('[ProduceAPICalls] callProductListAboutBeverage RESULT : ', result);
            dispatch({ type: GET_PRODUCTS_BEVERAGE, payload: result.data });
        }
    };
};
