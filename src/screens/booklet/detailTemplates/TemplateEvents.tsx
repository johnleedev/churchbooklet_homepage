import YouTube from 'react-youtube';
import MainURL from '../../../MainURL';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function TemplateEvents (props:any) {

  return (
    <div className="events-cover">
      {  
        props.eventsData?.map((item:any, index:any)=>{

          const imagesCopy = JSON.parse(item.images);

          return (
            <div className="events-content" key={index}
              onClick={()=>{
                props.setEventDetailData(item);
                props.setCurrentSelectTab('eventDetail');
                window.scrollTo(0, 800);
              }}
            >
              <div className="events-content-imagebox">
                <div className="events-content-image">
                  <img src={`${MainURL}/images/booklet_events/${imagesCopy[0]}`} alt='profileImage'/>
                </div>
                <div className='link-textbox'>
                  <p>상세보기</p>
                  <MdKeyboardDoubleArrowRight size={16}/>
                </div>
              </div>
              <div className="events-content-textbox">
                <div className="events-content-eventsName">{item.title}</div>
                <div className="events-content-notice">{item.date}</div>
              </div>
            </div>
          )
        })
      }
    </div>  
  )
}



