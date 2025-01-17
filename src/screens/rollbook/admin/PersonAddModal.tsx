import React, { useCallback, useState } from 'react'
import './Admin.scss'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';



export default function PersonAddModal (props : any) {
	
  let navigate = useNavigate();
  const departmentInfo = props.departmentInfo;
  const [studentName, setStudentName] = useState('');
  
   const registerStudent = async () => {

    axios 
      .post(`${MainURL}/rollbookadmin/registerpersonal`, {
        churchId: departmentInfo.church_Id,
        department : departmentInfo.department,
        groupName : props.groupName,
        name : studentName
      })
      .then((res) => {
        if (res.data) {
          props.setRefresh(!props.refresh);
          alert('추가되었습니다.');
          props.setIsViewAddPersonalModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  
  return (
    <div className='modal-addinput'>

      <div className='header-close-box'>
        <div className='header'>
          <h1>학생 추가하기</h1>
        </div>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddPersonalModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      
      <div className="department-add-cover">
        <div className="department-add-row">
          <div className="department-add-title">
            <p>학생 이름</p>
          </div>
          <div className="department-add-content">
            <input type="text"
              value={studentName}
              onChange={(e)=>{
                setStudentName(e.target.value);
              }} 
            />
          </div>
        </div>

      </div>
     
      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddPersonalModal(false);
          }}
        >
          <p>취소</p>
        </div>
        <div className="btn"
          onClick={()=>{
            registerStudent();
          }}
        >
          <p> 저장</p>
        </div>
       
      </div>

      
    </div>     
  )
}
