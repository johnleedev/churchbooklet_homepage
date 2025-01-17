import React, { useCallback, useEffect, useRef, useState } from 'react';
import './RegisterDefault.scss'
import axios from 'axios'
import MainURL from "../../MainURL";
import { useLocation, useNavigate } from 'react-router-dom';
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


export default function RegisterDefault(props:any) {

  let navigate = useNavigate();
  
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dateCopy = new Date();
  const yearCopy = dateCopy.getFullYear();
  const monthOrigin = dateCopy.getMonth() + 1;
  const monthCopy = monthOrigin < 10 ? `0${monthOrigin}` : monthOrigin;
  const dayOrigin = dateCopy.getDate();
  const dayCopy = dayOrigin < 10 ? `0${dayOrigin}` : dayOrigin;
  const formatToday = `${yearCopy}${monthCopy}${dayCopy}`;
  
  // -------------------------------------------------------
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [sort, setSort] = useState('Orchestral');
  const [selectSort, setSelectSort] = useState(1);
  const [part, setPart] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [dateOrigin, setDateOrigin] = useState('');
  const [time, setTime] = useState('PM 7:30');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [superViser, setSuperViser] = useState('');
  const [supporter, setSupporter] = useState('');
  const [ticket, setTicket] = useState('');
  const [ticketReserve, setTicketReserve] = useState('');
  const [quiry, setQuiry] = useState('');  

  // 구분 선택 ----------------------------------------------
  const sortOptions = [
    { value: 'Orchestral', label: '관현악' },
    { value: 'Vocal', label: '성악' },
    { value: 'Piano', label: '피아노' }
  ];

  // 파트 선택 ----------------------------------------------
  const partOptionsOrchestral = [
    { value: 'VIOLIN', label: 'Violin'},
    { value: 'VIOLA', label: 'Viola'},
    { value: 'CELLO', label: 'Cello'}, 
    { value: 'D.BASS', label: 'D.BASS'}, 
    { value: 'FLUTE', label: 'Flute'}, 
    { value: 'CLARINET', label: 'Clarinet'}, 
    { value: 'OBOE', label: 'Oboe'}, 
    { value: 'BASSOON', label: 'Bassoon'}, 
    { value: 'HORN', label: 'Horn'}, 
    { value: 'TRUMPET', label: 'Trumpet'}, 
    { value: 'TROMBONE', label: 'Trombone'}, 
    { value: 'TUBA', label: 'Tuba'}, 
    { value: 'HARP', label: 'Harp'}, 
    { value: 'PERCUSSION', label: 'Percussion'}
  ];

  const partOptionsVocal = [
    { value: 'SOPRANO', label: 'Soprano' },
    { value: 'MEZZO SOPRANO', label: 'Mezzo Soprano' },
    { value: 'TENOR', label: 'Tenor' },
    { value: 'BARITONE', label: 'Baritone' },
    { value: 'BASS', label: 'Bass' },
  ];

  // const partOptionsKorean = [
  //   { value: 'koreanVocal', label: '판소리' },
  //   { value: 'gayagem', label: '가야금' },
  //   { value: 'gumungo', label: '거문고' },
  //   { value: 'haegem', label: '해금' },
  //   { value: 'daegem', label: '대금' },
  //   { value: 'piri', label: '피리' },
  //   { value: 'ajaeng', label: '아쟁' },
  //   { value: 'koreanComposition', label: '작곡' }
  // ];

  // const partOptionsPractical = [
  //   { value: '', label: '보컬' },
  //   { value: '', label: '건반' },
  //   { value: '', label: '기타' },
  //   { value: '', label: '드럼' },
  // ];



  // 지역 선택 ----------------------------------------------
  const locationOptions = [
    { value: '선택', label: '선택' },
    { value: '서울', label: '서울' },
    { value: '인천/경기', label: '인천/경기' },
    { value: '대전/세종/충청', label: '대전/세종/충청' },
    { value: '광주/전라', label: '광주/전라' },
    { value: '대구/경북', label: '대구/경북' },
    { value: '부산/경남', label: '부산/경남' },
  ];

  const [selectedLocationOption, setSelectedLocationOption] = useState(locationOptions[0]);
  const handleSelectLocationChange = ( event : any) => {
   setSelectedLocationOption(event);
   setLocation(event.label);
  }

  // 날짜 선택 ----------------------------------------------
  const [startDate, setStartDate] = useState();
  const handleSelectDateChange = ( event : any) => {
    setStartDate(event);
    const day = format(event, 'EEE', {  });
    const copy = event.toLocaleDateString('ko-KR');
    const splitCopy = copy.split('. ');
    const thirdText = splitCopy[2].slice(0, -1);
    const reformmedTextko = `${splitCopy[0]}년 ${splitCopy[1]}월 ${thirdText}일 (${day})`
    const splitCopy2Copy = splitCopy[1] < 10 ? `0${splitCopy[1]}` : splitCopy[1];
    const splitCopy3Copy = splitCopy[2] < 10 ? `0${splitCopy[2]}` : splitCopy[2];
    const reformmedText = `${splitCopy[0]}.${splitCopy2Copy}.${splitCopy3Copy}`;
    setDate(reformmedTextko);
    setDateOrigin(reformmedText);
  }

  // 시간 선택 ----------------------------------------------
  const timeOptions = [
    { value: '선택', label: '선택' },
    { value: 'AM 10:00', label: 'AM 10:00' },
    { value: 'AM 10:30', label: 'AM 10:30' },
    { value: 'AM 11:00', label: 'AM 11:00' },
    { value: 'AM 11:30', label: 'AM 11:30' },
    { value: 'PM 12:00', label: 'PM 12:00' },
    { value: 'PM 12:30', label: 'PM 12:30' },
    { value: 'PM 1:00', label: 'PM 1:00' },
    { value: 'PM 1:30', label: 'PM 1:30' },
    { value: 'PM 2:00', label: 'PM 2:00' },
    { value: 'PM 2:30', label: 'PM 2:30' },
    { value: 'PM 3:00', label: 'PM 3:00' },
    { value: 'PM 3:30', label: 'PM 3:30' },
    { value: 'PM 4:00', label: 'PM 4:00' },
    { value: 'PM 4:30', label: 'PM 4:30' },
    { value: 'PM 5:00', label: 'PM 5:00' },
    { value: 'PM 5:30', label: 'PM 5:30' },
    { value: 'PM 6:00', label: 'PM 6:00' },
    { value: 'PM 6:30', label: 'PM 6:30' },
    { value: 'PM 7:00', label: 'PM 7:00' },
    { value: 'PM 7:30', label: 'PM 7:30' },
    { value: 'PM 8:00', label: 'PM 8:00' },
    { value: 'PM 8:30', label: 'PM 8:30' },

  ];

  const [selectedTimeOption, setSelectedTimeOption] = useState(timeOptions[20]);
  const handleSelectTimeChange = ( event : any) => {
   setSelectedTimeOption(event);
   setTime(event.label);
  }


  // 장소 DB 가져오기 ----------------------------------------------
  interface placeListProps {
    id : number,
    place: string,
    address : string,
  }

  const [placeList, setPlaceList] = useState<placeListProps[]>([]);
  const [viewAutoComplete, setViewAutoComplete] = useState<boolean>(false);
  const [dropDownList, setDropDownList] = useState<placeListProps[]>([]);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [isComposing, setIsComposing] = useState(false);

  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/datacontrol/dataplace`)
    if (res) {
      let copy = res.data;
      setPlaceList(copy);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);


  // 장소 입력란 자동완성  ----------------------------------------------
  const handlePlaceSelect = (e:any) => {
    setPlace(e.target.value);
    setViewAutoComplete(true);
    handleAutoComplete(e.target.value);
  }

  const handleAutoComplete = (text : string ) => {
    const copy = placeList.filter((e: any) => e.place.includes(text) === true);
    setDropDownList(copy);
  }

  const handleDropDownKey = (event:any) => {
    if (isComposing) return;
    if (viewAutoComplete) {
      if (event.key === 'ArrowDown' && dropDownItemIndex === -1) {
        setDropDownItemIndex(0)
      } else if (event.key === 'ArrowDown' && dropDownItemIndex >= 0 && dropDownItemIndex !== dropDownList.length - 1) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      } else if (event.key === 'ArrowDown' && dropDownItemIndex === dropDownList.length - 1) {
        return
      } else if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) {
        setDropDownItemIndex(dropDownItemIndex - 1)
      } else if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        setPlace(dropDownList[dropDownItemIndex].place);
        setAddress(dropDownList[dropDownItemIndex].address);
        setViewAutoComplete(false);
        setDropDownItemIndex(-1)
      } else if (event.key === 'Enter' && dropDownItemIndex === -1) {
        setViewAutoComplete(false);
      }
    }
  }
  
  // 주소 입력란  ----------------------------------------------
  const [viewAddress, setViewAddress] = useState<boolean>(false);
  
  const onCompletePost = (data:any) => {
    setViewAddress(false);
    setAddress(data.address);
  }

  // 문의 입력란 숫자 확인 ----------------------------------------------
  const onChangequiry = (text : any) => {
    const quiryRegex = /[\d -]+$/;
    if (!quiryRegex.test(text)) {
      alert('숫자와 -로만 입력해주세요')
    } else {
      setQuiry(text);
    }
  };  

 // 프로그램 전단지 정보 등록 함수 ----------------------------------------------
  const registerPost = async () => {
    const getParams = {
      registerDate : formatToday, 
      // type: useLocationCopy.state.type, 
      // playerNum : useLocationCopy.state.playerNum,
      sort: sort, 
      title: title, 
      location: location, 
      date: date, 
      dateOrigin: dateOrigin,
      time : time, 
      place : place, 
      address : address, 
      superViser :superViser, 
      supporter : supporter,
      ticket :ticket, 
      ticketReserve: ticketReserve, 
      quiry :quiry,
      imageName : imageFiles[0].name,
    }
    axios 
      .post(`${MainURL}/booklets/postdefault`, getParams)
      .then((res) => {
        if (res.data.success === true) {
          alert('입력되었습니다.');
        } else {
          alert(res.data);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  return isLoading
    ? (
    <div style={{flex:1, width:'100%', height:'80vh'}}>
      <Loading /> 
    </div>
    ) : (
      <div className='registerDefaultBox'>
       
        <div className="register-content">

          <div className="register-inputbox">
            <div className="register-name">
              <p>구분</p>
            </div>
            <div className='register-selectInput'>
              <div className={selectSort === 1 ? 'sortSelectBox selected' : 'sortSelectBox'} 
                onClick={()=>{setSelectSort(1); setSort(sortOptions[0].value)}}>
                {sortOptions[0].label}
              </div>
              <div className={selectSort === 2 ? 'sortSelectBox selected' : 'sortSelectBox'} 
                  onClick={()=>{setSelectSort(2); setSort(sortOptions[1].value)}}>
                {sortOptions[1].label}
              </div>
              <div className={selectSort === 3 ? 'sortSelectBox selected' : 'sortSelectBox'} 
                onClick={()=>{setSelectSort(3); setSort(sortOptions[2].value); setPart('Piano')}}>
                {sortOptions[2].label}
              </div>
            </div>
          </div>
          {
            props.type === 'solo' &&
            <div className="register-inputbox">
              <div className="register-name">
                <p>파트</p>
              </div>
              <div className='register-input'>
                { selectSort === 1 && 
                  <select value={part} onChange={(e)=>{setPart(e.target.value)}} className="input">
                    {partOptionsOrchestral.map((option:any, index:any) => (
                      <option key={index} value={option.value}>{option.label}</option>
                    ))}
                  </select>}
                { selectSort === 2 && 
                <select value={part} onChange={(e)=>{setPart(e.target.value)}} className="input">
                  {partOptionsVocal.map((option:any, index:any) => (
                    <option key={index} value={option.value}>{option.label}</option>
                  ))}
                </select>}
                { selectSort === 3 && 
                <input type="text" onChange={(e)=>{setPart(e.target.value)}} value={part}/>
                }
              </div>
            </div>
          }
          <div className="register-inputbox">
            <div className="register-name">
              <p>영문 이름</p>
              <p style={{fontSize:12}}>(선택/포스터용)</p>
            </div>
            <div className='register-input'>
              <input type="text" onChange={(e)=>{setNameEn(e.target.value)}} value={nameEn} 
                placeholder={ 'ex) Hong Gildong'}/>
            </div>
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p>지역</p>
            </div>
            <div className='register-input'>
              <select value={location} onChange={(e)=>{setLocation(e.target.value)}} className="input">
                {locationOptions.map((option:any, index:any) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p className='register-name-text'>날짜</p>
            </div>
            <div className='register-input'>
              <DatePicker
                dateFormat='yyyy년 MM월 dd일 (eee)'
                shouldCloseOnSelect
                minDate={new Date('2022-01-01')}
                selected={startDate}
                onChange={handleSelectDateChange}
              />
            </div>
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p className='register-name-text'>시간</p>
            </div>
            <Select
              className='input'
              value={selectedTimeOption}
              onChange={handleSelectTimeChange}
              options={timeOptions}
            />
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p className='register-name-text'>장소명</p>
            </div>
            <div className='register-input'>
              <input type="text" value={place}
                onChange={handlePlaceSelect}
                onBlur={()=>{setViewAutoComplete(false)}}
                onKeyDown={handleDropDownKey}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
              />
            </div>
            { place !== '' && viewAutoComplete &&
              <div className="autoComplete">
                { dropDownList.length === 0 && (
                  <div className='dropDownList'>해당하는 단어가 없습니다</div>
                )}
                { dropDownList.length > 0 && 
                <>
                  <div className='dropDownList' style={{fontSize:10}}>(아래 화살표를 눌러서 선택하세요)</div>
                  { 
                    dropDownList.map((item:any, index:any)=>{
                      return(
                        <div key={index} className={dropDownItemIndex === index ? 'dropDownList selected' : 'dropDownList'}>{item.place}</div>
                      )
                    })
                  }
                </>  
                }
              </div>  
            }              
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p>주소</p>
            </div>
            <div className='register-input' style={{display:'flex', flexDirection:'column'}}>
              <input type="text" onChange={(e)=>{setAddress(e.target.value)}} value={address} />
                <div className='magnifyIcon' onClick={()=>{setViewAddress(true)}}>
                  <p>주소검색</p>
                  <SlMagnifier />
                </div>
              </div>
              {
                viewAddress &&
                <div className='DaumPostBox'>
                  <DaumPostcode
                    onComplete={onCompletePost}
                  ></DaumPostcode>
                </div>
              }
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p className='register-name-text'>주관/주최</p>
              <p style={{fontSize:12}}>(선택)</p>
            </div>
            <div className='register-input'>
              <input type="text" onChange={(e)=>{setSuperViser(e.target.value)}} value={superViser} />
            </div>
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p className='register-name-text'>후원</p>
              <p style={{fontSize:12}}>(선택)</p>
            </div>
            <div className='register-input'>
              <input type="text" onChange={(e)=>{setSupporter(e.target.value)}} value={supporter} />
            </div>
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p className='register-name-text'>티켓</p>
              <p style={{fontSize:12}}>(선택)</p>
            </div>
            <div className='register-input'>
              <input type="text" onChange={(e)=>{setTicket(e.target.value)}} value={ticket} placeholder='ex) 전석 1만원' />
            </div>  
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p className='register-name-text'>티켓예매</p>
              <p style={{fontSize:12}}>(선택)</p>
            </div>
            <div className='register-input'>
              <input type="text" onChange={(e)=>{setTicketReserve(e.target.value)}} value={ticketReserve} placeholder='티켓 예매 링크를 입력해주세요'/>
            </div>
          </div>
          <div className="register-inputbox">
            <div className="register-name">
              <p className='register-name-text'>문의</p>
            </div>
            <div className='register-input'>
              <input type="text" onChange={(e)=>{onChangequiry(e.target.value)}} value={quiry} />
            </div>
          </div>
        </div>

        <div className="buttonbox">
          <div className="button" onClick={()=>{
            navigate(-1); 
          }}>
            <p>이전</p>
          </div>
          <div className="button" 
            onClick={registerPost}
          >
            <p>다음</p>
          </div>
        </div>
    </div>
  );
}

