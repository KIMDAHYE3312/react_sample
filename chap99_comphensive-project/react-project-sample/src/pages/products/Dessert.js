import Product from "../../components/products/Product";
import MainCSS from './Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callProductListAboutDessertAPI
} from '../../apis/ProductAPICalls'
import { GET_PRODUCTS_DESSERT } from '../../modules/ProductModule';

function Dessert() {

    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const dessertList = useSelector(state => state.productReducer); 

    useEffect(
        () => {
            dispatch(callProductListAboutDessertAPI());            
        }
        ,[]
    );

    return (
        <div className={ MainCSS.productDiv }>
            { 
               dessertList.length > 0 && dessertList.map((dessert) => (<Product key={ dessert.productCode } product={ dessert } />))
            }
        </div>
    );
}

export default Dessert;