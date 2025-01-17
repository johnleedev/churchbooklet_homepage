import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RollbookList from './RollbookList';
import RollbookChurhMain from './churchs/RollbookChurhMain';
import ChurchAdmin from './admin/ChurchAdmin';
import RollbookDepartment from './churchs/RollbookDepartment';
import RollbookPresents from './presents/RollbookPresents';
import DepartmentAdmin from './admin/DepartmentAdmin';
import GroupAdmin from './admin/GroupAdmin';



export default function MainRollbook () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<RollbookList/>}/>
        <Route path="/rollbookchurhmain" element={<RollbookChurhMain/>}/>
        <Route path="/rollbookdepartment" element={<RollbookDepartment/>}/>
        <Route path="/rollbookpresents" element={<RollbookPresents/>}/>

        <Route path="/churchadmin" element={<ChurchAdmin/>}/>
        <Route path="/departmentadmin" element={<DepartmentAdmin/>}/>
        <Route path="/groupadmin" element={<GroupAdmin/>}/>
      </Routes>
    </div>
  );
}
