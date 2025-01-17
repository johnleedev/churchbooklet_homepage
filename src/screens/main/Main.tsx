import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import './Main.scss'
import axios from 'axios';
import MainURL from '../../MainURL';
import { format } from "date-fns";
import { useRecoilValue } from 'recoil';
import { recoilLoginState, recoilUserData } from '../../RecoilStore';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import kakaologo from "../../images/login/kakao.png"
import instarlogo from "../../images/instarlogo.jpeg"
import { FaArrowRight } from "react-icons/fa";
import { GrDocumentStore } from "react-icons/gr";
import { LuBookUp } from "react-icons/lu";
import { RiAdvertisementLine } from "react-icons/ri";

export default function Main(props:any) {

	let navigate = useNavigate();
  const isLogin = useRecoilValue(recoilLoginState);
	const userData = useRecoilValue(recoilUserData);

  // 접속시 접속수 증가시키기
  const appUseCount = () => {
    const currentDate = new Date();
    const date = format(currentDate, 'yyyy-MM-dd');
    axios
      .post(`${MainURL}/homeusecount`, {
        date : date
      })
      .then((res) => {return})
      .catch((error) => {
        console.log(error);
      });
  }
      
  useEffect(()=>{
    // appUseCount();
  }, []); 

  const [placelist, setPlaceList] = useState([]);
  const [unitelist, setUniteList] = useState([]);
  const [castingList, setCastingList] = useState([]);

 
  // 게시글 가져오기
  const fetchPosts = async () => {
    const resplace = await axios.get(`${MainURL}/home/getlastplace`)
    if (resplace.data) {
      setPlaceList(resplace.data);
    } 
    const resunite = await axios.get(`${MainURL}/home/getlastunite`)
    if (resunite.data) {
      setUniteList(resunite.data);
    } 
    const rescasting = await axios.get(`${MainURL}/home/getlastcasting`)
    if (resunite.data) {
      setCastingList(rescasting.data);
    } 
  };

  useEffect(() => {
    // fetchPosts();
  }, []);  

  const alertLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  }

  const alertRequest = () => {
    alert('본 게시판은 정회원만 접근할 수 있습니다. 등업 게시판에서 등업신청을 해주세요.');
    navigate('/store/graderequest');
  }

	return (
		<div className='main'>

      {/* <div className="main_adv_banner">

      </div> */}

      <div className="main__box1">
				<div className="inner">
         
          <div className="main_top_container">
						<p className="main__box-slogan">
              <span className="slogan-text1">Church-Book</span>
              <span className="slogan-text2">새로운 전단지 &#183; 온라인 전단지</span>
							<span className="slogan-text3">"처치북"은</span>
              <span className="slogan-text3">문화를 바꾸고, 세상을 바꿉니다.</span>
						</p>
            <div className="slogan-Btn"
              onClick={()=>{
                window.scrollTo(0, 0);
                navigate('/store');  
              }}
            >
              <p>구매 & 신청</p>
            </div>
					</div>
     
          {/* <a className="kakaoBtnBox"
            href='http://pf.kakao.com/_xmwxoIn' target='_blank'
          >
            <img src={kakaologo}/>
            <p>카카오채널</p>
            <p>문의하기</p>
          </a> */}

				</div>	
  		</div>

      {/* <div className="main_adv_banner" style={{borderBottom:'1px solid #BDBDBD'}}>
        <a className='instarAdv'
          href='https://www.instagram.com/artsbook.co.kr' target='_blank'
        >
          <img src={instarlogo}/>
          <p className='instarAdv_textmagin'>artsbook.co.kr</p>
          <p>## 처치북 공식 인스타계정</p>
        </a>
      </div> */}

			<div className="main__box2">
				<div className="inner">
         
          {/* <div className="main_banner_swiper">
            <div className="main_banner_swiper_titleBox" style={{borderRight:'1px solid #EAEAEA'}}>
              <div className="main_banner_swiper_titleText">
                <p>최신 등록</p>
                <p>수련회 장소</p>
              </div>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={5}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation
              className="swiperimagerow desktop"
            >
              {
                placelist.map((item:any, index:any)=>{
                  const mainimage = JSON.parse(item.images)[0];
                  return item.isView === "true" && ( 
                    <SwiperSlide className="slide" key={index}
                      onClick={()=>{
                        window.scrollTo(0, 0);
                        navigate(`/retreat/placedetail?id=${item.id}&currentNum=1&currentSubNum=0`);
                      }}
                    >
                      <div className="place__img--cover">
                        <div className="namecard">
                          <p>{item.location}</p>
                        </div>
                        <div className='imageBox'>
                          <img src={`${MainURL}/images/placeimage/${mainimage}`} alt={'등록된 사진이 없습니다.'} />
                        </div>
                      </div>
                      <div className="place__coname">
                        <p>{item.placeName}</p>
                      </div>
                      <div className="place__name">
                        <p>종류: {item.sort}</p>
                        <p>규모: {item.size}</p>
                      </div>
                    </SwiperSlide>
                  )
                })
              } 
            </Swiper>

            <div className="swiperimagerow mobile">
            {
              placelist.slice(0,6).map((item:any, index:any)=>{
                const mainimage = JSON.parse(item.images)[0];
                return item.isView === "true" && ( 
                  <div className="slide" key={index}
                    onClick={()=>{
                      window.scrollTo(0, 0);
                      navigate(`/retreat/placedetail?id=${item.id}&currentNum=1&currentSubNum=0`);
                    }}
                  >
                    <div className="place__img--cover">
                      <div className="namecard">
                        <p>{item.location}</p>
                      </div>
                      <div className='imageBox'>
                        <img src={`${MainURL}/images/placeimage/${mainimage}`} alt={'등록된 사진이 없습니다.'} />
                      </div>
                    </div>
                    <div className="place__coname">
                      <p>{item.placeName}</p>
                    </div>
                    <div className="place__name">
                      <p>종류: {item.sort}</p>
                      <p>규모: {item.size}</p>
                    </div>
                  </div>
                )
              })
            } 
            </div>
          </div>

          
          <div className="main_banner_swiper">
            <div className="main_banner_swiper_titleBox" style={{borderRight:'1px solid #EAEAEA'}}>
              <div className="main_banner_swiper_titleText">
                <p>최신 등록</p>
                <p>연합수련회</p>
             </div>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={5}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation
              className="swiperimagerow desktop"
            >
              {
                unitelist.map((item:any, index:any)=>{
                  const mainimage = JSON.parse(item.images)[0];
                  return item.isView === "true" && ( 
                    <SwiperSlide className="slide" key={index}
                      onClick={()=>{
                        window.scrollTo(0, 0);
                        navigate(`/retreat/unitedetail?id=${item.id}&currentNum=2&currentSubNum=0`);
                      }}
                    >
                      <div className="place__img--cover">
                        <div className="namecard">
                          <p>{item.location}</p>
                        </div>
                        <div className='imageBox' style={{height:'200px'}}>
                          <img src={`${MainURL}/images/uniteimage/${mainimage}`}
                            style={{maxHeight:'200px'}} alt={'등록된 사진이 없습니다.'} />
                        </div>
                      </div>
                      <div className="place__coname">
                        <p>{item.placeName}</p>
                      </div>
                      <div className="place__name">
                        <p>기간: {item.retreatDateStart} ~ {item.retreatDateEnd}</p>
                        <p>장소 {item.placeName}</p>
                      </div>
                    </SwiperSlide>
                  )
                })
              } 
            </Swiper>

            <div className="swiperimagerow mobile">
            {
              unitelist.slice(0,6).map((item:any, index:any)=>{
                const mainimage = JSON.parse(item.images)[0];
                return item.isView === "true" && ( 
                  <div className="slide" key={index}
                    onClick={()=>{
                      window.scrollTo(0, 0);
                      navigate(`/retreat/unitedetail?id=${item.id}&currentNum=2&currentSubNum=0`);
                    }}
                  >
                    <div className="place__img--cover">
                      <div className="namecard">
                        <p>{item.location}</p>
                      </div>
                      <div className='imageBox' style={{height:'200px'}}>
                        <img src={`${MainURL}/images/uniteimage/${mainimage}`}
                          style={{maxHeight:'200px'}} alt={'등록된 사진이 없습니다.'} />
                      </div>
                    </div>
                    <div className="place__coname">
                      <p>{item.placeName}</p>
                    </div>
                    <div className="place__name">
                      <p>기간: {item.retreatDateStart} ~ {item.retreatDateEnd}</p>
                      <p>장소 {item.placeName}</p>
                    </div>
                  </div>
                )
              })
            } 
            </div>
          </div> */}

          <div className="main_bottom_cover">
            <div className="main_bottom_box"
              onClick={()=>{
                window.scrollTo(0, 0);
                navigate('/store');  
                // if (isLogin) {
                //   window.scrollTo(0, 0);
                //   navigate('/retreat/request');  
                // } else {
                //   alertLogin();
                // }
              }}
            >
              <div className="main_left_icon">
                <GrDocumentStore />
              </div>
              <div className="main_middle_text">
                <h1>구매&신청</h1>
                <p>디지털&모바일 전단지를</p>
                <p>신청할수 있습니다.</p>
              </div>
              <div className="main_right_link">
                <FaArrowRight />
              </div>
            </div>
            <div className="main_bottom_box"
              onClick={()=>{
                window.scrollTo(0, 0);
                navigate('/store/register');
                // if (isLogin) {
                //   window.scrollTo(0, 0);
                //   navigate('/store/review');
                // } else {
                //   alertLogin();
                // }
              }}
            >
              <div className="main_left_icon">
               <LuBookUp />
              </div>
              <div className="main_middle_text">
                <h1>전단지등록</h1>
                <p>교회 정보를</p>
                <p>등록해보세요.</p>
              </div>
              <div className="main_right_link">
                <FaArrowRight />
              </div>
            </div>
            <div className="main_bottom_box"
              onClick={()=>{
                window.scrollTo(0, 0);
                navigate('/company/advertise');
                // if (isLogin) {
                //   window.scrollTo(0, 0);
                //   navigate('/company/advertise');
                // } else {
                //   alertLogin();
                // }
              }}
            >
              <div className="main_left_icon">
                <RiAdvertisementLine />
              </div>
              <div className="main_middle_text">
                <h1>광고및제휴</h1>
                <p>광고나 제휴를 원하시면</p>
                <p>내용을 작성해서 신청해주세요.</p>
              </div>
              <div className="main_right_link">
                <FaArrowRight />
              </div>
            </div>
          </div>
          
				</div>	
  		</div> 
           
			<Footer />

		</div>
	);
}
