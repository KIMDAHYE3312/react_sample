import Product from "../../components/products/Product";
import MainCSS from './Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callProductListAboutMealAPI
} from '../../apis/ProductAPICalls'
import { GET_PRODUCTS_MEAL } from '../../modules/ProductModule';

function Meal() {

    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const mealList = useSelector(state => state.productReducer); 

    useEffect(
        () => {
            dispatch(callProductListAboutMealAPI());            
        }
        ,[]
    );


    return (
        <div className={ MainCSS.productDiv }>
            { 
               mealList.length > 0 && mealList.map((meal) => (<Product key={ meal.productCode } product={ meal } />))
            }
        </div>
    );
}

export default Meal;