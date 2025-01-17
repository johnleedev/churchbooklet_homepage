import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './screens/main/Main';
import AdminMain from './Admin/AdminMain';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import MainCompt from './screens/company/MainCompt';
import MainBooklet from './screens/booklet/MainBooklet';
import Login from './screens/login/Login';
import LogisterDetail from './screens/login/LogisterDetail';
import CommunityMain from './screens/store/StoreMain';
import Logister from './screens/login/Logister';
import LoginSns from './screens/login/LoginSns';
import MypageMain from './screens/mypage/MypageMain';
import MainRollbook from './screens/rollbook/MainRollbook';


function App() {

  return (
      <div className="App">

        <RecoilRoot>

          <Header/>
          
          <div className='Main'>
            <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/rollbook/*" element={<MainRollbook/>}/>
              <Route path="/churchbooklets/*" element={<MainBooklet/>}/>
              <Route path="/company/*" element={<MainCompt/>}/>
              <Route path="/store/*" element={<CommunityMain/>}/>
              <Route path="/mypage" element={<MypageMain/>}/>
              <Route path="/admin/*" element={<AdminMain/>}/>

              <Route path="/login" element={<Login/>}/>
              <Route path="/loginsns" element={<LoginSns/>}/>
              <Route path="/logister" element={<Logister/>}/>
              <Route path="/logisterDetail" element={<LogisterDetail/>}/>
              
              
            </Routes>
          </div>
        </RecoilRoot>
      </div>
  );
}

export default App;
