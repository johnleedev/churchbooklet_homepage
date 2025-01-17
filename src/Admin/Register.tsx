import React, { useCallback, useEffect, useState } from 'react';
import './Admin.scss'
import axios from 'axios'
import MainURL from "../MainURL";
import { DropdownBox } from '../components/DropdownBox';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


export default function Register( props: any) {

  let navigate = useNavigate();

  const [sort, setSort] = useState('');
  const [playName, setPlayName] = useState('');
  const [playDate, setPlayDate] = useState('');
  const [password, setPaassword] = useState('');

  // 종류 선택 ----------------------------------------------
  const sortOptions = [
    { value: '선택', label: '선택' },
    { value: '독주회&독창회', label: '독주회&독창회' },
    { value: '졸업연주회', label: '졸업연주회' }
  ];

  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd');
  const dateCopy = format(currentDate, 'yyMMdd');

  function generatePassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let password = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    setPaassword(`${dateCopy}${password}`);
  }

  useEffect(() => {
    generatePassword();
  }, []);  
 
   // 글쓰기 등록 함수 ----------------------------------------------

   const registerPost = async () => {

     axios 
       .post(`${MainURL}/admin/postregisterpre`, {
          sort : sort,
          title : playName,
          date : playDate,
          password: password,
          inputDate: date
       })
       .then((res) => {
          if (res.data) {
            setSort('');
            setPlayName('');
            setPlayDate('');
            generatePassword();
            alert('입력되었습니다.');
          }
       })
       .catch(() => {
         console.log('실패함')
       })
   };
  
  return  (
    <div className="admin-register">

      <div className="inner">
        <div className="inputbox">
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
            <p>연주회명</p>
          </div>
          <input type="text" onChange={(e)=>{setPlayName(e.target.value)}} value={playName} />
        </div>
        <div className="inputbox" style={{justifyContent:'flex-start'}}>
          <div className='name'>
            <p>연주회날짜</p>
          </div>
          <input type="text" onChange={(e)=>{setPlayDate(e.target.value)}} value={playDate} />
        </div>
        <div className="inputbox" style={{justifyContent:'flex-start'}}>
          <div className='name'>
            <p>비밀번호생성</p>
          </div>
          <input type="text" onChange={(e)=>{setPaassword(e.target.value)}} value={password} />
        </div>
        <div className="buttonbox">
          <div className="button" onClick={()=>{navigate(-1)}}>
            <p>뒤로가기</p>
          </div>
          <div className="button" onClick={registerPost}>
            <p>입력하기</p>
          </div>
        </div>
      </div>

    </div>
  );
}
