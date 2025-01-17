import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookletDetail from './BookletDetail';
import ChurchNotice from './booklets/ChurchNotice';


export default function MainBooklet() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<ChurchNotice/>}/>
        <Route path="/bookletdetail" element={<BookletDetail/>}/>
        
      </Routes>
    </div>
  );
}
