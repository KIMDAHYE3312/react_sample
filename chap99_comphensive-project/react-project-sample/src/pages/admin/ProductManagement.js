import ProductManagementCSS from './ProductManagement.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from "react";

import{
    callProductListForAdminAPI
} from '../../apis/ProductAPICalls'

function ProductManagement() {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products  = useSelector(state => state.productReducer);      
    const productList = products.data;
    console.log('productManagement', productList);

    const pageInfo = products.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            setStart((currentPage - 1) * 5);            
            dispatch(callProductListForAdminAPI({
                currentPage: currentPage
            }));            
        }
        ,[currentPage]
    );

    const onClickProductInsert = () => {
        console.log('[ProductManagement] onClickProductInsert');
        navigate("/product-registration", { replace: false })
    }

    const onClickTableTr = (productCode) => {
        navigate(`/product-update/${productCode}`, { replace: false });
    }

    return (
        <>
        <div className={ ProductManagementCSS.bodyDiv }>
            <div className={ ProductManagementCSS.buttonDiv }>
                <button
                    onClick={ onClickProductInsert }
                >
                    상품 등록
                </button>
            </div>            
            <table className={ ProductManagementCSS.productTable }>
                <colgroup>
                    <col width="5%" />
                    <col width="50%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품이름</th>
                        <th>상품가격</th>
                        <th>활성화여부</th>
                        <th>상품 카테고리</th>
                        <th>재고</th>
                    </tr>
                </thead>
                <tbody>
                    { Array.isArray(productList) && productList.map((p) => (
                        <tr
                            key={ p.productCode }
                            onClick={ () => onClickTableTr(p.productCode) }
                        >
                            <td>{ p.productCode }</td>
                            <td>{ p.productName }</td>
                            <td>{ p.productPrice }</td>
                            <td>{ p.productOrderable }</td>
                            <td>{ p.categoryName }</td>
                            <td>{ p.productStock }</td>
                        </tr>
                    )) 
                    }
                </tbody>                    
            </table>         
            
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { Array.isArray(productList) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={ ProductManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    className={ ProductManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { Array.isArray(productList) &&
            <button 
                className={ ProductManagementCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
            >
                &gt;
            </button>
            }
        </div>
        </>
    );
}

export default ProductManagement;