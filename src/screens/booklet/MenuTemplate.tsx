import React from 'react';
import { useRecoilValue } from 'recoil';
import { recoilLoginState, recoilUserData } from '../../RecoilStore';

export default function MenuTemplate(props:any) {

  const isLogin = useRecoilValue(recoilLoginState);
  const userData = useRecoilValue(recoilUserData);

  const alertLogin = () => {
    alert('로그인이 필요합니다.');
    props.navigate('/login');
  }

  const alertRequest = () => {
    alert('본 게시판은 정회원만 접근할 수 있습니다. 등업 게시판에서 등업신청을 해주세요.');
    props.navigate('/store/graderequest');
  }

  interface SelectMenuProps {
    menuNum : number;
    title: string;
    url : string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ menuNum, title, url}) => {
    return (
      <div onClick={()=>{
        props.navigate(`/booklets${url}`)
        // if (isLogin) {
        //   if (userData.grade === '정회원') {
        //     props.navigate(`/retreat${url}`)
        //   } else {
        //     alertRequest();
        //   }
        //  } else {
        //   alertLogin();
        //  }
      }}
        className={parseInt(props.currentNum) === menuNum ? "subpage__menu__item subpage__menu__item--on" : "subpage__menu__item"}>
        {title}
      </div>
    )    
  };

  interface SelectSubMenuProps {
    menuSubNum : number;
    title: string;
    url : string;
  }
  const SelectSubMenu: React.FC<SelectSubMenuProps> = ({ menuSubNum, title, url}) => {
    return (
      <div onClick={()=>{
        props.navigate(`/booklets${url}`)
        // if (isLogin) {
        //   if (userData.grade === '정회원') {
        //     props.navigate(`/retreat${url}`)
        //   } else {
        //     alertRequest();
        //   }
        //  } else {
        //   alertLogin();
        //  }
      }}
        className={parseInt(props.currentSubNum) === menuSubNum ? "subpage__menu__item__sub subpage__menu__item--on__sub" : "subpage__menu__item__sub"}>
        {title}
      </div>
    )    
  };

  return (
    <div className="subpage__menu">
      <div className="subpage__menu__title">e-전단지</div>
      
      <div className="subpage__menu__list menu__desktop">
        <SelectMenu title='교회소개' menuNum={1} url={'/'}/>
        {/* <SelectMenu title='졸업연주회' menuNum={2} url={'/graduate'}/> */}
        {/* {
          (props.currentNum === 1 || props.currentNum === '1') &&
          <div className="subpage__menu__list__sub">
            <SelectSubMenu title='독창회&독주회' menuSubNum={1} url={'/music/solo'}/>
            <SelectSubMenu title='졸업연주회' menuSubNum={2} url={'/music/graduate'}/>
            <SelectSubMenu title='소형연주회(2~10인)' menuSubNum={3} url={'/music/small'}/>
            <SelectSubMenu title='대형연주회(10인이상)' menuSubNum={4} url={'/music/big'}/>
            <SelectSubMenu title='교향악&합창&오페라' menuSubNum={5} url={'/music/complex'}/>
          </div>
        } */}
        {/* <SelectMenu title='국악연주회' menuNum={2} url={'/korean'}/>
        <SelectMenu title='무용공연' menuNum={3} url={'/dance'}/> */}
      </div>

      <div className="subpage__menu__list menu__mobile">
        <SelectMenu title='교회소개' menuNum={1} url={'/'}/>
        {/* <SelectMenu title='졸업연주회' menuNum={2} url={'/graduate'}/> */}
        {/* {
          (props.currentNum === 1 || props.currentNum === '1') &&
          <>
            <div className="subpage__menu__list__sub">
              <SelectSubMenu title='독창회&독주회' menuSubNum={1} url={'/music/solo'}/>
              <SelectSubMenu title='졸업연주회' menuSubNum={2} url={'/music/graduate'}/>
              <SelectSubMenu title='소형연주회(2~10인)' menuSubNum={3} url={'/music/small'}/>
              <SelectSubMenu title='대형연주회(10인이상)' menuSubNum={4} url={'/music/big'}/>
              <SelectSubMenu title='교향악&합창&오페라' menuSubNum={5} url={'/music/complex'}/>
            </div>
          </>
        } */}
      </div>

    </div>
  )
}



