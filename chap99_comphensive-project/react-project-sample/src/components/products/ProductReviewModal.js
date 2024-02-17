import ProductReviewModalCSS from './ProductReviewModal.module.css';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
    callReviewWriteAPI
} from '../../apis/ReviewAPICalls';

function ProductReviewModal({memberCode, productCode, setProductReviewModal}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        productCode: productCode,
        memberCode: memberCode,
        reviewTitle: '',
        reviewContent: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickProductReviewHandler = () => {        
        console.log('[ProductReviewModal] onClickProductReviewHandler Start!!');        
                
        dispatch(callReviewWriteAPI({	// 리뷰 작성
            form: form
        }));

        setProductReviewModal(false);

        alert('리뷰 등록이 완료되었습니다.');

        navigate(`/review/${productCode}`, { replace: true});
        window.location.reload();

        console.log('[ProductReviewModal] onClickProductReviewHandler End!!');

    }


    return (        
        <div className={ProductReviewModalCSS.modal}>
            <div className={ ProductReviewModalCSS.modalContainer }>
                <div className={ ProductReviewModalCSS.productReviewModalDiv }>
                    <h1>리뷰</h1>
                    <input 
                        type="text" 
                        name='reviewTitle'
                        placeholder="리뷰 제목" 
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                    <textarea
                        placeholder="리뷰 본문" 
                        name='reviewContent'
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    >
                    </textarea>
                    <button
                        onClick={ onClickProductReviewHandler }
                    >
                        리뷰 작성하기
                    </button>
                    <button
                        style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                        onClick={ () => setProductReviewModal(false) }
                    >
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductReviewModal;