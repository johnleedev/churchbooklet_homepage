import React, { useCallback, useEffect, useState } from 'react';
import './Admin.scss'
import axios from 'axios'
import MainURL from "../MainURL";
import { DropdownBox } from '../components/DropdownBox';
import { format } from 'date-fns';


export default function Schoolinfo( props: any) {

  
  interface ListProps {
    id : number,
    schoolName: string;
    schoolDean: string;
    inviteComment: string;
    faculty: string;
    homepage: string;
  }

  const [refresh, setRefresh] = useState<boolean>(false);
  const [list, setList] = useState<ListProps[]>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/admin/getschoollist`)
    if (res.data) {
      const copy = [...res.data];
      setList(copy);
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);  

  const [schoolId, setSchoolId] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [schoolDean, setSchoolDean] = useState('');
  const [inviteComment, setInviteComment] = useState('');
  const [faculty, setFaculty] = useState([{facultySort:"", professors:[{part:"", names:""}]}]);
  const [homepage, setHomepage] = useState('');



  // 종류 선택 ----------------------------------------------
  const facultySortOptions = [
    { value: '선택', label: '선택' },
    { value: '교수', label: '교수' },
    { value: '명예교수', label: '명예교수' },
    { value: '객원교수', label: '객원교수' },
    { value: '겸임교수', label: '겸임교수' },
    { value: '외래강사', label: '외래강사' }
  ];

  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd');


  const registerPost = async () => {
    axios 
      .post(`${MainURL}/admin/registerschool`, {
        schoolName : schoolName,
        schoolDean : schoolDean,
        inviteComment: inviteComment,
        faculty: JSON.stringify(faculty),
        homepage: homepage,
        inputDate: date
      })
      .then((res) => {
        if (res.data) {
          setRefresh(!refresh);
          setSchoolName('');
          setSchoolDean('');
          setInviteComment('');
          setFaculty([{facultySort:"", professors:[{part:"", names:""}]}]);
          setHomepage('');
          alert('입력되었습니다.');
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  const revisePost = async () => {
    axios 
      .post(`${MainURL}/admin/reviseschool`, {
        postId: schoolId,
        schoolName : schoolName,
        schoolDean : schoolDean,
        inviteComment: inviteComment,
        faculty: JSON.stringify(faculty),
        homepage: homepage,
        inputDate: date
      })
      .then((res) => {
        if (res.data) {
          setRefresh(!refresh);
          setSchoolName('');
          setSchoolDean('');
          setInviteComment('');
          setFaculty([{facultySort:"", professors:[{part:"", names:""}]}]);
          setHomepage('');
          alert('수정되었습니다.');
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deletePost = async (id:any) => {
		const getParams = {
			postId: id,
		}
		axios 
			.post(`${MainURL}/admin/deleteschool`, getParams)
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
  
  return  (
    <div className="admin-register">

      <div className="inner">
        <div className="inputbox">
          <div className='name'>
            <p>학교명</p>
          </div>
          <input type="text" onChange={(e)=>{setSchoolName(e.target.value)}} value={schoolName} />
        </div>
        <div className="inputbox" style={{justifyContent:'flex-start'}}>
          <div className='name'>
            <p>학과장</p>
          </div>
          <input type="text" onChange={(e)=>{setSchoolDean(e.target.value)}} value={schoolDean} />
        </div>
        <div className="inputbox" style={{justifyContent:'flex-start'}}>
          <div className='name'>
            <p>초대의글</p>
          </div>
          <textarea onChange={(e)=>{setInviteComment(e.target.value)}} value={inviteComment} />
        </div>
        <div className="inputbox" style={{justifyContent:'flex-start'}}>
          <div className='name'>
            <p>홈페이지</p>
          </div>
          <input type="text" onChange={(e)=>{setHomepage(e.target.value)}} value={homepage} />
        </div>
        <div className="inputbox" style={{justifyContent:'flex-start'}}>
          <div className='name'>
            <p>교수진</p>
          </div>
          <div className="facultyBox">
            {  faculty.length > 0
              ?
              faculty.map((item:any, index:any)=>{
                return (
                  <div className="faculty-input-row" key={index}>
                    <DropdownBox
                      widthmain='20%'
                      height='40px'
                      selectedValue={item.facultySort}
                      options={facultySortOptions}
                      handleChange={(e:any)=>{
                        const copy = [...faculty]
                        copy[index].facultySort = e.target.value;
                        setFaculty(copy);
                      }}
                    />
                    <div className="faculty-input-subrowBox" style={{width:'80%'}}>
                    {
                      item.professors.map((subItem:any, subIndex:any)=>{
                        return (
                          <div key={subIndex} className='faculty-input-subrow'>
                            <input type="text" value={subItem.part} style={{width:'20%'}}
                              onChange={(e)=>{
                                const copy = [...faculty]
                                copy[index].professors[subIndex].part = e.target.value;
                                setFaculty(copy);
                              }} 
                            />
                            <input type="text" value={subItem.names} style={{width:'55%'}}
                              onChange={(e)=>{
                                const copy = [...faculty]
                                copy[index].professors[subIndex].names = e.target.value;
                                setFaculty(copy);
                              }} 
                            />
                            <div className="faculty-input-subrow-btn"
                              onClick={()=>{
                                const copy = [...faculty]
                                copy[index].professors = [...copy[index].professors, {part:"", names:""}]
                                setFaculty(copy);
                              }}
                            >
                              추가
                            </div>
                            <div className="faculty-input-subrow-btn"
                              onClick={()=>{
                                const copy = [...faculty]
                                copy[index].professors.splice(subIndex, 1);
                                setFaculty(copy);
                              }}
                            >
                              삭제
                            </div>
                          </div>
                        )
                      })
                        
                    }
                   </div>
                    <div className="faculty-input-row-btn"
                      onClick={()=>{
                        const copy = [...faculty, {facultySort:"", professors:[{part:"", names:""}]}]
                        setFaculty(copy);
                      }}
                    >
                      추가
                    </div>
                    <div className="faculty-input-row-btn"
                        onClick={()=>{
                          const copy = [...faculty]
                          copy.splice(index, 1);
                          setFaculty(copy);
                        }}
                    >
                      삭제
                    </div>
                  </div>
                )
              })
              :
              <p>등록된 글이 없습니다.</p>
            }
            
          </div>
          
        </div>

        <div className="buttonbox">
          <div className="button" onClick={revisePost}>
            <p>수정하기</p>
          </div>
          <div className="button" onClick={registerPost}>
            <p>입력하기</p>
          </div>
        </div>


        {
          list.map((item:any, index:any)=>{
            return (
            <ul className="admin-textRow" key={index}>
              <li className="td_num">{index+1}</li>
              <li className="td_title">{item.schoolName}</li>
              <li className="td_date" style={{width:'15%'}}>{item.schoolDean}</li>
              <p
               onClick={()=>{
                setSchoolId(item.id)
                setSchoolName(item.schoolName)
                setSchoolDean(item.schoolDean)
                setInviteComment(item.inviteComment)
                setFaculty(JSON.parse(item.faculty))
                setHomepage(item.homepage)
              }}
              >수정</p>
              <p
               onClick={()=>{
                deletePost(item.id)
              }}
              >삭제</p>
            </ul>
            )
          })
        }

      </div>
      

    </div>
  );
}
