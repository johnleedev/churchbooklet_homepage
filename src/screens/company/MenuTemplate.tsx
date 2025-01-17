import React, { useEffect, useState } from 'react';
import './Company.scss';

export default function MenuTemplate(props:any) {

  interface SelectMenuProps {
    menuNum : number;
    title: string;
    url : string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ menuNum, title, url}) => {
    return (
      <div onClick={()=>{
        props.setCurrentMenu(menuNum);
        props.navigate(`/company${url}`)
      }}
        className={props.currentMenu === menuNum ? "subpage__menu__item subpage__menu__item--on" : "subpage__menu__item"}>
        {title}
      </div>
    )    
  };

  return (
    <div className="subpage__menu">
      <div className="subpage__menu__title">처치북</div>
      <div className="subpage__menu__list menu__desktop">
        <SelectMenu title='소개' menuNum={1} url={'/'}/>
        <SelectMenu title='공지사항' menuNum={2} url={'/notice'}/>
        <SelectMenu title='광고및제휴' menuNum={3} url={'/advertise'}/>
      </div>

      <div className="subpage__menu__list menu__mobile">
        <SelectMenu title='소개' menuNum={1} url={'/'}/>
        <SelectMenu title='공지사항' menuNum={2} url={'/notice'}/>
        <SelectMenu title='광고및제휴' menuNum={3} url={'/advertise'}/>
      </div>
    </div>
  )
}



