import ProductRegistrationCSS from './ProductRegistration.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callProductDetailForAdminAPI,
    callProductUpdateAPI
} from '../../apis/ProductAPICalls';

function ProductUpdate() {


    const dispatch = useDispatch();
    const params = useParams();
    const productDetail  = useSelector(state => state.productReducer);  
    
    console.log('productDetail', productDetail);
    
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [modifyMode, setModifyMode] = useState(false);
    const imageInput = useRef();
    const navigate = useNavigate();

    const [form, setForm] = useState({});


    useEffect(        
        () => {
            console.log('[ProductUpdate] productCode : ', params.productCode);

            dispatch(callProductDetailForAdminAPI({	
                productCode: params.productCode
            }));                     
        }
    ,[]);

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
        console.log(e.target.files[0]);
        const image = e.target.files[0];

        setImage(image);
    };

    const onClickImageUpload = () => {
        if(modifyMode){
            imageInput.current.click();
        }
    }
    
    const onClickModifyModeHandler = () => {    // 수정모드
        setModifyMode(true);
        setForm({
            productCode: productDetail.productCode,
            productName: productDetail.productName,
            productPrice: productDetail.productPrice,
            productOrderable: productDetail.productOrderable,
            categoryCode: productDetail.categoryCode,
            productStock: productDetail.productStock,
            productDescription: productDetail.productDescription
        });
    }

    // form 데이터 세팅    
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickProductUpdateHandler = () => {

        console.log('[ProductUpdate] onClickProductUpdateHandler');

        const formData = new FormData();
        formData.append("productCode", form.productCode);
        formData.append("productName", form.productName);
        formData.append("productPrice", form.productPrice);
        formData.append("productOrderable", form.productOrderable);
        formData.append("categoryCode", form.categoryCode);
        formData.append("productStock", form.productStock);
        formData.append("productDescription", form.productDescription);

        if(image){
            formData.append("productImage", image);
        }

        dispatch(callProductUpdateAPI({	// 상품 정보 업데이트
            form: formData
        }));         

        // navigate('/product-management', { replace: true});
        // window.location.reload();
    }

    
    
    return (
        <div>

            <div className={ ProductRegistrationCSS.productButtonDiv }>
                <button        
                    onClick={ () => navigate(-1) }            
                >
                    돌아가기
                </button>
                {!modifyMode &&
                    <button       
                        onClick={ onClickModifyModeHandler }             
                    >
                        수정모드
                    </button>
                }
                {modifyMode &&
                    <button       
                        onClick={ onClickProductUpdateHandler }             
                    >
                        상품 수정 저장하기
                    </button>
                }
            </div>        
            {productDetail &&

            <div className={ ProductRegistrationCSS.productSection }>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <div className={ ProductRegistrationCSS.productImageDiv }>
                        { productDetail && <img 
                            className={ ProductRegistrationCSS.productImage } 
                            src={ (imageUrl == null) ? productDetail.productImageUrl : imageUrl } 
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
                            style={ !modifyMode ? { backgroundColor: 'gray'} : null}
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
                                        value={ (!modifyMode ? productDetail.productName : form.productName) || ''}
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품가격</label></td>
                                <td>
                                    <input 
                                        name='productPrice'
                                        placeholder='상품 가격'
                                        value={(!modifyMode ? productDetail.productPrice : form.productPrice) || 0 }
                                        type='number'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    />
                                </td>
                            </tr>    
                            <tr>
                                <td><label>활성화 여부</label></td>
                                <td>
                                    <label><input type="radio" name="productOrderable"  onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.productOrderable : form.productOrderable) === 'Y' ? true : false } value="Y" /> Y</label> &nbsp;
                                    <label><input type="radio" name="productOrderable"  onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.productOrderable : form.productOrderable) === 'N' ? true : false } value="N" /> N</label>
                                </td>
                            </tr>    
                            <tr>
                                <td><label>상품 종류</label></td>
                                <td>
                                    {/* categoryCode = 1:식사, 2:디저트, 3:음료 */}
                                    <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.categoryCode : form.categoryCode) == 1 ? true : false } value={1}/> 식사</label> &nbsp;
                                    <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.categoryCode : form.categoryCode) == 2 ? true : false } value={2}/> 디저트</label> &nbsp;
                                    <label><input type="radio" name="categoryCode" onChange={ onChangeHandler } readOnly={ modifyMode ? false : true } checked={ (!modifyMode ? productDetail.categoryCode : form.categoryCode) == 3 ? true : false } value={3}/> 음료</label>
                                </td>                                
                            </tr> 
                            <tr>
                                <td><label>상품 재고</label></td>
                                <td>
                                <input 
                                        placeholder='상품 재고'
                                        type='number'
                                        name='productStock'
                                        value={ (!modifyMode ? productDetail.productStock : form.productStock) || 0 }
                                        onChange={ onChangeHandler }
                                        readOnly={ modifyMode ? false : true }
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
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
                                        readOnly={ modifyMode ? false : true }
                                        value={ (!modifyMode ? productDetail.productDescription : form.productDescription) || '' }
                                        style={ !modifyMode ? { backgroundColor: 'gray'} : null}
                                    ></textarea>
                                </td>
                            </tr> 
                        </tbody>                        
                    </table>
                </div>
            </div>
            }

        </div>
    );
}

export default ProductUpdate;