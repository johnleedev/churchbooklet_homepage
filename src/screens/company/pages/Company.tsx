import React, { useState } from 'react';
import '../Company.scss';
import Footer from '../../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import instarlogo from "../../../images/instarlogo.jpeg"
import kakaologo from "../../../images/login/kakao.png"
import MenuTemplate from '../MenuTemplate';

export default function Company() {
  
  let navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState(1);

  return (
    <div className='company'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} navigate={navigate} />

        <div className="subpage__main">
          <div className="subpage__main__title">소개</div>
          <div className="subpage__main__content">
           
            <div className="notice-cover">

              <div className="cover">
                <div className="notice right">
                  <h2>우리의 비전</h2>
                  <h4>Changing Culture, Changing World</h4>
                  <p>우리는 문화를 바꾸고, 세상을 바꿉니다.</p>
                </div>
              </div>

              <div className="cover">
                <div className="notice right">
                  <h2>우리의 목적</h2>
                  <p>'처치북'은 디지털 온라인 전단지를 서비스하는 플랫폼으로서</p>
                  <p>사용자들의 활용성 및 편의성 향상과 비용절감을 목표로하며</p>
                  <p>더 나아가 종이 인쇄물을 대체하여 환경보호에 기여하고자 합니다.</p>
                </div>
              </div>

              <div className="cover mobile">
                <div className="notice row">
                  <div className="notice-text-row">
                    <p className='notice-text-title'>활용성</p>
                    <p className="notice-text-right">직접 전달해야 하는 종이 전단지가 아니라, 온라인 상으로 쉽게 전달할 수 있는 있는 온라인 전단지입니다.</p>
                  </div>
                  <div className="notice-text-row">
                    <p className='notice-text-title'>편의성</p>
                    <p className="notice-text-right">언제 어디서나 핸드폰과 태블릿에서 볼 수 있는 처치북입니다.</p>
                  </div>
                </div>
              </div>

              <div className="cover">
                <div className="notice row">
                  <div className="notice-text-row">
                    <p className='notice-text-title'>비용절감</p>
                    <p className="notice-text-right">비싼 인쇄비를 지불해야 하는 종이 전단지를 대신함으로, 비용을 절감합니다.</p>
                  </div>
                  <div className="notice-text-row">
                    <p className='notice-text-title'>환경보호</p>
                    <p className="notice-text-right">많은 양의 종이 전단지를 대신함으로, 환경 보호에 기여할 수 있습니다.</p>
                  </div>
                </div>
              </div>

              <div className="cover">
                <div className="notice right">
                  <h2>처치북은 이를 목적으로 만들어진 플랫폼입니다.</h2>
                  <h2>처치북에서 보다 나은 문화를 경험해보세요!</h2>
                </div>
              </div>

              {/* <div className="cover">
                <div className="notice right">
                  <h2>관련링크</h2>
                  <a className='notice-row'
                    href='https://www.instagram.com/artsbook.co.kr' target='_blank'
                  >
                   <img src={instarlogo}/>
                   <div className="notice-row-textbox">
                    <p>##</p>
                    <p>처치북 공식 인스타그램</p>
                   </div>
                  </a>
                  <a className='notice-row'
                    href='http://pf.kakao.com/_xmwxoIn' target='_blank'
                  >
                   <img src={kakaologo}/>
                   <div className="notice-row-textbox">
                    <p>##</p>
                    <p>처치북 공식 카카오채널</p>
                   </div>
                  </a>
                </div>
              </div> */}

            </div>

          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

