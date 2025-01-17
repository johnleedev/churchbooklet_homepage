import React, { useEffect, useRef, useState } from 'react';
import './Booklet.scss';
import './BookletDetail.scss';
import MainURL from '../../MainURL';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuTemplate from './MenuTemplate';
import axios from 'axios';
import { BsShare } from "react-icons/bs";
import { motion } from "framer-motion";

import TemplateNotice from './detailTemplates/TemplateNotice';
import TemplateServers from './detailTemplates/TemplateServers';
import TemplateMinistry from './detailTemplates/TemplateMinistry';
import TemplateGallery from './detailTemplates/TemplateGallery';
import TemplateEvents from './detailTemplates/TemplateEvents';
import TemplateEventDetail from './detailTemplates/TemplateEventDetail';


interface PostProps {
  id : number,
  type : string,
  sort: string,
  location : string;
  churchName: string;
  mainPastor: string;
  religiousbody : string;
  address : string,
  quiry: string,
  youtube:string;
  blog: string;
  instar: string;
  facebook: string;
  imageMainName : string,
  mainLogo: string;
  youtubeNoticeImage : string;
  youtubeNoticeUrl : string;
  placeNaver: string;
  placeKakao : string;
  placeHomepage : string;
}

interface GreetingProps {
  message: string;
  mainPastor: string;
  mainPastorImage: string;
  career:string[];
}
interface ServersProps {
  title: string;
  serverName : string;
  duty : string;
  notice : string;
  image : string;
}
interface WorshipTimesProps {
  order: string;
  time : string;
  place : string;
  worshipName : string;
  notice: string;
}

interface MinistryProps {
  title : string, 
  notice : string;
  images : string[];
}

interface EventsProps {
  title : string, 
  date : string;
  images : string[];
}

export default function BookletDetail (props:any) {

  const url = new URL(window.location.href);
  const ID = url.searchParams.get("id");
  const currentNum = url.searchParams.get("currentNum");
  const currentSubNum = url.searchParams.get("currentSubNum");

  const [selectedBtn, setAddrss] = useState('')

  let navigate = useNavigate();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [currentSelectTab, setCurrentSelectTab] = useState("info");
  
  const [postData, setPostData] = useState<PostProps>();
  const [greetingData, setGreetingData] = useState<GreetingProps>();
  const [pastorCareer, setPastorCareer] = useState<string[]>([]);
  const [serversData, setServersData] = useState<ServersProps[]>([]);
  const [worshipsImage, setWorshipsImage] = useState('');
  const [worshipsTimes, setWorshipsTimes] = useState<WorshipTimesProps[]>([]);
  const [ministryData, setMinistryData] = useState<MinistryProps[]>([]);
  const [eventsData, setEventsData] = useState<EventsProps[]>([]);
  const [eventDetailData, setEventDetailData] = useState<EventsProps>();
   
  // 게시글 가져오기
  const fetchPosts = async () => {
    const resBooklet = await axios.post(`${MainURL}/churchbookletbooklets/getdatabookletspart`, {
      id : ID
    })
    if (resBooklet.data) {
      const copy = {...resBooklet.data[0]}
      setPostData(copy);
    } 
    const resGreeting = await axios.post(`${MainURL}/churchbookletbooklets/getdatagreetingpart`, {
      id : ID
    })
    if (resGreeting.data) {
      let copy = {...resGreeting.data[0]}
      setGreetingData(copy);
      setPastorCareer(JSON.parse(copy.career));
    }
    const resServers = await axios.post(`${MainURL}/churchbookletbooklets/getdataserverspart`, {
      id : ID
    })
    if (resServers.data) {
      let copy = resServers.data;
      setServersData(copy);
    }
    const resWorships = await axios.post(`${MainURL}/churchbookletbooklets/getdataworshippart`, {
      id : ID
    })
    if (resWorships.data) {
      let copy = resWorships.data[0];
      let times = JSON.parse(copy.worshipTimes);
      let image = copy.worshipImage;
      setWorshipsTimes(times);
      setWorshipsImage(image);
    }
    const resMinistry = await axios.post(`${MainURL}/churchbookletbooklets/getdataministrypart`, {
      id : ID
    })
    if (resMinistry.data) {
      let copy = resMinistry.data;
      setMinistryData(copy);
    }
    const resEvents = await axios.post(`${MainURL}/churchbookletbooklets/getdataeventspart`, {
      id : ID
    })
    if (resEvents.data) {
      let copy = resEvents.data;
      setEventsData(copy);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);  

  const handleCopy = () => {
    navigator.clipboard.writeText(url.href).then(() => {
      alert('현재 링크 주소가 복사되었습니다.');
    }).catch((err) => {
      console.error('복사에 실패했습니다.', err);
    });
  };

  interface ServersGroup {
    title: string;
    serverList: ServersProps[];
  }

  const serversDataList: ServersGroup[] = serversData.reduce((acc: ServersGroup[], curr: ServersProps) => {
    const title = curr.title;
    const existingGroup = acc.find(group => group.title === title);
    const list: ServersProps = {
        title: curr.title,
        serverName : curr.serverName,
        duty : curr.duty,
        notice : curr.notice,
        image : curr.image
    };
    if (existingGroup) {
        existingGroup.serverList.push(list);
    } else {
        acc.push({
            title: title,
            serverList: [list]
        });
    }
    return acc;
  }, []);


  return  (
    <div className="Booklet_detail">

      <div className="homapage_main_imagebox">
        <img src={`${MainURL}/images/booklet_mainimages/${postData?.imageMainName}`} alt='profileImage'/>
        <div className="homapage_main_title">
          <img src={`${MainURL}/images/booklet_mainimages/${postData?.mainLogo}`} alt='profileImage'/>
        </div>
      </div>
   

      {/* <div className='main-title-box'>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0 }}>
            <h1>{postData?.titleEn1}</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
            <h2>{postData?.titleEn2}</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
            <h3>{postData?.title}</h3>
          </motion.div>
        </div> */}
        
        <div className="section" style={{marginTop:'100px'}}>
          <div className="selector__wrapper">
            <div className={`selector__bar ${currentSelectTab === "info" ? "on" : ""}`}
              onClick={() => {setCurrentSelectTab("info")}}
            >소개</div>
            <div className={`selector__bar ${currentSelectTab === "servers" ? "on" : ""}`}
              onClick={() => setCurrentSelectTab("servers")}
            >섬김이들</div>
            <div className={`selector__bar ${currentSelectTab === "ministry" ? "on" : ""}`}
              onClick={() => setCurrentSelectTab("ministry")}
            >사역</div>
            <div className={`selector__bar ${currentSelectTab === "events" ? "on" : ""}`}
              onClick={() => setCurrentSelectTab("events")}
            >교회행사</div>
          </div>
        </div>
  
        {
          (currentSelectTab === 'info' && greetingData !== undefined) &&
          <TemplateNotice postData={postData} greetingData={greetingData} 
            pastorCareer={pastorCareer} worshipsTimes={worshipsTimes} worshipsImage={worshipsImage}/>
        }
        {
          currentSelectTab === 'servers' &&
          <TemplateServers serversDataList={serversDataList}/>
        }
        {
          currentSelectTab === 'ministry' &&
          <TemplateMinistry ministryData={ministryData}/>
        }    
        {
          currentSelectTab === 'events' &&
          <TemplateEvents eventsData={eventsData} setEventDetailData={setEventDetailData} setCurrentSelectTab={setCurrentSelectTab}/>
        }       
        {
          currentSelectTab === 'eventDetail' &&
          <TemplateEventDetail eventDetailData={eventDetailData} setCurrentSelectTab={setCurrentSelectTab}/>
        }

    </div>
  )
}



