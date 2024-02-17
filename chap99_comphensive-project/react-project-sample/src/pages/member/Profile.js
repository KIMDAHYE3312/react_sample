import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callGetMemberAPI
} from '../../apis/MemberAPICalls'

function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   
    const memberDetail = member.data;

    const onClickBackHandler = () => {
        // 돌아가기 클릭시 메인 페이지로 이동
        navigate(-1);
    }

    useEffect(
        () => {    
            console.log('token', token.sub);
            
            if(token !== null) {
                dispatch(callGetMemberAPI({	// 구매 정보 조회
                    memberId: token.sub
                }));            
            }
        }
        ,[]
    );

    return (
        <div 
            className={ RegisterCSS.backgroundDiv}
            style={ { backgroundColor: 'white' } }
        >

            { memberDetail &&
            <div className={ RegisterCSS.registerDiv }>
                <h1>내 정보</h1>
                <input 
                    type="text" 
                    placeholder="아이디" 
                    readOnly={true}
                    value={memberDetail.memberId || ''}
                />
                <input 
                    type="text" 
                    placeholder="이름" 
                    readOnly={true}
                    value={memberDetail.memberName || ''}
                />
                <input 
                    type="text" 
                    placeholder="이메일" 
                    readOnly={true}
                    value={memberDetail.memberEmail || ''}
                />
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>

            }
        </div>
    );
}

export default Profile;