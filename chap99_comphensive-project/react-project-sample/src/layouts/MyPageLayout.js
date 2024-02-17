import { Outlet, useNavigate } from 'react-router-dom';
import MyPageLayoutCSS from './MyPageLayout.module.css';
import MyPageNavbar from '../components/common/MyPageNavbar';
import { useEffect } from 'react';

function MyPageLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/mypage/payment', { replace: false });
    }, []);

    return (
        <>
            <div className={MyPageLayoutCSS.myPageLayoutDiv}>
                <MyPageNavbar />
                <main className={MyPageLayoutCSS.main}>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default MyPageLayout;
