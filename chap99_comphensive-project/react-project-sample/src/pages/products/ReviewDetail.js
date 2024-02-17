import ReviewDetailCSS from './ReviewDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';


import{
    callReviewDetailAPI,
    callReviewUpdateAPI
} from '../../apis/ReviewAPICalls'

function ReviewDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const review  = useSelector(state => state.reviewReducer);  
    const reviewDetail = review.data
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    const [modifyMode, setModifyMode] = useState(false);    
    const [form, setForm] = useState({});

    useEffect(        
        () => {
            console.log('[ReviewDetail] ReviewCode : ', params.reviewCode);

            dispatch(callReviewDetailAPI({	// 리뷰코드로 리뷰 조회 API 실행
                reviewCode: params.reviewCode
            }));            
        }
        ,[]
    );

     // form 데이터 세팅    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            reviewCode: reviewDetail.reviewCode,
            reviewTitle: reviewDetail.reviewTitle,
            reviewContent: reviewDetail.reviewContent
        });
    }

    const onClickReviewUpdateHandler = () => {        

        dispatch(callReviewUpdateAPI({	// 리뷰 정보 업데이트
            form: form
        }));         

        navigate(`/review/${reviewDetail.productCode}`, { replace: true});
        window.location.reload();
    }    


    return (
        <>
            { reviewDetail &&
            <div className={ ReviewDetailCSS.reviewDetailtableDiv }>
                <table className={ ReviewDetailCSS.reviewDetailtableCss }>
                <colgroup>
                        <col width="20%" />
                        <col width="80%" />
                    </colgroup>
                    <tbody>            
                        <tr>
                            <th>제목</th>
                            <td>
                                <input 
                                    className={ ReviewDetailCSS.ReviewDetailInput }
                                    name='reviewTitle'
                                    placeholder='제목'
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? reviewDetail.reviewTitle : form.reviewTitle) || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input 
                                    className={ ReviewDetailCSS.ReviewDetailInput }
                                    placeholder='작성자'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ reviewDetail.member && reviewDetail.member.memberName || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>작성일</th>
                            <td>
                                <input 
                                    className={ ReviewDetailCSS.ReviewDetailInput }
                                    placeholder='작성일'
                                    readOnly={true}
                                    style={ { backgroundColor: 'gray'} }
                                    value={ reviewDetail && reviewDetail.reviewCreateDate || ''}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <textarea
                                    name='reviewContent'
                                    className={ ReviewDetailCSS.contentTextArea }
                                    readOnly={modifyMode ? false : true}
                                    style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? reviewDetail.reviewContent : form.reviewContent) || ''}
                                >                                    
                                </textarea>
                            </td>
                        </tr>
                    </tbody>                    
                </table>            
            </div>
            }
            { reviewDetail && 
                <div className={ ReviewDetailCSS.buttonDivCss }>
                    <button
                        className={ ReviewDetailCSS.backBtn }
                        onClick={ () => navigate(-1) }
                    >
                        돌아가기
                    </button>
                    
                    { (token && reviewDetail.member) &&
                        (token.sub === reviewDetail.member.memberId) 
                        ?                 
                            <div>{!modifyMode &&
                                <button       
                                    className={ ReviewDetailCSS.backBtn }
                                    onClick={ onClickModifyModeHandler }             
                                >
                                    수정모드
                                </button>
                            }
                            {modifyMode &&
                                <button       
                                    className={ ReviewDetailCSS.backBtn }
                                    onClick={ onClickReviewUpdateHandler }             
                                >
                                    리뷰 수정 저장하기
                                </button>
                            }
                            </div>
                        : null
                    }

                </div>
            }
        </>
    );
}

export default ReviewDetail;