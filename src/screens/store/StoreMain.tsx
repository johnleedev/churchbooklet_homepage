import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Apply from './pages/Apply';
import Register from './pages/Register';
import RegisterPassword from './pages/RegisterPassword';
import MainGraduateRegister from './applyGraduate/MainGraduateRegister';
import MainGraduateList from './applyGraduate/MainGraduateList';

export default function StoreMain() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Apply/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/registerpassword" element={<RegisterPassword/>}/>
      <Route path="/maingraduatelist" element={<MainGraduateList/>}/>
      <Route path="/maingraduateregister" element={<MainGraduateRegister/>}/>
    </Routes>
  </div>
  )
}
