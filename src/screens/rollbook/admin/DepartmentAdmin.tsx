import React, { useCallback, useEffect, useState } from 'react';
import './Admin.scss'
import axios from 'axios'
import MainURL from "../../../MainURL";
import { DropdownBox } from '../../../components/DropdownBox';
import { format } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';
import DepartmentAddModal from './DepartmentAddModal';
import { BirthDayData, BirthMothData, BirthYearData } from './DropdownData';
import PersonAddModal from './PersonAddModal';
import GroupAddModal from './GroupAddModal';

interface GroupProps {
  group: string;
  teacher: string;
}

export default function DepartmentAdmin( props: any) {

  let navigate = useNavigate();
  const location = useLocation()
  
  const departmentInfo = location.state ;
    
  const [refresh, setRefresh] = useState<boolean>(false);
  const [groupList, setGroupList] = useState<GroupProps[]>([]);

  const fetchPosts = async () => {
    const res = await axios.post(`${MainURL}/rollbookadmin/getdepartmentstate`, {
      churchId : departmentInfo.church_Id,
      department : departmentInfo.department
    })
    if (res.data) {
      const copy = res.data[0];
      const result = JSON.parse(copy.groupState);
      setGroupList(result);
    } else {
      setGroupList([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);  


  // 수정 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd');

  const revisePost = async () => {
    axios 
      .post(`${MainURL}/rollbookadmin/revisedepartmentstate`, {
        churchId: departmentInfo.church_Id,
        department: departmentInfo.department,
        groupState: JSON.stringify(groupList)
      })
      .then((res) => {
        if (res.data) {
          setRefresh(!refresh);
          alert('수정되었습니다.');
          navigate(-1);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  // 삭제 함수 
	const deletePost = async (result:any) => {
		axios 
			.post(`${MainURL}/rollbookadmin/revisedepartmentstate`, {
        churchId: departmentInfo.church_Id,
        department: departmentInfo.department,
        groupState: JSON.stringify(result)
      })
			.then((res) => {
				if (res.data) {
          setRefresh(!refresh);
					alert('삭제되었습니다.')
				}
			})
			.catch(() => {
				console.log('실패함')
			})
	};

  const handleDeleteAlert = (item:any) => {
		const costConfirmed = window.confirm(`${item.group}(을)를 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
        const copy = [...groupList];
        const result = copy.filter((e:any)=> e.group !== item.group);
        setGroupList(result);
				deletePost(result);
		} else {
			return
		}
	};
  

	// 모달 ---------------------------------------------------------
	const [isViewAddGroupModal, setIsViewAddGroupModal] = useState<boolean>(false);
	
  
  return  (
    <div className="department-admin">

      <div className="inner">
        
        <div className="maintitle-box">
          <div className='maintitle'> 관리</div>
        </div>

        <div className="inputbox">
          
          <div className="title-cover">
            <div className="title-row">
              <div className="title-box third" >
                <p>소그룹/반</p>
              </div>
              <div className="title-vertical-bar"></div>
              <div className="title-box third" >
                <p>선생님</p>
              </div>
              <div className="title-vertical-bar"></div>
              <div className="title-box third" >
                <p></p>
              </div>
            </div>
          </div>
          <div className="inputBox-cover">
            
            {  groupList.length > 0
              ?
              groupList.map((item:any, index:any)=>{
                return (
                  <div className="inputBox-row" key={index}>
                    <div className='inputBox-inputbox third'>
                      <h3 className='formobile'>소그룹/반</h3>
                      <input type="text" value={item.group}
                        onChange={(e)=>{
                          const copy = [...groupList];
                          copy[index].group = e.target.value;
                          setGroupList(copy);
                        }} 
                      />
                    </div>
                    <div className='inputBox-inputbox third'>
                      <h3 className='formobile'>선생님</h3>
                      <input type="text" value={item.teacher}
                        onChange={(e)=>{
                          const copy = [...groupList];
                          copy[index].teacher = e.target.value;
                          setGroupList(copy);
                        }} 
                      />
                    </div>
                    <div className='inputBox-btnBox third'>
                      <div className="inputBox-input-btn" 
                        style={{borderColor:'#B7F0B1'}}
                        onClick={()=>{
                          revisePost();
                        }}
                      >
                        저장
                      </div>
                      <div className="inputBox-input-btn"
                        style={{borderColor:'#FFA7A7'}}
                        onClick={()=>{
                          handleDeleteAlert(item);
                        }}
                      >
                        - 삭제
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <div className="emptybox">
                <p>등록된 소그룹/반이 없습니다.</p>
              </div>
            }
          
          </div>
        </div>

        <div className="buttonbox">
          <div className="button" 
            onClick={()=>{
              navigate(-1)
            }}
          >
            <p>뒤로가기</p>
          </div>
          <div className="button" 
            onClick={()=>{
              window.scrollTo(0, 0);
              setIsViewAddGroupModal(true);
            }}
          >
            <p>소그룹/반 추가</p>
          </div>
        </div>



      </div>

      {/* 소그룹 등록 모달창 */}
      {
        isViewAddGroupModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <GroupAddModal
								refresh={refresh}
								setRefresh={setRefresh}
                setIsViewAddGroupModal={setIsViewAddGroupModal}
                departmentInfo={departmentInfo}
                groupList={groupList}
                navigate={navigate}
						 />
          </div>
        </div>
      }
      

    </div>
  );
}
