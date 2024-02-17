import ProductRegistrationCSS from './ProductRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callProductRegistAPI
} from '../../apis/ProductAPICalls';

function ProductRegistration() {


    const dispatch = useDispatch();
    const params = useParams();
    const product  = useSelector(state => state.productReducer);

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        productName: '',
        productPrice: 0,
        productOrderable: '',
        categoryCode: '',
        productStock: 0, 
        productDescription: '',

    });

    useEffect(() => {
        // 이미지 업로드시 미리보기 세팅
        if(image){
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if( result ){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);


    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    }


    // form 데이터 세팅    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const onClickProductRegistrationHandler = () => {

        console.log('[ProductRegistration] onClickProductRegistrationHandler');

        const formData = new FormData();

        formData.append("productName", form.productName);
        formData.append("productPrice", form.productPrice);
        formData.append("productOrderable", form.productOrderable);
        formData.append("categoryCode", form.categoryCode);
        formData.append("productStock", form.productStock);
        formData.append("productDescription", form.productDescription);

        if(image){
            formData.append("productImage", image);
        }
        // console.log('[ProductRegistration] formData : ', formData.get("productName"));
        // console.log('[ProductRegistration] formData : ', formData.get("productPrice"));
        // console.log('[ProductRegistration] formData : ', formData.get("productOrderable"));
        // console.log('[ProductRegistration] formData : ', formData.get("categoryCode"));
        // console.log('[ProductRegistration] formData : ', formData.get("productStock"));
        // console.log('[ProductRegistration] formData : ', formData.get("productDescription"));
        // console.log('[ProductRegistration] formData : ', formData.get("productImageUrl"));

        dispatch(callProductRegistAPI({	// 상품 상세 정보 조회
            form: formData
        }));        
        
        
        alert('상품 리스트로 이동합니다.');
        navigate('/product-management', { replace: true });
        window.location.reload();
    }
    

    return (
        <div>
            <div className={ ProductRegistrationCSS.productButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                <button       
                    onClick={ onClickProductRegistrationHandler }             
                >
                    상품 등록
                </button>
            </div>        
            <div className={ ProductRegistrationCSS.productSection }>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <div className={ ProductRegistrationCSS.productImageDiv }>
                        { imageUrl && <img 
                            className={ ProductRegistrationCSS.productImage } 
                            src={ imageUrl } 
                            alt="preview"
                        />}
                        <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='productImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button 
                            className={ ProductRegistrationCSS.productImageButton }
                            onClick={ onClickImageUpload } 
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>상품이름</label></td>
                                <td>
                                    <input 
                                        name='productName'
                                        placeholder='상품 이름'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품가격</label></td>
                                <td>
                                    <input 
                                        name='productPrice'
                                        placeholder='상품 가격'
                                        type='number'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>활성화 여부</label></td>
                                <td>
                                    <label><input type="radio" name="productOrderable"  onChange={ onChangeHandler } value="Y"/> Y</label> &nbsp;
                                    <label><input type="radio" name="productOrderable"  onChange={ onChangeHandler } value="N"/> N</label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품 종류</label></td>
                                <td>
                                    {/* categoryCode = 1:식사, 2:디저트, 3:음료 */}
                                    <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } value="1"/> 식사</label> &nbsp;
                                    <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } value="2"/> 디저트</label> &nbsp;
                                    <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } value="3"/> 음료</label>
                                </td>
                            </tr> 
                            <tr>
                                <td><label>상품 재고</label></td>
                                <td>
                                <input 
                                        placeholder='상품 재고'
                                        type='number'
                                        name='productStock'
                                        onChange={ onChangeHandler }
                                        className={ ProductRegistrationCSS.productInfoInput }
                                    />
                                </td>
                            </tr> 
                            <tr>
                                <td><label>상품 설명</label></td>
                                <td>
                                    <textarea 
                                        className={ ProductRegistrationCSS.textAreaStyle }
                                        name='productDescription'
                                        onChange={ onChangeHandler }
                                    ></textarea>
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductRegistration;