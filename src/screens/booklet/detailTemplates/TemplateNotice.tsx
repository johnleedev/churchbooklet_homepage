import kakaologo from "../../../images/login/kakao.png"
import naverlogo from "../../../images/login/naver.png"
import naverbloglogo from "../../../images/naverblog.png"
import instarlogo from "../../../images/instarlogo.jpeg"
import facebooklogo from "../../../images/facebook.png"
import { MdHome } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import MainURL from '../../../MainURL';
import { PiChurchBold } from "react-icons/pi";
import { IoIosPersonAdd } from "react-icons/io";
import { RiOrganizationChart } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { IoShareSocialSharp } from "react-icons/io5";

export default function TemplateNotice(props:any) {

  return (
    <div className='notice-cover'>
      
      <div className='noticebox-sub'>
        <ul className="noticebox-sub-info">
          <li className="notice-list">
            <div className='notice-title'>
              <PiChurchBold className='notice-title-icon'/>
              <p className='notice-title-text'>교회명</p>
            </div>
            <p className='notice-bar'></p>
            <p className='notice-content notice-content-check'>{props.postData?.churchName}</p>
          </li>
          <li className="notice-list">
            <div className='notice-title'>
              <IoIosPersonAdd className='notice-title-icon'/>
              <p className='notice-title-text'>담임</p>
            </div>
            <p className='notice-bar'></p>
            <p className='notice-content notice-content-check'>{props.postData?.mainPastor}</p>
          </li>
          <li className="notice-list">
            <div className='notice-title'>
              <RiOrganizationChart className='notice-title-icon'/>
              <p className='notice-title-text'>교단</p>
            </div>
            <p className='notice-bar'></p>
            <p className='notice-content'>{props.postData?.religiousbody}</p>
          </li>
          <li className="notice-list">
            <div className='notice-title'>
              <FaLocationDot className='notice-title-icon'/>
              <p className='notice-title-text'>주소</p>
            </div>
            <p className='notice-bar'></p>
            <p className='notice-content'>{props.postData?.address}</p>
          </li>
          <li className="notice-list">
            <div className='notice-title'>
              <div className='notice-title-icon'>
                <img src={facebooklogo} />
              </div>
              <p className='notice-title-text'>유투브</p>
            </div>
            <p className='notice-bar'></p>
            <a href={props.postData?.youtube} className='notice-content' 
              style={{textDecoration:'underline', fontWeight:'normal'}} target='_blank'
            >{props.postData?.churchName} 유투브 채널</a>
          </li>
          <li className="notice-list">
            <div className='notice-title'>
              <FiPhone className='notice-title-icon'/>
              <p className='notice-title-text'>문의</p>
            </div>
            <p className='notice-bar'></p>
            <a href={`tel:${props.postData?.quiry}`} className='notice-content' 
              style={{textDecoration:'underline', fontWeight:'normal'}}
            >{props.postData?.quiry}</a>
          </li>
          <li className="notice-list">
            <div className='notice-title'>
              <IoShareSocialSharp className='notice-title-icon'/>
              <p className='notice-title-text'>SNS</p>
            </div>
            <p className='notice-bar'></p>
            <div className="notice-content">
              <a href={props.postData?.blog} className='notice-content-icon' 
                style={{textDecoration:'underline', fontWeight:'normal'}} target='_blank'
              >  <img src={naverbloglogo} /></a>
              <a href={props.postData?.instar} className='notice-content-icon' 
                style={{textDecoration:'underline', fontWeight:'normal'}} target='_blank'
              ><img src={instarlogo}/></a>
              <a href={props.postData?.facebook} className='notice-content-icon' 
                style={{textDecoration:'underline', fontWeight:'normal'}} target='_blank'
              ><img src={facebooklogo}/></a>
            </div>
          </li>
        </ul>
      </div>

      {/* <div className="homepage_detail_bottomRow"></div> */}

      <div className="homepage_detail_titlebox">
        <p className="homepage_detail_title">인사말</p>
      </div>

      <div className="greetingbox">
        <img src={`${MainURL}/images/booklet_mainimages/${props.greetingData.mainPastorImage}`} alt='profileImage'/>
        <div className="greeting-cover section">
          <div className="greeting-cover-content-cover">
            <div className="greeting-content-leftbox">
              <div className="greeting-content-message">
                {props.greetingData.message}
              </div>
            </div>
            <div className="greeting-content-rightbox">
              <div className="greeting-content-mainPastor">
                담임목사 {props.greetingData.mainPastor}
              </div>
              
              <div className="greeting-content-career">
                {
                  props.pastorCareer.map((item:any, index:any)=>{
                    return (
                      <div key={index} className="greeting-content-career-text">
                        &#183; {item}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="homepage_detail_bottomRow"></div>

      <div className="homepage_detail_titlebox">
        <p className="homepage_detail_title">예배안내</p>
      </div>

      <div className="worshipBox">
        <div className="worshipbox-sub-image">
          <div className="worship-image">
            <img src={`${MainURL}/images/booklet_mainimages/${props.worshipsImage}`} alt='postermain'/>
          </div>
        </div>
        <div className="worship-content-cover">
        {  
          props.worshipsTimes?.map((item:any, index:any)=>{

            return (
              <div className="worship-content" key={index}>
                <div className="worship-content-leftbox">
                  <div className="worship-content-worshipName">{item.worshipName}</div>
                  <div className="worship-content-notice">{item.notice}</div>
                </div>
                <div className="worship-content-divider"></div>
                <div className="worship-content-middlebox">
                  <div className="worship-content-day">{item.time}</div>
                </div>
                <div className="worship-content-divider"></div>
                <div className="worship-content-rightbox">
                  <div className="worship-content-place">{item.place}</div>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>

      <div className="homepage_detail_bottomRow"></div>

      <div className="homepage_detail_titlebox">
        <p className="homepage_detail_title">영상</p>
      </div>

      <div className='noticebox-youtubeBox'>
        <div className='noticebox-youtube'>
          <a href={props.postData?.youtubeNoticeUrl} target='_blank'>
            <img src={`${MainURL}/images/booklet_mainimages/${props.postData?.youtubeNoticeImage}`} alt='postermain'/>
          </a>
        </div>
      </div>

      <div className="homepage_detail_bottomRow"></div>

      <div className="homepage_detail_titlebox">
        <p className="homepage_detail_title">오시는길</p>
      </div>

      <div className='noticebox-mapBox'>
        
        <div className='noticebox-maptitle'>
          <div className="noticebox-maptitle-right">
            <div className="noticebox-maptitle-right-text">
              <div className='noticebox-maptitle-right-text-title' >{props.postData?.churchName}</div>
              <div className="noticebox-maptitle-divider-vertical for-pc"></div>  
              <div className='noticebox-maptitle-right-text-sub'>{props.postData?.address}</div>
            </div>
          </div>
        </div>
        <div className="noticebox-mapBtnBox section">
          <a className="noticebox-mapBtn"
            href={`${props.postData?.placeNaver}`} target='_blank'>
            <div className="noticebox-mapBtnImg">
              <img src={naverlogo}/>
            </div>
            <p className='noticebox-map-text'>네이버 지도</p>
            <IoIosArrowForward className='noticebox-map-icon'/>
          </a>
          <a  className="noticebox-mapBtn"
            href={`${props.postData?.placeKakao}`} target='_blank'>
            <div className="noticebox-mapBtnImg">
              <img src={kakaologo}/>
            </div>
            <p className='noticebox-map-text'>카카오 지도</p>
            <IoIosArrowForward className='noticebox-map-icon'/>
          </a>
          <a  className="noticebox-mapBtn"
            href={`${props.postData?.placeHomepage}`} target='_blank'>
            <div className="noticebox-mapBtnImg">
              <div className='noticebox-icon'><MdHome size={30}/></div>
            </div>
            <p className='noticebox-map-text'>홈페이지 정보</p>
            <IoIosArrowForward className='noticebox-map-icon'/>
          </a>
        </div>
      </div>

    </div>
  )
}



