import React, { useCallback, useEffect, useState } from 'react';
import './Admin.scss'
import axios from 'axios'
import MainURL from "../MainURL";
import { DropdownBox } from '../components/DropdownBox';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


interface ListProps {
  id : number,
  isView: string
  pamphletId: string;
  type: string;
  sort: string;
  title: string;
  titleEn1: string;
  titleEn2: string;
  location: string;
  date: string;
  dateOrigin: string;
  time: string;
  place: string;
  address: string;
  superViser: string;
  supporter: string;
  ticket: string;
  ticketReserve: string;
  quiry: string;
  imageName: string;
}


interface ProfileProps {
  pamphletID : number,
  playerName : string,
  part : string,
  imageName : string,
  career : string,
  isStyleWrite: string
}

export default function Revise( props: any) {

  let navigate = useNavigate();

  const [list, setList] = useState<ListProps[]>([]);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.post(`${MainURL}/booklets/getdatapamphlet`, {
      type: 'all'
    })
    if (res.data.data) {
      let copy: any = [...res.data.data];
      copy.reverse();
      setList(copy);
      console.log(copy)
    } 
  };

  useEffect(() => {
    fetchPosts();
  }, []);  

   
  const [postId, setPostId] = useState('');
  let [pamphletTitle, setPamphletTitle] = useState('');
  let [pamphletTitleEn1, setPamphletTitleEn1] = useState('');
  let [pamphletTitleEn2, setPamphletTitleEn2] = useState('');
  let [profileData, setProfileData] = useState('');

  // 게시글 가져오기
  const fetchPostsdata = async (ID:string) => {
    const resProfile = await axios.post(`${MainURL}/booklets/getdataprofilepart`, {
      id : ID
    })
    if (resProfile.data) {
      let copy : ProfileProps[] = resProfile.data;
      setProfileData(copy[0].career);
      console.log(copy[0])
    }
  };

 
   // 수정 함수 ----------------------------------------------
   const registerPostProfile = async () => {
     axios 
       .post(`${MainURL}/admin/adminreviseprofile`, {
          postId: postId,
          inputData: profileData
       })
       .then((res) => {
          if (res.data) {
            setProfileData('');
            alert('수정되었습니다.');
          }
       })
       .catch(() => {
         console.log('실패함')
       })
   };

    // 수정 함수 ----------------------------------------------
    const registerPostPamphlet = async () => {
      axios 
        .post(`${MainURL}/admin/adminrevisepamphlet`, {
            postId: postId,
            title : pamphletTitle,
            titleEn1 : pamphletTitleEn1,
            titleEn2 : pamphletTitleEn2
        })
        .then((res) => {
            if (res.data) {
              setProfileData('');
              alert('수정되었습니다.');
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
            <p>연주회명</p>
          </div>
          <textarea  style={{minHeight:'100px'}}
            onChange={(e)=>{setPamphletTitle(e.target.value)}} value={pamphletTitle} />
        </div>
        <div className="inputbox">
          <div className='name'>
            <p>연주회명En1</p>
          </div>
          <textarea  style={{minHeight:'100px'}}
            onChange={(e)=>{setPamphletTitleEn1(e.target.value)}} value={pamphletTitleEn1} />
        </div>
        <div className="inputbox">
          <div className='name'>
            <p>연주회명En2</p>
          </div>
          <textarea  style={{minHeight:'100px'}}
            onChange={(e)=>{setPamphletTitleEn2(e.target.value)}} value={pamphletTitleEn2} />
        </div>
        <div className="inputbox">
          <div className='name'>
            <p>연주자프로필</p>
          </div>
          <textarea style={{minHeight:'350px'}}
            onChange={(e)=>{setProfileData(e.target.value)}} value={profileData} />
        </div>
        
        <div className="buttonbox">
          <div className="button" onClick={()=>{navigate(-1)}}>
            <p>뒤로가기</p>
          </div>
          <div className="button" onClick={registerPostPamphlet}>
            <p>전단지 수정하기</p>
          </div>
          <div className="button" onClick={registerPostProfile}>
            <p>프로필 수정하기</p>
          </div>
        </div>

        <div className="inputbox" style={{}}>
          <div className='name'>
            <p>교수진</p>
          </div>
          <div className="facultyBox">
            {  list.length > 0
              ?
              list.map((item:any, index:any)=>{
                return (
                  <div className="faculty-input-row" key={index}>
                    <div style={{width:'50%'}}>{item.title}</div>
                    <div style={{width:'50%', display:'flex'}}>
                      <div style={{width:'50%'}}
                        onClick={()=>{
                          setPostId(item.pamphletId);
                          fetchPostsdata(item.pamphletId);
                          setPamphletTitle(item.title);
                          setPamphletTitleEn1(item.titleEn1);
                          setPamphletTitleEn2(item.titleEn2);
                        }}
                      >
                        추가
                      </div>
                      <div style={{width:'50%'}}
                          onClick={()=>{
                            
                          }}
                      >
                        삭제
                      </div>
                    </div>
                    
                  </div>
                )
              })
              :
              <p>등록된 글이 없습니다.</p>
            }
            
          </div>
          
        </div>

      </div>

      

    </div>
  );
}
