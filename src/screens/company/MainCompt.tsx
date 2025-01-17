import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Company from './pages/Company';
import Advertise from './pages/Advertise';
import BoardNotice from './pages/BoardNotice';
import BoardNoticeDetail from './pages/BoardNoticeDetail';



export default function MainCompt() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Company/>}/>
        <Route path="/notice" element={<BoardNotice/>}/>
        <Route path="/noticedetail" element={<BoardNoticeDetail/>}/>
        <Route path="/advertise" element={<Advertise/>}/>
      </Routes>
    </div>
  );
}

