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
  
  const church_Id = location.state ;
    
  const [refresh, setRefresh] = useState<boolean>(false);
  const [groupList, setGroupList] = useState<GroupProps[]>([]);

  const fetchPosts = async () => {
    const res = await axios.post(`${MainURL}/rollbookadmin/getdepartmentall`, {
      churchId : church_Id,
    })
    if (res.data) {
      const copy = [...res.data];
      const result = copy.map((item:any) => ({
        ...item,
        groupState: JSON.parse(item.groupState)
      }));
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

  const revisePost = async (department:string, chief:string, pastor:string) => {
    axios 
      .post(`${MainURL}/rollbookadmin/revisedepartmentinfo`, {
        churchId: church_Id,
        department: department,
        chief : chief,
        pastor : pastor
      })
      .then((res) => {
        if (res.data) {
          setRefresh(!refresh);
          alert('수정되었습니다.');
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  // 삭제 함수 
	const deletePost = async (department:string) => {
		axios 
			.post(`${MainURL}/rollbookadmin/deletedepartment`, {
        churchId: church_Id,
        department: department,
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

  const handleDeleteAlert = (department:any) => {
		const costConfirmed = window.confirm(`${department}(을)를 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deletePost(department);
		} else {
			return
		}
	};
  

	// 모달 ---------------------------------------------------------
	const [isViewAddDepartmentModal, setIsViewAddDepartmentModal] = useState<boolean>(false);
	
  
  return  (
    <div className="department-admin">

      <div className="inner">
        
        <div className="maintitle-box">
          <div className='maintitle'> 관리</div>
        </div>

        <div className="inputbox">
          
          <div className="title-cover">
            <div className="title-row">
              <div className="title-box quarter" >
                <p>부서명</p>
              </div>
              <div className="title-vertical-bar"></div>
              <div className="title-box quarter" >
                <p>부장</p>
              </div>
              <div className="title-vertical-bar"></div>
              <div className="title-box quarter" >
                <p>교역자</p>
              </div>
              <div className="title-vertical-bar"></div>
              <div className="title-box quarter" >
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
                    <div className='inputBox-inputbox quarter'>
                      <h3 className='formobile'>부서</h3>
                      <input type="text" value={item.department}
                        onChange={(e)=>{
                          const copy = [...groupList];
                          copy[index].group = e.target.value;
                          setGroupList(copy);
                        }} 
                      />
                    </div>
                    
                    <div className='inputBox-inputbox quarter'>
                      <h3 className='formobile'>부장</h3>
                      <input type="text" value={item.chief}
                        onChange={(e)=>{
                          const copy = [...groupList];
                          copy[index].teacher = e.target.value;
                          setGroupList(copy);
                        }} 
                      />
                    </div>
                    <div className='inputBox-inputbox quarter'>
                      <h3 className='formobile'>교역자</h3>
                      <input type="text" value={item.pastor}
                        onChange={(e)=>{
                          const copy = [...groupList];
                          copy[index].teacher = e.target.value;
                          setGroupList(copy);
                        }} 
                      />
                    </div>
                    <div className='inputBox-btnBox quarter'>
                      <div className="inputBox-input-btn" 
                        style={{borderColor:'#B7F0B1'}}
                        onClick={()=>{
                          revisePost(item.department, item.chief, item.pastor);
                        }}
                      >
                        저장
                      </div>
                      <div className="inputBox-input-btn"
                        style={{borderColor:'#FFA7A7'}}
                        onClick={()=>{
                          handleDeleteAlert(item.department);
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
                <p>등록된 부서가 없습니다.</p>
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
              setIsViewAddDepartmentModal(true);
            }}
          >
            <p>부서 추가</p>
          </div>
        </div>



      </div>

      {/* 소그룹 등록 모달창 */}
      {
        isViewAddDepartmentModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <DepartmentAddModal
								refresh={refresh}
								setRefresh={setRefresh}
                church_Id={church_Id}
                setIsViewAddDepartmentModal={setIsViewAddDepartmentModal}
                // departmentInfo={departmentInfo}
                groupList={groupList}
                navigate={navigate}
						 />
          </div>
        </div>
      }
      

    </div>
  );
}
