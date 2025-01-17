import React, { useEffect, useState } from 'react';
import '../Booklet.scss';
import Footer from '../../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import MenuTemplate from '../MenuTemplate';
import BookletList from '../BookletList';


export default function ChurchNotice(props:any) {

  let navigate = useNavigate();

  interface ListProps {
    id : number,
    isView: string
    bookletId: string;
    type: string;
    sort: string;
    location : string;
    churchName: string;
    mainPastor: string;
    religiousbody : string;
    imageMainName: string;
  }
  
  const [list, setList] = useState<ListProps[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [listAllLength, setListAllLength] = useState<number>(0);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.post(`${MainURL}/churchbookletbooklets/getdatabooklets`, {
      type : '교회소개'
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
    type: string;
    bookletList: ListProps[];
  }
  
  const bookletData: PamphletGroup[] = list.reduce((acc: PamphletGroup[], curr: ListProps) => {
    if (!curr.isView) return acc;
    const type = curr.type;
    const existingGroup = acc.find(group => group.type === type);
    const list: ListProps = {
        id : curr.id,
        isView: curr.isView,
        bookletId: curr.bookletId,
        type: curr.type,
        sort: curr.sort,
        location: curr.location,
        churchName: curr.churchName,
        mainPastor: curr.mainPastor,
        religiousbody: curr.religiousbody,
        imageMainName: curr.imageMainName
    };
    if (existingGroup) {
        existingGroup.bookletList.push(list);
    } else {
        acc.push({
            type: type,
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
      const res = await axios.post(`${MainURL}/churchbookletbooklets/getdatabookletsearch`, {
        type : '교회소개',
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

 
  return (
    <div className="Booklet">

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentNum={1} currentSubNum={1} navigate={navigate} />
        
        <div className="subpage__main">
          <div className="subpage__main__title">
            <h3>교회소개</h3>
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

          <BookletList bookletData={bookletData} isResdataFalse={isResdataFalse} listAllLength={listAllLength} currentNum={1} currentSubNum={1}/>
        </div>

      </div>
      <Footer/>
    </div>
  )
}



