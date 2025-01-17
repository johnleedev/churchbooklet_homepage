import React, { useCallback, useEffect, useRef, useState } from 'react';
import './RegisterImage.scss'
import Footer from '../../components/Footer';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import axios from 'axios'
import MainURL from "../../MainURL";
import { useLocation, useNavigate } from 'react-router-dom';
import SubTitle from '../../components/SubTitle';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
// import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import { FaArrowLeft } from "react-icons/fa6";
import { SlMagnifier } from "react-icons/sl";
import DaumPostcode from 'react-daum-postcode';
import Loading from '../../components/Loading';
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdOutlineHomeWork, MdOutlineAdsClick, MdOutlineHandshake } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LuTicket } from "react-icons/lu";


export default function RegisterImage(props:any) {

  let navigate = useNavigate();
   const useLocationCopy = useLocation();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // -------------------------------------------------------
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
  // 포스터 형식 선택 ----------------------------------------------
  const [selectStylePoster, setSelectStylePoster] = useState(0);
    
  // 이미지 첨부 함수 ----------------------------------------------

  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000
      };
      const resizedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          setImageLoading(true);
          const resizingBlob = await imageCompression(file, options);
          setImageLoading(false);
          return resizingBlob;
        })
      );
      const copy = new File(resizedFiles, acceptedFiles[0].name, { type: acceptedFiles[0].type });
      setImageFiles([copy]);
    } catch (error) {
      console.error('이미지 리사이징 중 오류 발생:', error);
    }
  }, [setImageFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  

  // // 프로그램 전단지 정보 등록 함수 ----------------------------------------------
  // const registerPost = async () => {
  //   // navigate('/registerprogram', {state : { 
  //   //           pamphletID : 100, type: 'small', part : 'Tenor', sort: 'Vocal'
  //   //         }});
  //   setIsLoading(true);
  //   const formData = new FormData();
  //   formData.append("img", imageFiles[0]);
  //   const getParams = {
  //     userAccount : 'johnleedev@naver.com', userName: '이요한',
  //     registerDate : formatToday, type: useLocationCopy.state.type, playerNum : useLocationCopy.state.playerNum,
  //     sort: sort, title: title, location: location, date: date, dateOrigin: dateOrigin,
  //     time : time, place : place, address : address, 
  //     superViser :superViser, supporter : supporter,
  //     ticket :ticket, ticketReserve: ticketReserve, quiry :quiry,
  //     imageName : imageFiles[0].name,
  //   }
  //   axios 
  //     .post(`${MainURL}/booklets/postdefault`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       params: getParams,
  //     })
  //     .then((res) => {
  //       if (res.data.success === true) {
  //         alert('입력되었습니다.');
  //         navigate('/registerprogram', {state : { 
  //           pamphletID : res.data.pamphletID, type: useLocationCopy.state.type, part : part, sort: sort 
  //         }}); 
  //       } else {
  //         alert(res.data);
  //       }
  //     })
  //     .catch(() => {
  //       console.log('실패함')
  //     })
  // };

  return isLoading
    ? (
    <div style={{flex:1, width:'100%', height:'80vh'}}>
      <Loading /> 
    </div>
    ) : (
    <div>
      {/* 기본정보 */}
      

      <div className='registerDefaultBox'>
        <div className="register name"><p>포스터</p></div>
        <div className="divider"></div>

        {/* // -------------------------------------------------------- */}
        {
          selectStylePoster === 0 &&
          <div className="register select">
            <div className='noticeArea'>
              포스터 이미지 형식 선택
            </div>
            <div className='selectArea'>
              <div className="selectboxCover">
                <div className="selectbox" onClick={()=>{setSelectStylePoster(1)}}>
                  <p>이미 제작된 포스터 이미지 파일을</p>
                  <p>가지고 있어요</p>
                </div>
              </div>
              <div className="selectboxCover">
                <div className="selectbox" onClick={()=>{setSelectStylePoster(2)}}>
                  <p>여기서 간단하게 만들래요</p>
                </div>
              </div>
              <div className="selectboxCover">
                <div className="selectbox" onClick={()=>{setSelectStylePoster(3)}}>
                  <p>처치북의 전문 디자이너에게</p>
                  <p>포스터 디자인을 맡길래요</p>
                </div>
              </div>
            </div>
          </div> 
        }
      
        {/* // -------------------------------------------------------- */}
        {
          (selectStylePoster === 1 || selectStylePoster === 3) &&
          <div className="register poster">
            <div className='backBtn' onClick={()=>{setSelectStylePoster(0)}}><FaArrowLeft /></div>
            {
              imageFiles.length > 0 ? null : 
              <p className='noticeText'>
                { selectStylePoster === 1 && "* 포스터 이미지 파일을 첨부해 주세요"}
                { selectStylePoster === 3 && "* 프로필 이미지 파일을 첨부해 주세요"}
              </p>
            }
            <div className='imageContainer'>
              <div
                className="imageBox" 
              >
                {imageFiles.length > 0 ? (
                  <img
                    src={URL.createObjectURL(imageFiles[0])}
                    style={{ width: '100%', height: '100%'}}
                  />
                  ) : (
                    <>
                    {
                      imageLoading ?
                      <div style={{width:'100%', height:'100%', position:'absolute'}}>
                        <Loading/>
                      </div>
                      :
                      <div {...getRootProps()} className="imageDropzoneStyle" >
                        <input {...getInputProps()} />
                        <div className='imageplus'>+</div>
                      </div>
                    } 
                    </>
                  )
                }
              </div>
            </div>
            {
              imageFiles.length > 0 &&
              <div className='imageControlBtn-default' onClick={()=>{setImageFiles([])}}>삭제하기</div>
            }
          </div>
        }
        

        {/* // -------------------------------------------------------- */}
        
        { selectStylePoster === 2 &&
          <>
          <div className="register poster">
            <div className='backBtn' onClick={()=>{setSelectStylePoster(0)}}><FaArrowLeft /></div>
            { imageFiles.length > 0 ? null : <p className='noticeText'>* 먼저 프로필 이미지 파일을 첨부해 주세요(2MB이하만 가능)</p> }
            {/* <div className='imageContainer'ref={captureArea}>
              <div
                className="imageBox" 
                style={{width: `${selectWidth}px`, height: `${selectHeight}px`}}
              >
                {imageFiles.length > 0 ? (
                  <img
                    src={URL.createObjectURL(imageFiles[0])}
                    style={{ width: '100%', height: '100%'}}
                  />
                  ) : (
                    <>
                    {
                      imageLoading ?
                      <div style={{width:'100%', height:'100%', position:'absolute'}}>
                        <Loading/>
                      </div>
                      :
                      <div {...getRootProps()} className="imageDropzoneStyle" >
                        <input {...getInputProps()} />
                        <div className='imageplus'>+</div>
                      </div>
                    } 
                    </>
                  )
                }
              </div>
              {
                imageFiles.length > 0 &&
                <div className="cover" style={{width: `${selectWidth}px`, height: `${selectHeight}px`}}>
                  <div className={`style${selectStyle} title`} style={{color:selectColor1, top:selectTop1}}>{title}</div>
                  <div className={`style${selectStyle} part-name`} style={{color:selectColor2, top:selectTop2}}>
                    <div className="part">{part}</div>
                    <div className="nameEn">{nameEn}</div>
                    <div className="recital">RECITAL</div>
                  </div>
                  <div className={`style${selectStyle} date-time`} style={{bottom:selectBottom1}}>
                    <div className="date">{date}</div>
                    <div className="time">{time}</div>
                  </div>
                  <div className={`style${selectStyle} place`} style={{bottom:selectBottom2}}>{place}</div>
                  <div className={`style${selectStyle} superViser-supporter`} style={{bottom:selectBottom3}}>
                    { superViser !== '' && <div className="sublist superViser">주관:<p>{superViser}</p></div>}
                    { supporter !== '' && <div className="sublist supporter">후원:<p>{supporter}</p></div>}
                  </div>
                  <div className={`style${selectStyle} ticket-quiry`} style={{bottom:selectBottom4}}>
                    { ticket !== '' && <div className="sublist ticket">티켓:<p>{ticket}</p></div>}
                    { ticketReserve !== '' &&  <div className="sublist ticketReserve">예매처:<p>{ticketReserve}</p></div>}
                    <div className="sublist quiry">문의:<p>{quiry}</p></div>
                  </div>
                  <img src={logo} className={`style${selectStyle} logo`}/>
                </div>
              }
            </div> */}
          </div>
          
          </>
        }
      </div>


      <div className="buttonbox">
        <div className="button" onClick={()=>{
          navigate('/registertypeselect'); 
        }}>
          <p>이전</p>
        </div>
        <div className="button" 
        // onClick={registerPost}
        >
          <p>다음</p>
        </div>
      </div>
    </div>
  );
}

