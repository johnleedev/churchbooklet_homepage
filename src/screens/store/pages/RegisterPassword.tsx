import React, { useEffect, useState } from 'react';
import '../Store.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuTemplate from '../MenuTemplate';
import axios from 'axios';
import MainURL from '../../../MainURL';
import DateFormmating from '../../../components/DateFormmating';

export default function RegisterPassword() {

  let navigate = useNavigate();
  const location = useLocation()
  const [currentMenu, setCurrentMenu] = useState(2);
  const paramsData = location.state.data;
  const [inputPassword, setInputPassword] = useState('');

  // 비밀번호 확인 후에, 입력 페이지로 넘어가기 
  const openPostInputs = async () => {
    if (paramsData.password === inputPassword) {
      alert('확인되었습니다.');
      window.scrollTo(0, 0);
      if (paramsData.sort === '독주회&독창회') {
        navigate('/store/mainsoloregister', {state : {data : paramsData, menuNum: 2}});
      } else if (paramsData.sort === '졸업연주회') {
        navigate('/store/maingraduatelist', {state : {data : paramsData, menuNum: 2}});
      }
    } else {
      alert('비밀번호가 다릅니다.')
    }
  };

  return (
    <div className='store'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} navigate={navigate} />
        <div className="subpage__main">
          <div className="subpage__main__title">
            <div className="subpage__main__title">
              <h3>전단지등록</h3>
            </div>
          </div>
          <div className="subpage__main__content">
            <div className="checkPasword">
              <p className='checkPasword-title'>{paramsData.title}</p>
              <p className='checkPasword-text'>비밀번호 확인</p>
              <input
                className="passwordinput"
                value={inputPassword}
                placeholder='비밀번호를 입력하세요'
                onChange={(e)=>{setInputPassword(e.target.value)}}
                onKeyDown={(e)=>{if (e.key === 'Enter') {openPostInputs();}}}
              />
              <div className="password-btn-row">
                <div className="password-btn"
                  onClick={()=>{
                    openPostInputs()
                  }}
                >
                  확인
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}



