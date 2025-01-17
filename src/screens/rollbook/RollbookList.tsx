import React, { useEffect, useState } from 'react';
import './Rollbook.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';
import Footer from '../../components/Footer';
import MenuTemplate from './MenuTemplate';
import { useRecoilState } from 'recoil';
import { recoilLoginState, recoilUserData } from '../../RecoilStore';


interface ListProps {
  id : number,
  isView: string;
  location : string;
  churchName: string;
  religiousbody : string;
  image: string;
}


export default function RollbookList (props:any) {

  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(recoilLoginState);
  const [userData, setUserData] = useRecoilState(recoilUserData);
  
  const [list, setList] = useState<ListProps[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [listAllLength, setListAllLength] = useState<number>(0);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.post(`${MainURL}/rollbooklist/getchurchlist`, {
      
    })
    if (res.data.data) {
      setIsResdataFalse(false);
      let copy: any = [...res.data.data];
      copy.reverse();
      setList(copy);
      setListAllLength(res.data.count);
    } else {
      setListAllLength(0);
      setIsResdataFalse(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);  


  interface PamphletGroup {
    location: string;
    bookletList: ListProps[];
  }
  
  const bookletData: PamphletGroup[] = list.reduce((acc: PamphletGroup[], curr: ListProps) => {
    if (!curr.isView) return acc;
    const location = curr.location;
    const existingGroup = acc.find(group => group.location === location);
    const list: ListProps = {
        id : curr.id,
        isView: curr.isView,
        location: curr.location,
        churchName: curr.churchName,
        religiousbody: curr.religiousbody,
        image: curr.image
    };
    if (existingGroup) {
        existingGroup.bookletList.push(list);
    } else {
        acc.push({
            location: location,
            bookletList: [list]
        });
    }
    return acc;
  }, []);;

  // 글자 검색 ------------------------------------------------------
	const handleWordSearching = async () => {
    setList([]);
    if (searchWord.length < 2) {
      alert('2글자이상 입력해주세요')
    } else {
      const res = await axios.post(`${MainURL}/rollbooklist/getdatabookletsearch`, {
        location : '교회소개',
        word: searchWord
      })
      if (res.data.data) {
        setIsResdataFalse(false);
        let copy: any = [...res.data.data];
        setList(copy);
        setListAllLength(res.data.count);
      } else {
        setListAllLength(0);
        setIsResdataFalse(true);
      }
    }
	};

  const alertLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  }

 
  return (
    <div className="Rollbook">

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentNum={1} currentSubNum={1} navigate={navigate} />
        
        <div className="subpage__main">
          <div className="subpage__main__title">
            <h3>전체교회</h3>
          </div>
          
          <div className="subpage__main__search">
           
            <div className="subpage__main__search__box">
              <p className="buttons" style={{marginRight:'10px'}}>검색:</p>
              <input className="inputdefault width" type="text" placeholder='교회명 검색'
                value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}} 
                onKeyDown={(e)=>{if (e.key === 'Enter') {handleWordSearching();}}}
                />
              <div className="buttons" style={{margin:'20px 0'}}>
                <div className="btn" 
                  onClick={handleWordSearching}>
                  <p>검색</p>
                </div>
              </div>
              <div className="buttons" style={{margin:'20px 0'}}>
                <div className="btn" 
                  onClick={()=>{
                    setSearchWord('');
                    fetchPosts();
                  }}>
                  <p>초기화</p>
                </div>
              </div>
            </div>
          </div>

          <div className="subpage__main__content">

            <div className="main__content">
              {
                bookletData.length > 0 && !isResdataFalse
                ?
                bookletData.map((item:any, index:any) => (
                  <div
                    key={index}
                    className="pamphlet__wrap--category"
                    data-aos="fade-up"
                  >
                    <div className="pamphlet__title__row">
                      <div>현재 {item.bookletList.length}개가 있습니다.</div>
                    </div>
                    <div className="pamphlet__wrap--item">
                    {
                      item.bookletList.map((subItem:any, subIndex:any) => {

                        return subItem.isView === "true" && (
                        // return  (
                          <div key={subIndex} className="pamphlet__item"
                            onClick={()=>{
                              if (isLogin) {
                                window.scrollTo(0, 0);
                                navigate(`/rollbook/rollbookchurhmain?id=${subItem.id}&churchName=${subItem.churchName}`);  
                               } else {
                                alertLogin();
                               }
                            }}
                          >
                            <div className="pamphlet__img--cover">
                              <div className='imageBox'>
                                <img src={`https://churchbooklet.com/images/rollbook_church/${subItem.image}`} alt={'등록된 사진이 없습니다.'} />
                              </div>
                            </div>
                            <div className="namecard">
                              <p>{subItem.religiousbody}</p>
                            </div>
                            <div className="pamphlet__coname">
                              <p>{subItem.churchName}</p>
                            </div>
                            <div className="pamphlet__name">
                              <p className='pamphlet__name-title'>위치</p>
                              <div className="pamphlet__divider"></div>
                              <p>{subItem.location}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                  </div>
                ))
                :
                <div
                  className="pamphlet__wrap--category"
                  data-aos="fade-up"
                >
                  <div className="pamphlet__title">검색 결과가 없습니다.</div>
                </div>
              }
              </div>
            </div>
          </div>

        </div>
      <Footer/>
    </div>
  )
}



