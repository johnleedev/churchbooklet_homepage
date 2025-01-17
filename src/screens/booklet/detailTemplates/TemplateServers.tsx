import kakaologo from "../../../images/login/kakao.png"
import naverlogo from "../../../images/login/naver.png"
import { MdHome } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime, IoIosArrowForward } from "react-icons/io";
import { FiMinus, FiPhone, FiPlus } from "react-icons/fi";
import MainURL from '../../../MainURL';

export default function TemplateServers(props:any) {


  return (
    <div className="servers-cover">
    {
      props.serversDataList.map((item:any, index:any)=>{

        return (
          <div className="servers-content-cover" key={index}>
            <div className="homepage_detail_titlebox">
              <p className="homepage_detail_title">{item.title}</p>
            </div>
            <div className="servers-content-cover">
            {
              item.serverList.map((subItem:any, subIndex:any)=>{
                return (
                <div className="servers-content-box" key={subIndex}>
                  <div className="servers-content-imagebox">
                    <img src={`${MainURL}/images/booklet_servers/${subItem.image}`} alt='profileImage'/>
                  </div>
                  <div className="servers-content-textbox">
                    <div className="servers-content-serversName">{subItem.serverName}</div>
                    <div className="servers-content-notice">{subItem.duty}</div>
                    <div className="servers-content-notice">{subItem.notice}</div>
                  </div>
                </div>
                )
              })
            }
            </div>
          </div>
        )
      })
    }
    </div>  
  )
}



