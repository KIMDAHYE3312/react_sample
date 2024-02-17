import { NavLink } from 'react-router-dom';
import MyPageNavbarCSS from './MyPageNavbar.module.css';
import { Navigate } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function MyPageNavbar() {

    const token = decodeJwt(window.localStorage.getItem("accessToken"));     

    if(token === undefined || token === null || token.exp * 1000 < Date.now()) {        
        return <Navigate to="/" />;
    }

    return (
        <div className={ MyPageNavbarCSS.MyPageNavbarDiv }>
            <ul className={ MyPageNavbarCSS.MyPageNavbarUl }>
                <li><NavLink to="/mypage/payment">결제 정보</NavLink></li>
                <li><NavLink to="/mypage/profile">회원 정보</NavLink></li>
            </ul>
        </div>
    );
}

export default MyPageNavbar;