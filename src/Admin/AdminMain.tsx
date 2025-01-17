
import './Admin.scss'; 
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Schoolinfo from './Schoolinfo';
import Revise from './Revise';
import MainSoloRegister from './applySolo/MainSoloRegister';


export default function AdminMain( props: any) {

  return (
    <div className="AdminContainer">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        
        <Route path="/register" element={<Register/>}/>
        <Route path="/registersolo/*" element={<MainSoloRegister/>}/>
        <Route path="/revise" element={<Revise/>}/>
        <Route path="/schoolinfo" element={<Schoolinfo/>}/>
      </Routes>
    </div>
  );
}
