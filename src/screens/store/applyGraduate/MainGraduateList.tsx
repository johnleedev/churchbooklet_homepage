import React, { useEffect, useState } from 'react';
import '../Store.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuTemplate from '../MenuTemplate';
import axios from 'axios';
import MainURL from '../../../MainURL';

export default function MainGraduateList() {

  let navigate = useNavigate();
  const location = useLocation()
  const [currentMenu, setCurrentMenu] = useState(2);
  const paramsData = location.state.data;

  const [selectRowOpen, setSelectRowOpen] = useState<any>(false);

  interface ListProps {
    id : number;
    sort : string;
    title : string;
    date : string;
    password : string;
    inputDate : string;
  }

  const [list, setList] = useState<ListProps[]>([]);
  const [inputPassword, setInputPassword] = useState('');
  const fetchDatas = async () => {
    const res = await axios.get(`${MainURL}/register/getgraduatelist/${paramsData.id}`);
    if (res.data !== false) {
      const copy = res.data;
      setList(copy);
      setSelectRowOpen(Array(copy.length).fill(false));
    }
  }

  useEffect(()=>{
    fetchDatas();
  }, []);

  // 비밀번호 확인 후에, 입력 페이지로 넘어가기 
  const openPostInputs = async (item:any) => {
    if (item.password === inputPassword) {
      alert('확인되었습니다.');
      window.scrollTo(0, 0);
      navigate('/store/maingraduateregister', {state : {data : item, isAddOrRevise:'revise', menuNum: 2}});
    } else {
      alert('비밀번호가 다릅니다.')
    }
  };

  return (
    <div className='store'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} navigate={navigate} />
        <div className="subpage__main">
          <div className="subpage__main__title">
            <div className="subpage__main__title">
              <h3>처치북등록</h3>
            </div>
          </div>
          <div className="subpage__main__content">
            
            <div className="checkPasword">
              <p className='checkPasword-title'>{paramsData.title}</p>
             
              <div className="password-btn-row">
                <div className="password-btn"
                  style={{width:'300px', height:'70px'}}
                  onClick={()=>{
                    navigate('/store/maingraduateregister', {state : {data : paramsData, isAddOrRevise:'add', menuNum: 2}});
                  }}
                >
                  처치북 등록하기
                </div>
              </div>
            </div>
             

            <div className="tbl_wrap">
              <div className="tbl_head01">
                <ul className='titleRow'>
                  <li className="th_num">번호</li>
                  <li className="th_title">곡명</li>
                  <li className="th_date" style={{width:'15%'}}>파트</li>
                  <li className="th_date" style={{width:'15%'}}>이름</li>
                </ul>
                {
                  list?.length > 0 
                  ?
                  list.map((item:any, index:any)=>{

                    return(
                      <div key={index}>
                        <ul className="textRow" 
                          onClick={()=>{
                            const copy = [...selectRowOpen];
                            if (copy[index] === false) {
                              copy[index] = true
                            } else if (copy[index] === true) {
                              copy[index] = false
                            }
                            setSelectRowOpen(copy)
                          }}
                        >
                          <li className="td_num">{index+1}</li>
                          <li className="td_title">
                            {item.songTitle} { item.songNum === '2' && `/ ${item.songTitle2nd}` }
                          </li>
                          <li className="td_date" style={{width:'15%'}}>{item.playerPart}</li>
                          <li className="td_date" style={{width:'15%'}}>{item.playerName}</li>
                        </ul>
                        {
                          selectRowOpen[index] &&
                          <div className="list-password-check">
                            <p className='list-password-text'>수정비밀번호:</p>
                            <input
                                className="list-password-input"
                                value={inputPassword}
                                onChange={(e)=>{setInputPassword(e.target.value)}}
                                onKeyDown={(e)=>{if (e.key === 'Enter') {
                                  openPostInputs(item);
                                }}}
                              />
                            <div className="list-password-btn"
                              onClick={()=>{
                                openPostInputs(item);
                              }}
                            >
                              확인
                            </div>
                          </div>
                        }
                      </div>
                    )
                  })
                  :
                  <ul className="textRow">
                    <li className="td_num"></li>
                    <li className="td_title"><p>작성된 글이 없습니다.</p></li>
                    <li className="td_date"></li>
                  </ul>
                }
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}



