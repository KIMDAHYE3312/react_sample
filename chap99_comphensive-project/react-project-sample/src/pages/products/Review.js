import ReviewCSS from './Review.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { callReviewsAPI } from '../../apis/ReviewAPICalls';

function Review() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const reviews = useSelector((state) => state.reviewReducer);
    const reviewList = reviews.data;

    console.log('reviewList', reviewList);

    const pageInfo = reviews.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(
            callReviewsAPI({
                productCode: params.productCode,
                currentPage: currentPage,
            })
        );
    }, [currentPage]);

    const onClickTableTr = (reviewCode) => {
        navigate(`/reviewDetail/${reviewCode}`, { replace: false });
    };

    return (
        <>
            <div className={ReviewCSS.reviewTableDiv}>
                <table className={ReviewCSS.reviewTableCss}>
                    <colgroup>
                        <col width='10%' />
                        <col width='50%' />
                        <col width='20%' />
                        <col width='20%' />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>리뷰 제목</th>
                            <th>리뷰 작성일</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(reviewList) && reviewList.length > 0 ?
                            reviewList.map((review) => (
                                <tr key={review.reviewCode} onClick={() => onClickTableTr(review.reviewCode)}>
                                    <td>{review.reviewCode}</td>
                                    <td>{review.reviewTitle}</td>
                                    <td>{review.reviewCreateDate}</td>
                                    <td>{review.member.memberName}</td>
                                </tr>
                            ))
                            :
                            (
                                <tr>
                                    <td colSpan='4'>조회된 내용이 없습니다.</td>
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
            <div style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}>
                {Array.isArray(reviewList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={ReviewCSS.pagingBtn}
                    >
                        &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={currentPage === num ? { backgroundColor: 'orange' } : null}
                            className={ReviewCSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(reviewList) && (
                    <button
                        className={ReviewCSS.pagingBtn}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
                    >
                        &gt;
                    </button>
                )}
            </div>
        </>
    );
}

export default Review;
