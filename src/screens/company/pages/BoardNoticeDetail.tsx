import React, { useEffect, useState } from 'react';
import '../Company.scss';
import MainURL from '../../../MainURL';
import axios from 'axios';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineRemoveRedEye, MdOutlineAccessTime } from "react-icons/md";
import { FaRegThumbsDown,FaRegThumbsUp  } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { format } from "date-fns";
import DateFormmating from '../../../components/DateFormmating';
import { CiCircleMinus } from "react-icons/ci";
import { useRecoilValue } from 'recoil';
import { recoilUserData } from '../../../RecoilStore';
import MenuTemplate from '../MenuTemplate';

export default function BoardNoticeDetail() {

  let navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state.data;
  const propsSort = location.state.sort;
  const propsMenuNum = location.state.menuNum;
  const images = location.state.data.images ? JSON.parse(location.state.data.images) : [];
  const userData = useRecoilValue(recoilUserData);

  const [currentMenu, setCurrentMenu] = useState(propsMenuNum);
  const [refresh, setRefresh] = useState<boolean>(false);

  // 게시글 삭제 함수 ----------------------------------------------
  const deletePost = () => {
    axios
      .post(`${MainURL}/board/deletepost`, {
        postId : propsData.id,
        userAccount : propsData.userAccount,
        images : images
      })
      .then((res) => {
        if (res.data === true) {
          alert('삭제되었습니다.');
          setRefresh(!refresh);
          navigate(-1);
        } 
      });
  };

  // 글자 제한 ----------------------------------------------
  const renderPreview = (content : string) => {
    if (content?.length > 40) {
      return content.substring(0, 40) + '...';
    }
    return content;
  };

  return (
    <div className='company'>

      <div className="inner">

         {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} navigate={navigate} />

        <div className="subpage__main">
          <div className="subpage__main__title">
            <h3>공지사항</h3>
            <div style={{display:'flex'}}>
              <div className='postBtnbox'
                style={{marginRight:'10px'}}
                onClick={()=>{navigate(-1);}}
              >
                <p>목록</p>
              </div>
              {
                (propsSort !== 'graderequest' && userData.userAccount === propsData.userAccount) &&
                <div className='postBtnbox'
                  style={{marginRight:'10px'}}
                  onClick={deletePost}
                  >
                  <p>삭제</p>
                </div>
              }
            </div>
          </div>
          
          <div className="subpage__main__content">
            
            <div className="top_box">
              <div className="left">
                <h1>{renderPreview(propsData.title)}</h1>
                <p>글쓴이: 관리자</p>
              </div>
              <div className="right">
                <div className='contentcover'>
                  <div className="box">
                    <MdOutlineAccessTime color='#325382'/>
                    <p>{DateFormmating(propsData.date)}</p>
                  </div>
                  <div className="box">
                    <MdOutlineRemoveRedEye color='#325382'/>
                    <p>{propsData.views}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="view_content">
              <div className='imagecover'>
              { images.length > 0 &&
                images.map((item:any, index:any)=>{
                  return (
                    <img src={`${MainURL}/images/postimage/${item}`} key={index}/>
                  )
                })
              }
              </div>
              <div className='textcover'>
                <p>{propsData.content}</p>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  )
}



