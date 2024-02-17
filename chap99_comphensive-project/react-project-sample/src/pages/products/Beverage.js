import Product from "../../components/products/Product";
import MainCSS from './Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callProductListAboutBeverageAPI
} from '../../apis/ProductAPICalls'
import { GET_PRODUCTS_DESSERT } from '../../modules/ProductModule';


function Beverage() {
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const beverageList = useSelector(state => state.productReducer); 

    useEffect(
        () => {
            dispatch(callProductListAboutBeverageAPI());            
        }
        ,[]
    );

    return (
        <div className={ MainCSS.productDiv }>
            { 
               beverageList.length > 0 && beverageList.map((beverage) => (<Product key={ beverage.productCode } product={ beverage } />))
            }
        </div>
    );
}

export default Beverage;