import PaymentCSS from './Payment.module.css';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callPurchaseListAPI
} from '../../apis/PurchaseAPICalls'
import purchaseReducer from '../../modules/PurchaseModule';
import ProductReviewModal from '../../components/products/ProductReviewModal';

function Payment() {

    const dispatch = useDispatch();
    const purchase = useSelector(state => state.purchaseReducer);  
    const purchaseList = purchase.data;
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    const [productReviewModal, setProductReviewModal] = useState(false);
    const [productCode, setProductCode] = useState(0);
    const [memberCode, setMemberCode] = useState(0);

    useEffect(
        () => {    
            if(token !== null) {
                dispatch(callPurchaseListAPI({	// 구매 정보 조회
                    memberId: token.sub
                }));            
            }
        }
        ,[]
    );
    
    const onClickReviewHandler = (productFromTable) => {
        setProductCode(productFromTable.product.productCode);
        setMemberCode(productFromTable.orderMember);
        setProductReviewModal(true);
    };

    return (
        <>
            { productReviewModal ? <ProductReviewModal memberCode={memberCode} productCode={productCode} setProductReviewModal={ setProductReviewModal }/> : null}
            <div className={ PaymentCSS.paymentDiv }>
                <table className={ PaymentCSS.paymentTable }>
                    <colgroup>
                        <col width="20%" />
                        <col width="40%" />
                        <col width="20%" />
                        <col width="20%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>주문일자</th>
                            <th>주문 상품 정보</th>
                            <th>상품금액(수량)</th>
                            <th>리뷰</th>
                        </tr>
                    </thead>
                    <tbody>
                        { purchaseList && purchaseList.map(
                            (purchase) => (
                                <tr
                                    key={ purchase.orderCode }
                                >
                                    <td>{ purchase.orderDate }</td>
                                    <td>{ purchase.product.productName }</td>                                
                                    <td>{ purchase.product.productPrice * purchase.orderAmount } ({purchase.orderAmount})</td>
                                    <td>
                                        <button
                                            className={ PaymentCSS.reviewWriteBtn }
                                            onClick={ () => onClickReviewHandler(purchase) }
                                        >
                                            리뷰 등록
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                        
                    </tbody>                    
                </table>            
            </div>
            {/* <div>
                1 2 3 4 5
            </div> */}
        </>
    );
}

export default Payment;