import React, { useEffect, useRef, useState } from 'react';
import './RegisterSolo.scss';
import MainURL from '../../MainURL';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterDefault from './RegisterDefault';
import RegisterImage from './RegisterImage';
import RegisterProgram from './RegisterProgram';


export default function MainSoloRegister (props:any) {

  let navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState(2);
  const location = useLocation()
  // const paramsData = location.state.data;
  
  const [refresh, setRefresh] = useState<boolean>(false);
  const [currentSelectTab, setCurrentSelectTab] = useState("info");
  
  
  return  (
    <div className="main-register-solo">

      <div className="inner">
        
        <div className="subpage__main">
          <div className="subpage__main__title">
            <div className="subpage__main__title">
              <h3>전단지등록(solo)</h3>
            </div>
          </div>

          <div className="subpage__main__content">

            <div className="main__content_registertitle">
              {/* <p>{paramsData.data.title}</p> */}
            </div>
            <div className="main__content forpc">

              <div className="selector__wrapper">
                <div className={`selector__bar ${currentSelectTab === "info" ? "on" : ""}`}
                  onClick={() => {setCurrentSelectTab("info")}}
                >연주회정보</div>
                <div className={`selector__bar ${currentSelectTab === "image" ? "on" : ""}`}
                  onClick={() => {setCurrentSelectTab("image")}}
                >이미지</div>
                <div className={`selector__bar ${currentSelectTab === "program" ? "on" : ""}`}
                  onClick={() => setCurrentSelectTab("program")}
                >프로그램</div>
                <div className={`selector__bar ${currentSelectTab === "profile" ? "on" : ""}`}
                  onClick={() => setCurrentSelectTab("profile")}
                >프로필</div>
              </div>

              {
                currentSelectTab === 'info' &&
                <RegisterDefault type='solo' />
              }

              {/* {
                currentSelectTab === 'image' &&
                <RegisterImage />
              }
              
              
              {
                currentSelectTab === 'program' &&
                <RegisterProgram />
              }
              
                        
              {
                currentSelectTab === 'profile' &&
                <div className="careerbox">
                
                </div>
              } */}

 
            </div>

            <div className="main__content formobile">
              <p>모바일에서는 사용이 불가합니다.</p>
            </div>
          </div>

        </div>

      </div>
      <Footer/>
    </div>
  )
}



