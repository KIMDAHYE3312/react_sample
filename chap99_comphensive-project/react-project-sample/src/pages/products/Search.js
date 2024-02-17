import MainCSS from './Main.module.css';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import Product from "../../components/products/Product";

import {
    callSearchProductAPI
} from '../../apis/ProductAPICalls';

function Search() {

    const { search } = useLocation();
    const { value } = queryString.parse(search);

    const products = useSelector(state => state.productReducer); 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(callSearchProductAPI({
            search: value
        }));        
    },
    []);

    return (
        <div className={ MainCSS.productDiv }>
            { 
               products.length > 0 && products.map((product) => (<Product key={ product.productCode } product={ product } />))
            }
        </div>
    );
}

export default Search;