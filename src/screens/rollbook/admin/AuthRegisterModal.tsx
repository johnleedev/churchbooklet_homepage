import React, { useCallback, useEffect, useState } from 'react'
import './Admin.scss'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { useRecoilState } from 'recoil';
import { recoilUserData } from '../../../RecoilStore';
import { format } from 'date-fns';
import { DropdownBox } from '../../../components/DropdownBox';



export default function AuthRegisterModal (props : any) {
	
  let navigate = useNavigate();
  const currentDate = new Date();
  const nowdate = format(currentDate, 'yyyy-MM-dd');

  const church_Id = props.church_Id;
  const departments = props.departments;

  const [userData, setUserData ]= useRecoilState(recoilUserData);
  const [departmentName, setDepartmentName] = useState('');
  const [departmentOption, setDepartmentOption] = useState<any>([]);
  const [groupName, setGroupName] = useState('');

  const handleRegisterAuth = async () => {
    await axios
     .post(`${MainURL}/rollbookauth/registerauth`, {
        churchId : church_Id,
        departmentName : departmentName,
        userAccount : userData.userAccount,
        userNickName : userData.userNickName,
        groupName : groupName,
        date : nowdate
     })
     .then((res)=>{
      if (res.data) {
        props.setRefresh(!props.refresh);
        alert('신청되었습니다. 교역자/부서장에게 권한 승인을 요청해주세요.');
        props.setIsViewAddAuthRegisterModal(false);
      }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
  };


  useEffect(() => {
    const copy = [...departments];
    const result = copy.map((item:any)=>
      ({ value:item.department,  label:item.department})
    );
    result.unshift({ value: '선택', label: '선택' });
    setDepartmentOption(result)
  }, []);  

  
  return (
    <div className='modal-addinput'>

      <div className='header-close-box'>
        <div className='header'>
          <h1>사용신청하기</h1>
        </div>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddAuthRegisterModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      
      <div className="department-add-cover">
        <div className="department-add-row">
          <div className="department-add-title">
            <p>계정</p>
          </div>
          <div className="department-add-content">
            <p>{userData.userAccount}</p>
          </div>
        </div>
        <div className="department-add-row">
          <div className="department-add-title">
            <p>닉네임</p>
          </div>
          <div className="department-add-content">
            <p>{userData.userNickName}</p>
          </div>
        </div>
        <div className="department-add-row">
          <div className="department-add-title">
            <p>부서</p>
          </div>
          <div className="department-add-content">
            <div className="dropbox-box">
              <DropdownBox
                widthmain='100%'
                height='35px'
                selectedValue={departmentName}
                options={departmentOption}
                handleChange={(e)=>{
                  setDepartmentName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="department-add-row">
          <div className="department-add-title">
            <p>소그룹/반 이름</p>
          </div>
          <div className="department-add-content">
            <input type="text"
              value={groupName}
              onChange={(e)=>{
                setGroupName(e.target.value);
              }} 
            />
          </div>
        </div>
      </div>
     
      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddAuthRegisterModal(false);
          }}
        >
          <p>취소</p>
        </div>
        <div className="btn"
          onClick={()=>{
            if (departmentName === '' || departmentName === '선택') {
              alert('부서를 선택해주세요.')
            } else {
              handleRegisterAuth();
            }
          }}
        >
          <p> 저장</p>
        </div>
       
      </div>

      
    </div>     
  )
}
