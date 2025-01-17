import React, { useEffect, useRef, useState } from 'react';
import '../Rollbook.scss';
import './RollbookChurhMain.scss';
import '../../login/Login.scss'
import MainURL from '../../../MainURL';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuTemplate from '../MenuTemplate';
import axios from 'axios';
import kakaologo from "../../../images/login/kakao.png"
import naverlogo from "../../../images/login/naver.png"
import { recoilKaKaoLoginData, recoilLoginPath, recoilLoginState, recoilNaverLoginData, recoilUserData } from '../../../RecoilStore';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import AuthRegisterModal from '../admin/AuthRegisterModal';


interface ListProps {
  id : number,
  church_Id : string,
  department : string,
  groupState : {
    group : string,
    teacher : string
  }[]
}


export default function RollbookChurhMain (props:any) {

  const url = new URL(window.location.href);
  const ID = url.searchParams.get("id");
  const churchName = url.searchParams.get("churchName");
  const urlHref = url.href;


  const [isLogin, setIsLogin] = useRecoilState(recoilLoginState);
  const [userData, setUserData] = useRecoilState(recoilUserData);
  const setLoginPath = useSetRecoilState(recoilLoginPath);
  const kakaoLoginData = useRecoilValue(recoilKaKaoLoginData);
  const naverLoginData = useRecoilValue(recoilNaverLoginData);

  let navigate = useNavigate();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [departments, setDepartments] = useState<ListProps[]>([]);

 
  // 게시글 가져오기
  const fetchPosts = async () => {
    const resDepartment = await axios.post(`${MainURL}/rollbookadmin/getdepartmentall`, {
      churchId : ID
    })
    if (resDepartment.data) {
      const copy = resDepartment.data;
      const result = copy.map((item:any) => ({
        ...item,
        groupState: JSON.parse(item.groupState)
      }));
      setDepartments(result)
    } 
  };

  useEffect(() => {
    fetchPosts();
  }, []);  

  // 로그인 ---------------------------------------------------------------------------------------------------------
  const KAKAO_API_KEY = kakaoLoginData.APIKEY;
  const KAKAO_REDIRECT_URI = kakaoLoginData.REDIRECT_URI_Auth;
  const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  // 네이버 로그인
  const NAVER_CLIENT_ID = naverLoginData.CLIENTID;
  const NAVER_SECRET = naverLoginData.SECRET;
  const NAVER_REDIRECT_URI = naverLoginData.REDIRECT_URI_Auth;
  const NAVER_STATE = "sdfsdfsdf";
  const naverToken = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  const [loginAccount, setLoginAccount] = useState('');
  const [loginPasswd, setLoginPasswd] = useState('');

  const handleLogin = async () => {
    await axios
     .post(`${MainURL}/login/loginemail`, {
      loginAccount : loginAccount,
      loginPasswd : loginPasswd,
      userURL : 'email'
     })
     .then((res)=>{
      if (res.data.isUser) {
        setIsLogin(true);
        setUserData({
          userAccount : res.data.userAccount,
          userNickName : res.data.userNickName,
          userChurch : res.data.userChurch,
          userSort: res.data.userSort,
          userDetail: res.data.userDetail,
          grade: res.data.grade,
          authChurch : res.data.authChurch,
          authDepartment : res.data.authDepartment,
          authGroup: res.data.authGroup
        })
        window.location.replace(urlHref);
       } else {
        if (res.data.which === 'email') {
          alert('가입되어 있지 않은 이메일 계정입니다.');  
        }
        if (res.data.which === 'passwd') {
          alert('비밀번호가 정확하지 않습니다. SNS계정으로 회원가입&로그인 되어 있을수도 있습니다.');
        }
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
   };


  const [isViewAddAuthRegisterModal, setIsViewAddAuthRegisterModal] = useState<boolean>(false);

   const alertLogin = () => {
    alert('로그인이 필요합니다.');
  }



  return  (
    <div className="Rollbook_churchmain">

      <div className='department_main'>
        <div className="maintitle-box">
          <div className='maintitle'>{churchName}</div>
          <div className='maintitle'>주일학교 출석부</div>
        </div>
        <div className='dep_box'>
          { departments.map((item:any, index:any)=>{
              return (
                <div key={index} className='dep_list' 
                  onClick={()=>{
                    if (isLogin) {
                      if (userData.authChurch === ID && userData.authDepartment === item.department) {
                        navigate(`/rollbook/rollbookdepartment`, {state : item});
                      } else {
                        alert('해당 부서의 접근 권한이 없습니다.')
                      }
                     } else {
                      if (item.department === '테스트') {
                        navigate(`/rollbook/rollbookdepartment`, {state : item});
                      } else {
                        alertLogin();
                      }
                     }
                  }}
                >
                  <h1>{ item.department }</h1>
                </div>           
              )
            })}
        </div>
      </div>

      <div style={{height:'100px'}}></div>
   
      {
        isLogin &&
        <div className='dep_buttonbox'>
          <div className='link_btn' 
            style={{border:'2px solid rgb(255, 86, 86)'}}
            onClick={()=>{
              window.scrollTo(0, 0);
              setIsViewAddAuthRegisterModal(true);
          }}> 사용신청하기 </div>  
          <div className='link_btn' onClick={()=>{
            navigate('/rollbook/churchadmin', {state : ID})
          }}> 전체부서관리 </div>  
          <div className='link_btn' onClick={()=>{
            // navigate('/')
          }}> 전체통계 </div>  
        </div>
      }
      
          
      {
        !isLogin 
        &&
        <div className="login">
      
          <div className="inner">

            <div className="container">
              
              <div className="title">
                <h1>로그인</h1>
                <p>로그인을 하시면 더 많은 정보를 보실수 있습니다.</p>
              </div>

              <div className="stepnotice">
                <div className="rowbar"></div>
              </div>

              <h2>SNS 계정으로 간편하게 로그인 하세요!</h2>
          
              <div className="inputbox">
                <div className="link"
                  onClick={()=>{
                    setLoginPath(urlHref);
                    window.location.href = kakaoToken;
                  }}
                >
                  <div className="snsloginbox">
                    <img src={kakaologo}/>
                    <p>카카오로 로그인</p>
                  </div>
                </div>
                <div className="link"
                  onClick={()=>{
                    setLoginPath(urlHref);
                    window.location.href = naverToken;
                  }} 
                >
                  <div className="snsloginbox">
                    <img src={naverlogo}/>
                    <p>네이버로 로그인</p>
                  </div>
                </div>
              </div>

              <p style={{margin:'20px 0'}}>어플로 가입하셨다면, 가입한 SNS로 로그인해주세요.</p>

              <div className="inputbox">
                <p style={{marginTop:'20px'}}>이메일로 로그인하기</p>
                <input value={loginAccount} className={loginAccount === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setLoginAccount(e.target.value)}} placeholder="이메일"
                  onKeyDown={(e)=>{
                    if (loginAccount !== '' && loginPasswd !== '') {
                      if (e.key === 'Enter') {handleLogin();}
                    }
                  }}
                />
                <input value={loginPasswd} className={loginPasswd === '' ? "inputdefault" : "inputdefault select" } type="password" 
                  onChange={(e) => {setLoginPasswd(e.target.value)}} placeholder="비밀번호"
                  onKeyDown={(e)=>{
                    if (loginAccount !== '' && loginPasswd !== '') {
                      if (e.key === 'Enter') {handleLogin();}
                    }
                  }}
                /> 
              </div>

              <div className="buttonbox">
                <div className="button"
                  onClick={handleLogin}
                >
                  <p>로그인</p>
                </div>
              </div>

    
              <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'20px 0'}}></div>
            
              <div className="bottombox">
                <div className="cover">
                  <p onClick={()=>{
                    navigate('/logister');
                  }}>회원가입</p>
                </div>
              </div>

            
            </div>

          </div>

        </div>
      }
      
      
      <div style={{height:'200px'}}></div>

      {/* 소그룹 등록 모달창 */}
      {
        isViewAddAuthRegisterModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <AuthRegisterModal
								refresh={refresh}
								setRefresh={setRefresh}
                setIsViewAddAuthRegisterModal={setIsViewAddAuthRegisterModal}
                church_Id={ID}
                departments={departments}
						 />
          </div>
        </div>
      }
        

    </div>
  )
}



