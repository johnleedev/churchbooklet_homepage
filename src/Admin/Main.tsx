import './Admin.scss'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function Main( props: any) {
  
  const navigate = useNavigate();
  
  return (
    <div className="AdminContainer">
    
      <div className='AdminContent'>
        <div className='amdin_Main_Box' onClick={()=>{
          navigate(`/admin/register`)
        }}>
          전단지 초안 게시판 등록
        </div>
        <div className='amdin_Main_Box' onClick={()=>{
          navigate(`/admin/registersolo`)
        }}>
          전단지 (solo) 등록
        </div>
        <div className='amdin_Main_Box' onClick={()=>{
          navigate(`/admin/revise`)
        }}>
          수정하기
        </div>
        <div className='amdin_Main_Box' onClick={()=>{
          navigate(`/admin/schoolinfo`)
        }}>
          학교 소개 (졸연)
        </div>
      </div>
        

      {/* footer */}
      <section className="footer">
      <div className="inner">
          <Footer></Footer>
      </div>
      </section>
    </div>
  );
}
