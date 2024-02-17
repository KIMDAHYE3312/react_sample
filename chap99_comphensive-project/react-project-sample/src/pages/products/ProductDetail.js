import ProductDetailCSS from './ProductDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callProductDetailAPI
} from '../../apis/ProductAPICalls';
import LoginModal from '../../components/common/LoginModal';

function ProductDetail() {    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const product  = useSelector(state => state.productReducer);  

    const [amount, setAmount] = useState(1);
    const [loginModal, setLoginModal] = useState(false);

    
    useEffect(
        () => {
            dispatch(callProductDetailAPI({	// 상품 상세 정보 조회
                productCode: params.productCode
            }));            
        }
        ,[]
    );

    const onClickReviewHandler = () => {
        navigate(`/review/${params.productCode}`, { replace: false });
    };

    const onChangeAmountHandler = (e) => {
        setAmount(e.target.value);
    }

    const onClickPurchaseHandler = () => {

        // 로그인 상태인지 확인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[onClickPurchaseHandler] token : ', token);

        if(token === undefined || token === null) {
            alert('로그인을 먼저해주세요');
            setLoginModal(true);
            return ;
        }

        // 토큰이 만료되었을때 다시 로그인
        if (token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }


        // 구매 가능 수량 확인
        if(amount > product.productStock) {
            alert('구매 가능 수량을 확인해주세요');
            return ;
        }


        navigate(`/purchase?amount=${amount}`, { replace: false });
    }

    return (
        <div>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}
            <div className={ ProductDetailCSS.DetailDiv }>
                <div className={ ProductDetailCSS.imgDiv }>
                    <img src={ product.productImageUrl } alt="테스트" />
                    <button
                        className={ ProductDetailCSS.reviewBtn }
                        onClick={ onClickReviewHandler }
                    >
                        리뷰보기
                    </button>
                </div>
                <div className={ ProductDetailCSS.descriptionDiv }>
                    <table className={ ProductDetailCSS.descriptionTable}>
                        <tbody>
                            <tr>
                                <th>상품 코드</th>    
                                <td>{ product.productCode || '' }</td>
                            </tr>
                            <tr>
                                <th>상품명</th>    
                                <td>{ product.productName || '' }</td>
                            </tr>    
                            <tr>
                                <th>상품 가격</th>    
                                <td>{ product.productPrice || '' }</td>
                            </tr>    
                            <tr>
                                <th>상품 설명</th>    
                                <td>{ product.productDescription || '' }</td>
                            </tr>    
                            <tr>
                                <th>구매 가능 수량</th>    
                                <td>{ product.productStock || '' }</td>
                            </tr>    
                            <tr>
                                <th>구매 수량</th>    
                                <td>
                                    <input 
                                        type='number'
                                        value={ amount } 
                                        onChange = { onChangeAmountHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>                            
                                <td colSpan={ 2 }>
                                    <button
                                        className={ ProductDetailCSS.productBuyBtn }
                                        onClick= { onClickPurchaseHandler }
                                    >
                                        구매하기
                                    </button>
                                </td>
                            </tr>    
                        </tbody>                    
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;