import ProductCSS from './Product.module.css';
import { useNavigate } from 'react-router-dom';

function Product({ product : {productCode, productImageUrl, productName, productPrice}}) {

    const navigate = useNavigate();

    const onClickProductHandler = (productCode) => {
        navigate(`/product/${productCode}`, { replace: false });
    }

    return (
        <div 
            className={ ProductCSS.productDiv }
            onClick={ () => onClickProductHandler(productCode) }
        >
            <img src={ productImageUrl } alt="테스트" />
            <h5>{ productName }</h5>
            <h5>{ productPrice }</h5>
        </div>
    );
}

export default Product;