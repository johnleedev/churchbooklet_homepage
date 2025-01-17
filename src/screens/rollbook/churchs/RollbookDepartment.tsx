import React, { useEffect, useRef, useState } from 'react';
import './RollbookChurhMain.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { format, getYear } from 'date-fns';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { DropdownBox } from '../../../components/DropdownBox';
import { recoilUserData } from '../../../RecoilStore';


interface GroupProps {
  group: string;
  teacher: string;
}

interface AuthProps {
  church_Id : string,
  departmentName : string,
  groupName : string,
  state : string,
  userAccount : string,
  userNickName : string,
  date : string
}


interface PersonalListProps {
  id : number,
  name: string;
  department : string;
  groupName : string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  school : string;
  presents2025 : {
    day : string;
    present : string;
  }
}

export default function RollbookDepartment (props:any) {
  

  const currentDate = new Date();
  const nowdate = format(currentDate, 'yyyy-MM-dd');
  const [currentMonth, setCurrentMonth] = useState(String(currentDate.getMonth() + 1).padStart(2, '0'));

  const [refresh, setRefresh] = useState(true);
  let navigate = useNavigate();
  const location = useLocation()
  const departmentInfo = location.state;
  const userData = useRecoilValue(recoilUserData);

  const [groupList, setGroupList] = useState<GroupProps[]>([]);
  const [groupListOption, setGroupListOption] = useState([]);
  const [personalListAll, setPersonalListAll] = useState<PersonalListProps[]>([]);
  const [personalListBirth, setPersonalListBirth] = useState<PersonalListProps[]>([]);
  const [authPersonList, setAuthPersonList] = useState<AuthProps[]>([]);
  const [selectedGroupName, setSelectedGroupName] = useState('');

  // 게시글 가져오기
  const fetchPosts = async () => {
    const resDepartment = await axios.post(`${MainURL}/rollbookadmin/getdepartmentstate`, {
      churchId : departmentInfo.church_Id,
      department : departmentInfo.department
    })
    if (resDepartment.data) {
      const copy = resDepartment.data[0];
      const result = JSON.parse(copy.groupState);
      setGroupList(result);
      const options = result.map((item:any)=>
        ({ value:item.group,  label:item.group})
      );
      options.unshift({ value: '스탭', label: '스탭' });
      options.unshift({ value: '선택', label: '선택' });
      setGroupListOption(options)
    } 
    const resPersonalAll = await axios.post(`${MainURL}/rollbooklist/getdepartmentpersonalall`, {
      churchId : departmentInfo.church_Id,
      department : departmentInfo.department
    })
    if (resPersonalAll.data) {
      const copy = resPersonalAll.data;
      setPersonalListAll(copy);
      const birth = copy.filter((e:any) => e.birthMonth === `${currentMonth}월`);
      setPersonalListBirth(birth);
    } 
    const resAuth = await axios.post(`${MainURL}/rollbookauth/getauthlist`, {
      churchId : departmentInfo.church_Id
    })
    if (resAuth.data) {
      const copy = resAuth.data;
      const result = copy.filter((e: any) => e.departmentName === departmentInfo.department);
      setAuthPersonList(result);
    } 
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);  

  const handleReviseConfirmAuth = async (account : any) => {
    await axios
     .post(`${MainURL}/rollbookauth/reviseconfirmauth`, {
        churchId : departmentInfo.church_Id,
        departmentName : departmentInfo.department,
        userAccount : account,
        groupName : selectedGroupName
     })
     .then((res)=>{
      if (res.data) {
        setRefresh(!refresh);
        alert('승인되었습니다');
        setSelectedGroupName('');
      }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
  };
 

  return  (
    <div className="Rollbook_churchmain">
      
      <div className='department_main'>
        <div className="maintitle-box">
          <div className='maintitle'>{departmentInfo.department}</div>
        </div>
        <div className='dep_box'>
          { groupList.map((item:any, index:any)=>{
              return (
                <div key={index} className='dep_list' 
                  onClick={()=>{
                    if (userData.authGroup === item.group || userData.authGroup === '부장' || userData.authGroup === '교역자'  || userData.authGroup === '스탭' 
                      || item.group === '테스트1' || item.group === '테스트2' ||  item.group === '테스트3') {
                      navigate(`/rollbook/rollbookpresents`, {state : {departmentInfo: departmentInfo, departmentDetail: item}});
                    } else {
                      alert('해당 소그룹/반의 접근 권한이 없습니다.')
                    }
                  }}
                >
                  <h1>{ item.group }</h1>
                  <p>{ item.teacher }</p>
                </div>           
              )
            })}
        </div>
      </div>

      <div style={{height:'100px'}}></div>

      <div className="birthPersonBox">
        <div className="birthPersonBox-titleRow">
          <div className="birth-date_btn"
            onClick={()=>{
              const copyMonth = parseInt(currentMonth);
              if (copyMonth === 1) {
                alert('가장 첫 달입니다.')
              } else {
                const lastMonth = copyMonth-1 < 10 ? String(copyMonth-1).padStart(2, '0') : String(copyMonth-1);
                setCurrentMonth(lastMonth);
                const birth = personalListAll.filter((e:any) => e.birthMonth === `${lastMonth}월`);
                setPersonalListBirth(birth);
              }
            }}
          >
            <IoIosArrowBack />
          </div>
        <div className="birthPerson-title">{`${currentMonth}월`} 생일자</div>
        <div className="birth-date_btn"
            onClick={()=>{
              const copyMonth = parseInt(currentMonth);
              if (copyMonth === 12) {
                alert('가장 마지막 달입니다.')
              } else {
                const nextMonth = copyMonth+1 < 10 ? String(copyMonth+1).padStart(2, '0') : String(copyMonth+1);
                setCurrentMonth(nextMonth);
                const birth = personalListAll.filter((e:any) => e.birthMonth === `${nextMonth}월`);
                setPersonalListBirth(birth);
              }
            }}
          >
            <IoIosArrowForward />
          </div>
        </div>
       { personalListBirth.length > 0 
        ?
        personalListBirth.map((item:any, index:any)=>{

          return (
            <div className="birthPerson-person-row" key={index}>
              <p className="birthPerson-name">{item.name}</p>
              <p className="birthPerson-group">{item.groupName}</p>
              <p className="birthPerson-birth">{item.birthYear} {item.birthMonth} {item.birthDay}</p>
            </div>
          )
        })
        :
        <div style={{width:'100%', textAlign:'center'}}>생일자가 없습니다.</div>
       }
      </div>

      <div style={{height:'100px'}}></div>
   
      <div className='dep_buttonbox'>
        
        <div className='link_btn' onClick={()=>{
          navigate(-1);
        }}> 뒤로가기 </div>  
        <div className='link_btn' onClick={()=>{
          if (userData.authGroup === '부장' || userData.authGroup === '교역자') {
            navigate('/rollbook/departmentadmin', {state : departmentInfo})
          } else {
            alert('권한이 없습니다.')
          }           
        }}> 부서관리 </div>  
        <div className='link_btn' onClick={()=>{
          // navigate('/')
        }}> 통계 </div>  
      </div>

      <div style={{height:'100px'}}></div>

      {
        (userData.authGroup === '부장' || userData.authGroup === '교역자' )&&
        <div className="authBox">
          <div className="auth-title">권한 승인 대기자</div>
        { authPersonList.length > 0 
          ?
          authPersonList.map((item:any, index:any)=>{

            return (
              <div className="auth-person-row" key={index}>
                <div className="auth-person-textbox">
                  <p className="auth-nickName">{item.userNickName}</p>
                  <p className="auth-group">{item.groupName}</p>
                  <p className="auth-date">{item.date}</p>
                </div>
                <div className="auth-person-btnbox">
                  <div className='auth-select'>
                    <DropdownBox
                      widthmain='95%'
                      height='35px'
                      selectedValue={item.groupName}
                      options={groupListOption}
                      handleChange={(e)=>{
                        const copy = [...authPersonList];
                        copy[index].groupName = e.target.value;
                        setAuthPersonList(copy);
                        setSelectedGroupName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="auth-btnbox"
                    onClick={()=>{
                      if (selectedGroupName === '') {
                        alert ('소그룹/반을 선택해주세요.')
                      } else {
                        handleReviseConfirmAuth(item.userAccount);
                      }
                    }}
                  >
                    <p>승인</p>
                  </div>
                </div>
              </div>
            )
          })
          :
          <div style={{width:'100%', textAlign:'center'}}>대기자가 없습니다.</div>
        }
        </div>
      }
          
      <div style={{height:'200px'}}></div>
      
    </div>
  )
}



