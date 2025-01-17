
import './Admin.scss'; 
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL'; 
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function AdminLogin( props: any) {

  const [cookies, setCookie, removeCookie] = useCookies(['login']);

  let navigate = useNavigate();

  let [이름, set이름] = useState('');
  let [비번, set비번] = useState('');

  const login = () => {
    axios.post(`${MainURL}/login/loginadmin`, {
      username : 이름, password : 비번
    }).then((res)=>{
      if (res.data) {
        alert('관리자 로그인 되었습니다.')
        navigate('/admin/main');
      } else {
        alert('아이디,비번이 잘못되었습니다. 다시 시도하세요.')
      } 
    })
    .catch((error)=>{console.log(error)})
  }

  return (
    <div className="AdminContainer">
      
      <div  className="AdminContent">

        <div className='admin_input_wrapper'>
          <div className='admin_box'>
            <div className='admin_content_text'>아이디</div>
            <input className='admin_content_input' type='text' onChange={(e)=>{set이름(e.target.value)}}></input>
          </div>

          <div className='admin_box'>
            <div className='admin_content_text'>비밀번호</div>
            <input className='admin_content_input' type='password' 
              onChange={(e)=>{set비번(e.target.value)}}
              onKeyDown={(e)=>{if (e.key === 'Enter') {login();}}}
            ></input>
          </div>

        </div>

        <button className='login_button' 
            onClick={login}>로그인</button>

        <button className='login_button' 
            onClick={()=>{navigate('/')}}>뒤로가기</button>
      
      </div>
     
      {/* footer */}
      <section className="footer">
      <div className="inner">
          <Footer></Footer>
      </div>
      </section>
    </div>
  );
}
