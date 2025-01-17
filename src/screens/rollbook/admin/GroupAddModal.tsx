import React, { useCallback, useState } from 'react'
import './Admin.scss'
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';



export default function GroupAddModal (props : any) {
	
  let navigate = useNavigate();
  const departmentInfo = props.departmentInfo;
  
  const [groupState, setGroupState] = useState(props.groupList);
  const [groupName, setGroupName] = useState('');
  const [groupTeacher, setGroupTeacher] = useState('');
  
  const registerGroup = async (copy:any) => {
    
    axios 
      .post(`${MainURL}/rollbookadmin/revisedepartmentstate`, {
        churchId: departmentInfo.church_Id,
        department : departmentInfo.department,
        groupState : JSON.stringify(copy)
      })
      .then((res) => {
        if (res.data) {
          props.setRefresh(!props.refresh);
          alert('추가되었습니다.');
          props.setIsViewAddGroupModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  const textcopy = `
  부서이름: ${groupName}
  선생님: ${groupTeacher}
  위 내용으로 추가하시겠습니까?`

  const handleRegisterAlert = () => {
    if (groupName === '' || groupTeacher === '') {
      alert('빈칸을 채워주세요')  
    } else {
      const costConfirmed = window.confirm(textcopy);
			if (costConfirmed) {
        const copy = [...groupState, {group:groupName, teacher:groupTeacher}];
        registerGroup(copy);
      } else {
        return
      }
    }
	};
  
  return (
    <div className='modal-addinput'>

      <div className='header-close-box'>
        <div className='header'>
          <h1>소그룹/반 추가하기</h1>
        </div>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddGroupModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      
      <div className="department-add-cover">
        <div className="department-add-row" style={{marginBottom:'20px'}}>
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
        <div className="department-add-row">
          <div className="department-add-title">
            <p>선생님 이름</p>
          </div>
          <div className="department-add-content">
            <input type="text"
              value={groupTeacher}
              onChange={(e)=>{
                setGroupTeacher(e.target.value);
              }} 
              onKeyDown={(e)=>{if (e.key === 'Enter') {
                handleRegisterAlert();
              }}}
            />
          </div>
        </div>
      </div>
     
      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddGroupModal(false);
          }}
        >
          <p>취소</p>
        </div>
        <div className="btn"
          onClick={()=>{
            handleRegisterAlert();
          }}
        >
          <p> 저장</p>
        </div>
       
      </div>

      
    </div>     
  )
}
