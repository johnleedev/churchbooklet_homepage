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

interface PersonalListProps {
    id: string;
    name: string;
    department: string;
    groupName: string;
    birthYear: string;
    birthMonth: string;
    birthDay: string;
    school : string;
    presents2025: string;
}

export default function GroupAdmin( props: any) {

  let navigate = useNavigate();
  const location = useLocation()
  
  const departmentInfo = location.state.departmentInfo ;
  const groupName = location.state.groupName;
  
  const [refresh, setRefresh] = useState<boolean>(false);
  const [personalList, setPersonalList] = useState<PersonalListProps[]>([]);


  const fetchPosts = async () => {
    const res = await axios.post(`${MainURL}/rollbookadmin/getpersonallist`, {
      churchId : departmentInfo.church_Id,
      department : departmentInfo.department,
      groupName : groupName,
    })
    if (res.data) {
      const copy = [...res.data];
      const result = copy.map((item:any) => ({
        ...item,
        presents2025: JSON.parse(item.presents2025)
      }));
      setPersonalList(result);
    } else {
      setPersonalList([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);  


  // 수정 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd');

  const revisePost = async (item:any) => {
    axios 
      .post(`${MainURL}/rollbookadmin/revisepersonalinfo`, {
        churchId: departmentInfo.church_Id,
        department: item.department,
        groupName: item.groupName,
        name: item.name,
        birthYear: item.birthYear,
        birthMonth: item.birthMonth,
        birthDay: item.birthDay,
        school : item.school
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
	const deletePost = async (item:any) => {
		axios 
			.post(`${MainURL}/rollbookadmin/deletepersonalinfo`, {
        churchId: departmentInfo.church_Id,
        department: item.department,
        groupName: item.groupName,
        name: item.name
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
		const costConfirmed = window.confirm(`${item.name}(을)를 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deletePost(item);
		} else {
			return
		}
	};
  

	// 모달 ---------------------------------------------------------
	const [isViewAddPersonalModal, setIsViewAddPersonalModal] = useState<boolean>(false);
	
  
  return  (
    <div className="department-admin">

      <div className="inner">
        
        <div className="maintitle-box">
          <div className='maintitle'>{groupName} 관리</div>
        </div>

        <div className="inputbox">
          
          <div className="title-cover">
            <div className="title-row">
              <div className="title-box quarter" >
                <p>이름</p>
              </div>
              <div className="title-vertical-bar"></div>
              <div className="title-box quarter" >
                <p>생년월일</p>
              </div>
              <div className="title-vertical-bar"></div>
              <div className="title-box quarter" >
                <p>학교/직장</p>
              </div>
              <div className="title-vertical-bar"></div>
              <div className="title-btn-box quarter" >
                <p></p>
              </div>
            </div>
          </div>
          <div className="inputBox-cover">
            
            {  personalList.length > 0
              ?
              personalList.map((item:any, index:any)=>{
                return (
                  <div className="inputBox-row" key={index}>
                    <div className='inputBox-inputbox quarter'>
                      <h1>{item.name} </h1>
                    </div>
                    <div className='inputBox-inputbox quarter'>
                      <h3 className='formobile'>생년월일</h3>
                      <div className="dropdownBox-row">
                        <DropdownBox
                          widthmain='30%'
                          height='35px'
                          selectedValue={item.birthYear}
                          options={BirthYearData}
                          handleChange={(e)=>{
                            const copy = [...personalList];
                            copy[index].birthYear = e.target.value;
                            setPersonalList(copy);
                          }}
                        />
                        <DropdownBox
                          widthmain='30%'
                          height='35px'
                          selectedValue={item.birthMonth}
                          options={BirthMothData}
                          handleChange={(e)=>{
                            const copy = [...personalList];
                            copy[index].birthMonth = e.target.value;
                            setPersonalList(copy);
                          }}
                        />
                        <DropdownBox
                          widthmain='30%'
                          height='35px'
                          selectedValue={item.birthDay}
                          options={BirthDayData}
                          handleChange={(e)=>{
                            const copy = [...personalList];
                            copy[index].birthDay = e.target.value;
                            setPersonalList(copy);
                          }}
                        />
                      </div>
                    </div>
                    <div className='inputBox-inputbox quarter'>
                      <h3 className='formobile'>학교/직장</h3>
                      <input type="text" value={item.school}
                        onChange={(e)=>{
                          const copy = [...personalList];
                          copy[index].school = e.target.value;
                          setPersonalList(copy);
                        }} 
                      />
                    </div>
                    <div className='inputBox-btnBox quarter'>
                      <div className="inputBox-input-btn" 
                        style={{borderColor:'#B7F0B1'}}
                        onClick={()=>{
                          revisePost(item);
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
                <p>등록된 인원이 없습니다.</p>
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
              setIsViewAddPersonalModal(true);
            }}
          >
            <p>학생 추가</p>
          </div>
        </div>



      </div>

      {/* 학생 등록 모달창 */}
      {
        isViewAddPersonalModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <PersonAddModal
								refresh={refresh}
								setRefresh={setRefresh}
                setIsViewAddPersonalModal={setIsViewAddPersonalModal}
                departmentInfo={departmentInfo}
                groupName={groupName}
                navigate={navigate}
						 />
          </div>
        </div>
      }
      

    </div>
  );
}
