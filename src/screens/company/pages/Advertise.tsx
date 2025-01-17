import React, { useState } from 'react'
import '../Company.scss';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
import { DropdownBox } from '../../../components/DropdownBox';
import axios from 'axios';
import MainURL from '../../../MainURL';
import MenuTemplate from '../MenuTemplate';


export default function Advertise (props:any) {

  let navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState(3);

  const [sort, setSort] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState('');
  const [userContact, setUserContact] = useState('');

  // 종류 선택 ----------------------------------------------
  const sortOptions = [
    { value: '선택', label: '선택' },
    { value: '설교자', label: '설교자' },
    { value: '찬양사역자', label: '찬양사역자' },
    { value: '기타', label: '기타' }
  ];

  // 글쓰기 등록 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 10);
 
  const registerPost = async () => {

     const getParams = {
       sort : sort,
       name : name,
       phone: phone,
       date: date,
       profile: profile,
       userContact: userContact,
    }
    axios
      .post(`${MainURL}/booklets/postscasting`, getParams)
      .then((res) => {
         if (res.data) {
           setSort('');
           setName('');
           setPhone('');
           setProfile('');
           setUserContact('')
           alert('요청되었습니다. 운영진이 검토후에 업로드 됩니다.');
         }
      })
      .catch(() => {
        console.log('실패함')
      })
  };
 

  return (
    <div className="company">

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} navigate={navigate} />

        <div className="subpage__main">
          <div className="subpage__main__title">광고및제휴</div>
          <div className="subpage__main__content" style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
            
            <p style={{marginBottom:'10px'}}>아래 메일로 문의 바랍니다.</p>
            <p>thebetterpeople@naver.com</p>

            {/* <div className="inputbox">
              <div className='name'>
                <p>구분</p>
              </div>
              <DropdownBox
                widthmain='90%'
                height='40px'
                selectedValue={sort}
                options={sortOptions}
                handleChange={(e:any)=>{setSort(e.target.value)}}
              />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>이름</p>
              </div>
              <input type="text" onChange={(e)=>{setName(e.target.value)}} value={name} />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>연락처</p>
              </div>
              <input type="text" onChange={(e)=>{setPhone(e.target.value)}} value={phone} />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>프로필</p>
              </div>
              <textarea 
                  className="textarea"
                  value={profile}
                  style={{outline:'none', lineHeight:'20px'}}
                  onChange={(e)=>{setProfile(e.target.value)}}
                />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>작성자 연락처</p>
              </div>
              <input type="text" onChange={(e)=>{setUserContact(e.target.value)}} value={userContact} />
            </div>

                     

            <div className="buttonbox">
              <div className="button" onClick={registerPost}>
                <p>등록 요청 하기</p>
              </div>
            </div> */}

          </div>
        </div>
      </div>


      <div className="inner">

        
      
        

      </div>

      <Footer/>

    </div>
  );
}
