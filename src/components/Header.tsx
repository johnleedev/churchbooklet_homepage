import React, { useState, useEffect } from 'react';
import './Header.scss';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { recoilLoginPath, recoilLoginState, recoilUserData } from '../RecoilStore';
import logoB from "../images/logoB.png"

const Header: React.FC = () => {
  
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(recoilLoginState);
  const [userData, setUserData] = useRecoilState(recoilUserData);
  const loginPath = useRecoilValue(recoilLoginPath);

  const menus = [
    { title: "e-출석부", url:"/rollbook", 
      links: [
        {title:"전체교회", subUrl:"/rollbook"}, 
        // {title:"졸업연주회", subUrl:"/booklets/graduate"},
      ]
    },
    { title: "e-전단지", url:"/churchbooklets", 
      links: [
        {title:"교회소개", subUrl:"/churchbooklets"}, 
        // {title:"졸업연주회", subUrl:"/booklets/graduate"},
      ]
    },
    { title: "스토어", url:"/store", 
      links: [
        {title:"구매&신청", subUrl:"/store"},
        {title:"전단지등록", subUrl:"/store/register"}
      ] 
    },
    { title: "처치북", url:"/company", 
      links: [
        {title:"소개", subUrl:"/company"}, 
        {title:"공지사항", subUrl:"/company/notice"},
        {title:"광고및제휴", subUrl:"/company/advertise"},
      ]
    },
  ];

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<{ [key: number]: boolean }>({});

  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };

  const toggleMobileMenu = (index: number) => {
      setMobileMenuOpen((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
      }));
  };
  const handleLogout = async () => {
    setIsLogin(false);
    setUserData({
      userAccount : '',
      userNickName : '',
      userSort: '',
      userDetail : '',
      grade: ''
    })
    alert('로그아웃 되었습니다.')
    window.location.replace(loginPath);
  };

  const alertLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  }
  const alertRequest = () => {
    alert('본 게시판은 정회원만 접근할 수 있습니다. 등업 게시판에서 등업신청을 해주세요.');
    navigate('/store/graderequest');
  }

  return (
    <div className="header">
      <div className="header-top">
        <div className="inner">
          <div className="container header-top-container">
            {
              isLogin 
              ? <p style={{color:'#fff', marginRight:'20px'}}>{userData.userNickName}님 환영합니다</p>
              : <p style={{color:'#fff', marginRight:'20px'}}>로그인해주세요</p>
            }
            {
              isLogin 
              ?
              <div className="header-button_wrap">
                <div className="header-button"
                  onClick={handleLogout}
                >로그아웃</div>
                <div className="header-button"
                  onClick={()=>{navigate('/mypage');}}
                >마이페이지</div>
              </div>
              :
              <div className="header-button_wrap">
                <div className="header-button"
                  onClick={()=>{navigate('/login');}}
                >로그인</div>
                <div className="header-button" 
                  onClick={()=>{navigate('/logister');}}
                >회원가입</div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="header-content">
        <div className="inner">
          <div className="container header-content-container">
              <div className="header-logo" 
                onClick={()=>{navigate('/')}}
              >
                {/* <img src={logoB}/> */}
                <h1>처치북</h1>
              </div>
              <div className="header-menu">
                {
                  menus.map((item:any, index:any) => (
                    <div className="menu-item" key={index}>
                        <div className="menu-face" 
                          onClick={()=>{
                            navigate(item.url);
                            //  if (isLogin) {
                            //   if (item.title === '수련회') {
                            //     if (userData.grade === '정회원') {
                            //       navigate(item.url);
                            //     } else {
                            //       alertRequest();
                            //     }
                            //   } else {
                            //     navigate(item.url);
                            //   }
                            //  } else {
                            //   alertLogin();
                            //  }
                          }}
                        >{item.title}</div>
                        <div className="menu-body">
                          { 
                            item.links.map((subItem:any, subIndex:any) => (
                              <div className="menu-part" key={subIndex}>
                                <div onClick={()=>{
                                    navigate(subItem.subUrl)
                                    // i  f (isLogin) {
                                    //   if (item.title === '수련회') {
                                    //     if (userData.grade === '정회원') {
                                    //       navigate(subItem.subUrl)
                                    //     } else {
                                    //       alertRequest();
                                    //     }
                                    //   } else {
                                    //     navigate(subItem.subUrl)
                                    //   }
                                    //  } else {
                                    //   alertLogin();
                                    //  }
                                  }}>{subItem.title}</div>
                              </div>
                            ))
                          }
                        </div>
                    </div>
                  ))
                }
              </div>
              <div className={`header-hamburger_menu ${menuOpen ? 'header-hamburger_menu--open' : ''}`}>
                  <div className="header-hamburger_icon" onClick={toggleMenu}></div>
                  <div className="header-mobile_menu">
                      <div className="mobile_menu-inner">
                          {
                            isLogin 
                            ?
                            <div className="mobile_menu-top">
                              <span className="mobile_menu-announce">{userData.userNickName}님 환영합니다.</span>
                              <div className="mobile_menu-button_wrap">
                                  <div className="header-button" onClick={handleLogout}>로그아웃</div>
                                  <div className="header-button" onClick={()=>{navigate("/mypage"); toggleMenu();}}>마이페이지</div>
                              </div>
                            </div>
                            :
                            <div className="mobile_menu-top">
                              <span className="mobile_menu-announce">로그인해 주세요</span>
                              <div className="mobile_menu-button_wrap">
                                  <div className="header-button" onClick={()=>{
                                    alert('모바일 환경에서, 일부 기기가 카카오 로그인이 불안정함에 따라, 카카오 로그인이 안될시에는 네이버 로그인을 해주세요.')
                                    navigate("/login"); toggleMenu();
                                  }}>로그인</div>
                                  <div className="header-button" onClick={()=>{
                                    alert('모바일 환경에서, 일부 기기가 카카오 회원가입이 불안정함에 따라, 카카오 회원가입이 안될시에는 네이버 회원가입을 해주세요.')
                                    navigate("/logister"); toggleMenu();}}
                                  >회원가입</div>
                              </div>
                            </div>
                          }
                          
                          <div className="mobile_menu-list">
                              {
                                menus.map((item:any, index:any) => (
                                  <div className={`mobile_menu-item ${mobileMenuOpen[index] ? 'mobile_menu-item--open' : ''}`} 
                                    key={index} onClick={() => 
                                      toggleMobileMenu(index)
                                    }>
                                      <div className="mobile_menu-item_inner">
                                          <div className={`mobile_menu-face ${mobileMenuOpen[index] ? 'mobile_menu-face--open' : ''}`}>
                                              <div className="mobile_menu-face_text" 
                                                onClick={()=>{
                                                  navigate(item.url);
                                                  toggleMenu();
                                                  // if (isLogin) {
                                                  //   if (item.title === '수련회') {
                                                  //     if (userData.grade === '정회원') {
                                                  //       navigate(item.url);
                                                  //     } else {
                                                  //       alertRequest();
                                                  //     }
                                                  //     toggleMenu();
                                                  //   } else {
                                                  //     navigate(item.url);
                                                  //     toggleMenu();
                                                  //   }
                                                  //  } else {
                                                  //     alertLogin();
                                                  //  }
                                                }}>{item.title}</div>
                                              <div className="mobile_menu-face_icon"></div>
                                          </div>
                                          <div className="mobile_menu-body">
                                              {
                                                item.links.map((subItem:any, subIndex:any) => (
                                                  <div className="mobile_menu-part"
                                                    onClick={()=>{
                                                      navigate(subItem.subUrl);
                                                      toggleMenu();
                                                      // if (isLogin) {
                                                      //   if (item.title === '수련회') {
                                                      //     if (userData.grade === '정회원') {
                                                      //       navigate(subItem.subUrl);
                                                      //     } else {
                                                      //       alertRequest();
                                                      //     }
                                                      //     toggleMenu();
                                                      //   } else {
                                                      //     navigate(subItem.subUrl);
                                                      //     toggleMenu();
                                                      //   }
                                                      //  } else {
                                                      //     alertLogin();
                                                      //  }
                                                    }} key={subIndex}
                                                  >
                                                    {subItem.title}
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
