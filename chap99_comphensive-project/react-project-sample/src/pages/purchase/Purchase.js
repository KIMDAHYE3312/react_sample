import PurchaseCSS from './Purchase.module.css';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


import {
    callPurchaseAPI
} from '../../apis/PurchaseAPICalls'

function Purchase() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product  = useSelector(state => state.productReducer);  

    const { search } = useLocation();
    const { amount } = queryString.parse(search);

    const token = decodeJwt(window.localStorage.getItem("accessToken"));    

    // 폼 데이터 한번에 변경 및 State에 저장    
    const [form, setForm] = useState({
        productCode: product.productCode,        
        orderMemberId: token.sub,
        orderPhone: '',
        orderEmail: '',
        orderReceiver: '',
        orderAddress: '',        
        orderAmount: parseInt(amount)
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    if(product.length < 1){
        alert('잘못된 접근입니다');
        return <Navigate to="/"/>;
    }
       

    const onClickPurchaseHandler = () => {
        console.log('[Purchase] Purchase event Started!!');
        console.log('form', form);

        if(form.orderPhone === '' || form.orderEmail === '' 
            || form.orderReceiver === '' || form.orderAddress === ''){
                alert('정보를 다 입력해주세요.');
                return ;
        }

        dispatch(callPurchaseAPI({	
            form: form
        }));      
        
        alert('결제 정보 페이지로 이동합니다.');
        
        navigate("/mypage/payment", { replace: true });        

    };


    return (
        <div className={ PurchaseCSS.purchaseDiv }>
            <div className={ PurchaseCSS.purchasInfoDiv }>
                <h3>주문자 정보</h3>
                <input 
                    name='orderMemberId'
                    placeholder='주문자 아이디'
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    value= { token.sub || '' }
                    className={ PurchaseCSS.purchaseInput }
                />
                <input 
                    name='orderPhone'
                    placeholder='핸드폰번호'                    
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    className={ PurchaseCSS.purchaseInput }
                />
                <input 
                    placeholder='이메일주소'
                    name='orderEmail'                                     
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    className={ PurchaseCSS.purchaseInput }
                />
                <h3>배송 정보</h3>                
                <input 
                    placeholder='받는사람'
                    name='orderReceiver'                                     
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    className={ PurchaseCSS.purchaseInput }
                />
                <input 
                    placeholder='배송정보'
                    name='orderAddress'                                     
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    className={ PurchaseCSS.purchaseInput }
                />
            </div>
            <div className={ PurchaseCSS.purchasInfoDiv }>
                <h3>결제 정보</h3>
                <table>
                    <colgroup>
                        <col width="25%" />
                        <col width="75%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>상품명</th>
                            <td>{ product.productName }</td>
                        </tr>
                        <tr>
                            <th>상품갯수</th>
                            <td>{ amount }</td>
                        </tr>    
                        <tr>
                            <th>결제금액</th>
                            <td>{ amount * product.productPrice }</td>
                        </tr>    
                        <tr>
                            <td colSpan={ 2 }>
                                <button
                                    onClick={ onClickPurchaseHandler }
                                >
                                    구매하기
                                </button>
                            </td>
                        </tr>    
                    </tbody>                    
                </table>
            </div>
        </div>
    );
}

export default Purchase;