import Product from '../../components/products/Product';
import MainCSS from './Main.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { callProductListAPI } from '../../apis/ProductAPICalls';
import { GET_PRODUCTS } from '../../modules/ProductModule';

function Main() {
    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer);
    const productList = products.data?.content;

    const pageInfo = products.pageInfo;

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
            callProductListAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);

    return (
        <>
            <div className={MainCSS.productDiv}>
                {Array.isArray(productList) &&
                    productList.map((product) => <Product key={product.productCode} product={product} />)}
            </div>
            <div style={{ listStyleType: 'none', display: 'flex' }}>
                {Array.isArray(productList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={MainCSS.pagingBtn}
                    >
                        &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={currentPage === num ? { backgroundColor: 'orange' } : null}
                            className={MainCSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(productList) && (
                    <button
                        className={MainCSS.pagingBtn}
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

export default Main;
