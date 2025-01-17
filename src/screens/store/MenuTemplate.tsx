import React, { useEffect, useState } from 'react';
import './Store.scss';

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
        props.navigate(`/store${url}`)
      }}
        className={props.currentMenu === menuNum ? "subpage__menu__item subpage__menu__item--on" : "subpage__menu__item"}>
        {title}
      </div>
    )    
  };

  return (
    <div className="subpage__menu">
      <div className="subpage__menu__title">스토어</div>
      <div className="subpage__menu__list menu__desktop">
        <SelectMenu title='구매&신청' menuNum={1} url={'/'}/>
        <SelectMenu title='전단지등록' menuNum={2} url={'/register'}/>
      </div>

      <div className="subpage__menu__list menu__mobile">
        <SelectMenu title='구매&신청' menuNum={1} url={'/'}/>
        <SelectMenu title='전단지등록' menuNum={2} url={'/register'}/>
      </div>
    </div>
  )
}



