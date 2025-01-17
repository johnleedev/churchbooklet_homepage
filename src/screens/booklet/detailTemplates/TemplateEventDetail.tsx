import YouTube from 'react-youtube';
import MainURL from '../../../MainURL';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function TemplateEventDetail (props:any) {

  const data = props.eventDetailData;
  const imags = JSON.parse(data.images);

  return (
    <div className="eventDetail-cover">
      <div className="eventDetail-content-textbox">
        <div className="eventDetail-content-eventsName">{data.title}</div>
        <div className="eventDetail-content-notice">일시: {data.date}</div>
      </div>
      <div className="eventDetail-content-imagebox">
        {
          imags.map((item:any, index:any)=>{
            return (
              <div className="eventDetail-content-image" key={index}>
                <img src={`${MainURL}/images/booklet_events/${item}`} alt='profileImage'/>
              </div>
            )
          })
        }
      </div>
      <div className="eventDetail-content-btnbox">
        <div className="eventDetail-content-btn"
          onClick={()=>{
            window.scrollTo(0, 800);
            props.setCurrentSelectTab("events");
          }}
        >
          <p>목록보기</p>
        </div>
      </div>
    </div>  
  )
}



