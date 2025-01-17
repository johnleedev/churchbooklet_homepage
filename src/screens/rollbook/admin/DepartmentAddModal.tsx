import React, { useCallback, useState } from 'react'
import './Admin.scss'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';



export default function DepartmentAddModal (props : any) {
	
  let navigate = useNavigate();
  const church_Id = props.church_Id;
  const [departmentName, setDepartmentName] = useState('');
  const groupStateCopy = [{group:'', teacher:''}]
  const [chief, setChief] = useState('');
  const [pastor, setPastor] = useState('');

  const registerDepartment = async () => {

    axios 
      .post(`${MainURL}/rollbookadmin/registerdepartment`, {
        churchId: church_Id,
        departmentName : departmentName,
        chief: chief,
        pastor: pastor,
        groupState : JSON.stringify(groupStateCopy)
      })
      .then((res) => {
        if (res.data) {
          props.setRefresh(!props.refresh);
          alert('추가되었습니다.');
          props.setIsViewAddDepartmentModal(false);
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
          <h1>부서추가하기</h1>
        </div>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddDepartmentModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      
      <div className="department-add-cover">
        <div className="department-add-row">
          <div className="department-add-title">
            <p>부서이름</p>
          </div>
          <div className="department-add-content">
            <input type="text"
              value={departmentName}
              onChange={(e)=>{
                setDepartmentName(e.target.value);
              }} 
            />
          </div>
        </div>
        <div className="department-add-row">
          <div className="department-add-title">
            <p>부장</p>
          </div>
          <div className="department-add-content">
            <input type="text"
              value={chief}
              onChange={(e)=>{
                setChief(e.target.value);
              }} 
            />
          </div>
        </div>
        <div className="department-add-row">
          <div className="department-add-title">
            <p>교역자</p>
          </div>
          <div className="department-add-content">
            <input type="text"
              value={pastor}
              onChange={(e)=>{
                setPastor(e.target.value);
              }} 
            />
          </div>
        </div>
      </div>
     
      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddDepartmentModal(false);
          }}
        >
          <p>취소</p>
        </div>
        <div className="btn"
          onClick={()=>{
            registerDepartment();
          }}
        >
          <p> 저장</p>
        </div>
       
      </div>

      
    </div>     
  )
}
