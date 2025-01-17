import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../Register.scss';
import './MainGraduate.scss';
import MainURL from '../../../MainURL';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuTemplate from '../MenuTemplate';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import { format } from 'date-fns';
import Loading from '../../../components/Loading';
import { CiCircleMinus } from 'react-icons/ci';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { recoilLoginState, recoilUserData } from '../../../RecoilStore';
import { FaArrowLeftLong } from "react-icons/fa6";


export default function MainGraduateRegister (props:any) {
  

  let navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState(2);
  const location = useLocation()
  const paramsData = location.state.data;
  const isAddOrRevise = location.state.isAddOrRevise;

  const isLogin = useRecoilValue(recoilLoginState);
  const userData = useRecoilValue(recoilUserData);
  
 
  const [sort, setSort] = useState(isAddOrRevise === 'revise' ? paramsData.sort : 'orche');
  const [playerName, setPlayerName] = useState(isAddOrRevise === 'revise' ? paramsData.playerName : '');
  const [playerPart, setPlayerPart] = useState(isAddOrRevise === 'revise' ? paramsData.playerPart : 'Violin');
  const [playerCarrer, setPlayerCarrer] = useState(isAddOrRevise === 'revise' ? paramsData.playerCarrer : '');
  const [lessonTeacher, setLessonTeacher] = useState(isAddOrRevise === 'revise' ? paramsData.lessonTeacher : '');
  const [accompanist, setAccompanist] = useState(isAddOrRevise === 'revise' ? paramsData.accompanist : '');
  const [subPlayers, setSubPlayers] = useState(isAddOrRevise === 'revise' ? JSON.parse(paramsData.subPlayers) : [""]);
  
  const [songNum, setSongNum] = useState(isAddOrRevise === 'revise' ? paramsData.songNum : '1');
  const [styleSelected, setStyleSelected] = useState(isAddOrRevise === 'revise' ? paramsData.styleSelected : '0');
  const [songComposer, setSongComposer] = useState(isAddOrRevise === 'revise' ? paramsData.songComposer : '');
  const [songTitle, setSongTitle] = useState(isAddOrRevise === 'revise' ? paramsData.songTitle : '');
  const [songSubTitle, setSongSubTitle] = useState(isAddOrRevise === 'revise' ? paramsData.songSubTitle : '');
  const [songNotice, setSongNotice] = useState(isAddOrRevise === 'revise' ? paramsData.songNotice : '');
  const [songLyrics, setSongLyrics] = useState(isAddOrRevise === 'revise' ? paramsData.songLyrics : '');
  const [songFrom, setSongFormFirst] = useState(isAddOrRevise === 'revise' ? paramsData.songFrom : '');
  const [styleSelected2nd, setStyleSelected2nd] = useState(isAddOrRevise === 'revise' ? paramsData.styleSelected2nd : '0');
  const [songComposer2nd, setSongComposer2nd] = useState(isAddOrRevise === 'revise' ? paramsData.songComposer2nd : null);
  const [songTitle2nd, setSongTitle2nd] = useState(isAddOrRevise === 'revise' ? paramsData.songTitle2nd : null);
  const [songSubTitle2nd, setSongSubTitle2nd] = useState(isAddOrRevise === 'revise' ? paramsData.songSubTitle2nd : null);
  const [songNotice2nd, setSongNotice2nd] = useState(isAddOrRevise === 'revise' ? paramsData.songNotice2nd : null);
  const [songLyrics2nd, setSongLyrics2nd] = useState(isAddOrRevise === 'revise' ? paramsData.songLyrics2nd : null);
  const [songFrom2nd, setSongForm2nd] = useState(isAddOrRevise === 'revise' ? paramsData.songFrom2nd : null);
  
  const [inputImages, setInputImages] = useState<string[]>(isAddOrRevise === 'revise' ? JSON.parse(paramsData.postImage) : []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [playOrderMain, setPlayOrderMain] = useState(isAddOrRevise === 'revise' ? paramsData.playOrderMain : '1부');  
  const [playOrder, setPlayOrder] = useState(isAddOrRevise === 'revise' ? paramsData.playOrder : '1');  
  const [password, setPassword] = useState('');


  // 구분 선택 ----------------------------------------------
  const sortOptions = [
    { value: 'orche', label: '관현악' },
    { value: 'vocal', label: '성악' },
    { value: 'piano', label: '피아노' },
    { value: 'compo', label: '작곡' },
  ];

  // 파트 선택 ----------------------------------------------
  const partOptionsOrchestral = [
    { value: 'VIOLIN', label: 'Violin'},
    { value: 'VIOLA', label: 'Viola'},
    { value: 'CELLO', label: 'Cello'}, 
    { value: 'D.BASS', label: 'D.BASS'}, 
    { value: 'FLUTE', label: 'Flute'}, 
    { value: 'CLARINET', label: 'Clarinet'}, 
    { value: 'OBOE', label: 'Oboe'}, 
    { value: 'BASSOON', label: 'Bassoon'}, 
    { value: 'SAXOPHONE', label: 'Saxophone'}, 
    { value: 'HORN', label: 'Horn'}, 
    { value: 'TRUMPET', label: 'Trumpet'}, 
    { value: 'TROMBONE', label: 'Trombone'}, 
    { value: 'TUBA', label: 'Tuba'}, 
    { value: 'HARP', label: 'Harp'}, 
    { value: 'PERCUSSION', label: 'Percussion'}
  ];

  const partOptionsVocal = [
    { value: 'SOPRANO', label: 'Soprano' },
    { value: 'MEZZO SOPRANO', label: 'Mezzo Soprano' },
    { value: 'TENOR', label: 'Tenor' },
    { value: 'BARITONE', label: 'Baritone' },
    { value: 'BASS', label: 'Bass' },
  ];

  const playOrderOption = [
    { value: '1', label: '1'},
    { value: '2', label: '2'},
    { value: '3', label: '3'},
    { value: '4', label: '4'},
    { value: '5', label: '5'},
    { value: '6', label: '6'},
    { value: '7', label: '7'},
    { value: '8', label: '8'},
    { value: '9', label: '9'},
    { value: '10', label: '10'},
    { value: '11', label: '11'},
    { value: '12', label: '12'},
    { value: '13', label: '13'},
    { value: '14', label: '14'},
    { value: '15', label: '15'}
  ];

  // 첨부 이미지 삭제 ----------------------------------------------
  const deleteInputImage = async (Idx:number) => {
    const copy =  [...imageFiles]
    const newItems = copy.filter((item, i) => i !== Idx);
    setImageFiles(newItems);
  };

  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyMMddHHmmss');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000
      };
      const resizedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          setImageLoading(true);
          const resizingBlob = await imageCompression(file, options);
          return resizingBlob;
        })
      );
      const regexCopy = /[^a-zA-Z0-9!@#$%^&*()\-_=+\[\]{}|;:'",.<>]/g;
      const fileCopies = resizedFiles.map((resizedFile, index) => {
        const regex = resizedFile.name.replace(regexCopy, '');
        const regexSlice = regex.slice(-15);
        return new File([resizedFile], `${date}_${regexSlice}`, {
          type: acceptedFiles[index].type,
        });
      });
      setImageFiles(fileCopies);
      const imageNames = acceptedFiles.map((file, index) => {
        const regex = file.name.replace(regexCopy, '');
        const regexSlice = regex.slice(-15);
        return `${date}_${regexSlice}`;
      });
      setInputImages(imageNames);
      setImageLoading(false);
    } catch (error) {
      console.error('이미지 리사이징 중 오류 발생:', error);
    }
  }, [setImageFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop }); 


  // 글쓰기 등록 함수 ----------------------------------------------
  const datecopy = format(currentDate, "yyyy-MM-dd");
  const registerPost = async () => {
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append('img', file);
    });
    const getParams = {
      userAccount : userData.userAccount,
      pamphletId : paramsData.id,
      sort: sort,
      playOrderMain : playOrderMain,
      playOrder: playOrder,
      playerName: playerName,
      playerPart: playerPart,
      playerCarrer: playerCarrer,
      lessonTeacher: lessonTeacher,
      accompanist: accompanist,
      subPlayers: JSON.stringify(subPlayers),
      songNum : songNum,
      styleSelected : styleSelected,
      songComposer: songComposer,
      songTitle: songTitle,
      songSubTitle: songSubTitle,
      songNotice: songNotice,
      songLyrics : songLyrics,
      styleSelected2nd : styleSelected2nd,
      songComposer2nd: songComposer2nd,
      songTitle2nd: songTitle2nd,
      songSubTitle2nd: songSubTitle2nd,
      songNotice2nd: songNotice2nd,
      songLyrics2nd : songLyrics2nd,
      inputDate : datecopy,
      postImage : JSON.stringify(inputImages),
      password: password
    }
    axios
      .post(`${MainURL}/register/registergraduate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('저장되었습니다.')
          navigate(-1);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 수정 함수 ----------------------------------------------
  const revisePost = async () => {
    const getParams = {
      postId : paramsData.id,
      sort: sort,
      playOrderMain : playOrderMain,
      playOrder: playOrder,
      playerName: playerName,
      playerPart: playerPart,
      playerCarrer: playerCarrer,
      lessonTeacher: lessonTeacher,
      accompanist: accompanist,
      subPlayers: JSON.stringify(subPlayers),
      songNum : songNum,
      styleSelected : styleSelected,
      songComposer: songComposer,
      songTitle: songTitle,
      songSubTitle: songSubTitle,
      songNotice: songNotice,
      songLyrics : songLyrics,
      styleSelected2nd : styleSelected2nd,
      songComposer2nd: songComposer2nd,
      songTitle2nd: songTitle2nd,
      songSubTitle2nd: songSubTitle2nd,
      songNotice2nd: songNotice2nd,
      songLyrics2nd : songLyrics2nd,
      inputDate : datecopy,
    }
    axios
      .post(`${MainURL}/register/revisegraduate`, getParams)
      .then((res) => {
        if (res.data) {
          alert('수정되었습니다.')
          navigate(-1);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deletePost = async () => {
		const getParams = {
			postId : paramsData.id,
			images : inputImages
		}
		axios 
			.post(`${MainURL}/register/deletegraduate`, getParams)
			.then((res) => {
				if (res.data) {
					alert('삭제되었습니다.')
          navigate(-1);
				}
			})
			.catch(() => {
				console.log('실패함')
			})
	};

	const handleDeleteAlert = () => {
		const costConfirmed = window.confirm(`정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deletePost();
		} else {
			return
		}
	};
  
  return  (
    <div className="main-register">

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} navigate={navigate} />
        
        <div className="subpage__main">
          <div className="subpage__main__title">
            <div className="subpage__main__title">
              <h3>처치북등록</h3>
            </div>
          </div>

          <div className="subpage__main__content">

            <div className="main__content_registertitle">
              <p>{paramsData.title}</p>
            </div>
            <div className="main__content">
              
              <div className="info-inputbox">

                <div className="graduate-register-backBtnBox">
                  <div className="graduate-register-backBtn"
                    onClick={()=>{
                      navigate(-1);
                    }}
                  >
                    <FaArrowLeftLong size={20}/>
                    <p>뒤로가기</p>
                  </div>
                </div>

                <div className='graduate-register-inputCover'>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>이름</p>
                    </div>
                    <div className='graduate-register-input'>
                      <input type="text" 
                        onChange={(e)=>{setPlayerName(e.target.value)}} value={playerName} 
                        placeholder={ '홍길동'}/>
                    </div>
                  </div>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>구분</p>
                    </div>
                    <div className='graduate-register-input'>
                      <div className='graduate-register-selectBox'>
                        <div className={sort === 'orche' ? 'sortSelectBox selected' : 'sortSelectBox'} 
                          onClick={()=>{setSort('orche'); setPlayerPart('Violin')}}>
                          {sortOptions[0].label}
                        </div>
                        <div className={sort === 'vocal' ? 'sortSelectBox selected' : 'sortSelectBox'} 
                            onClick={()=>{setSort('vocal'); setPlayerPart('Soprano')}}>
                          {sortOptions[1].label}
                        </div>
                        <div className={sort === 'piano' ? 'sortSelectBox selected' : 'sortSelectBox'} 
                          onClick={()=>{setSort('piano'); setPlayerPart('Piano')}}>
                          {sortOptions[2].label}
                        </div>
                        <div className={sort === 'compo' ? 'sortSelectBox selected' : 'sortSelectBox'} 
                          onClick={()=>{setSort('compo'); setPlayerPart('Composition')}}>
                          {sortOptions[3].label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>전공(파트)</p>
                    </div>
                    <div className='graduate-register-input'>
                      <div className="register-inputbox">
                        <div className='register-input'>
                          { sort === 'orche' && 
                            <select value={playerPart} onChange={(e)=>{setPlayerPart(e.target.value)}} className="input">
                              {partOptionsOrchestral.map((option:any, index:any) => (
                                <option key={index} value={option.value}>{option.label}</option>
                              ))}
                            </select>}
                          { sort === 'vocal' && 
                            <select value={playerPart} onChange={(e)=>{setPlayerPart(e.target.value)}} className="input">
                              {partOptionsVocal.map((option:any, index:any) => (
                                <option key={index} value={option.value}>{option.label}</option>
                              ))}
                          </select>}
                          { (sort === 'piano' || sort === 'compo') && 
                            <input type="text" onChange={(e)=>{setPlayerPart(e.target.value)}} value={playerPart}/>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>이력/경력</p>
                    </div>
                    <div className='graduate-register-input'>
                        <textarea 
                          style={{minHeight:'100px'}}
                          maxLength={200}
                          onChange={(e)=>{setPlayerCarrer(e.target.value)}} value={playerCarrer} 
                          placeholder={'000고등학교 졸업, 000콩쿨 입상, 000대학교 재학 중 (최대200자)'}/>
                    </div>
                  </div>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>지도교수</p>
                    </div>
                    <div className='graduate-register-input'>
                      <input type="text" 
                        maxLength={45}
                        onChange={(e)=>{setLessonTeacher(e.target.value)}} value={lessonTeacher} 
                        placeholder={ '홍길동'}/>
                    </div>
                  </div>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>반주자</p>
                    </div>
                    <div className='graduate-register-input'>
                      <input type="text" 
                        maxLength={45}
                        onChange={(e)=>{setAccompanist(e.target.value)}} value={accompanist} 
                        placeholder={ '홍길동'}/>
                    </div>
                  </div>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>서브연주자<span style={{fontSize:'12px'}}>(선택)</span></p>
                    </div>
                    <div className='graduate-register-input'>
                      {
                        subPlayers.map((item:any, index:any)=>{
                          return (
                            <div key={index} style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'5px'}}>
                              <input type="text" style={{width:'80%'}}
                                maxLength={45} value={item} 
                                onChange={(e)=>{
                                  const copy = [...subPlayers]
                                  copy[index] = e.target.value;
                                  setSubPlayers(copy);
                                }} 
                                placeholder={ 'Vn. 홍길동 (한명씩 입력해주세요)'}
                              />
                             <div className="plus-minus-btn"
                               style={{width:'8%'}}
                                onClick={()=>{
                                  const copy = [...subPlayers, ""]
                                  setSubPlayers(copy);
                                }}
                              >
                                <p>+</p>
                              </div>
                              <div className="plus-minus-btn"
                                style={{width:'8%'}}
                                onClick={()=>{
                                  const copy = [...subPlayers]
                                  copy.splice(index, 1);
                                  setSubPlayers(copy);
                                }}
                              >
                                <p>-</p>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>연주 곡수</p>
                    </div>
                    <div className='graduate-register-input'>
                      <div className="register-inputbox">
                        <div className='register-input'>
                          <select value={songNum} onChange={(e)=>{setSongNum(e.target.value)}} className="input">
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {
                  styleSelected === '0' &&
                  <ul className="graduate-registerProgram-StyleSelect">
                    <div className="graduate-registerProgram-title">
                      곡1 형식 선택
                    </div>
                    <li className={`graduate-registerProgram-styleSelectBox`} onClick={()=>{
                        setStyleSelected('1');
                    }}>
                      <div className="graduate-registerProgram-text">
                        <h3>A-Type</h3>
                        <p>작곡가, 곡명</p>
                      </div>
                      <div className='graduate-registerProgram-sampletext'>
                        <p>(ex.)</p>
                        <h3>Fryderyk Chopin</h3>
                        <h4>Valse No.9 in A Flat Major Op.69-1 L'adieu</h4>
                      </div>
                      <p className={'graduate-registerProgram-selectBtn'}>선택</p>
                    </li>
                    <li className={`graduate-registerProgram-styleSelectBox`} onClick={()=>{
                        setStyleSelected('2');
                    }}>
                      <div className="graduate-registerProgram-text">
                        <h3>B-Type</h3>
                        <p>작곡가, 곡명, 소제목</p>
                      </div>
                      <div className='graduate-registerProgram-sampletext'>
                        <p>(ex.)</p>
                        <h3>FRANZ LISZT</h3>
                        <h4>Harmonies poétiques et religieuses</h4>
                        <p style={{marginLeft:'5px'}}>7. Funérailles</p>
                      </div>
                      <p className={'graduate-registerProgram-selectBtn'}>선택</p>
                    </li>
                    <li className={`graduate-registerProgram-styleSelectBox`} onClick={()=>{
                        setStyleSelected('3');
                    }}>
                      <div className="graduate-registerProgram-text">
                        <h3>C-Type</h3>
                        <p>작곡가, 곡명, 출처(오페라 등)</p>
                      </div>
                      <div className='graduate-registerProgram-sampletext'>
                        <p>(ex.)</p>
                        <h3>G.Verdi</h3>
                        <h4>Pace pace miio dio</h4>
                        <p style={{marginLeft:'5px'}}>from Opera "La Forza del Destino"</p>
                      </div>
                      <p className={'graduate-registerProgram-selectBtn'}>선택</p>
                    </li>
                  </ul>
                }
                {
                  styleSelected !== '0' &&
                  <div className='graduate-register-inputCover'>
                    <div className="graduate-register-inputbox">
                      <div className="graduate-register-name">
                        <p>작곡가1</p>
                      </div>
                      <div className='graduate-register-input'>
                        <input type="text" 
                          maxLength={100}
                          value={songComposer} 
                          placeholder={ 'W.A.Mozart'}
                          onChange={(e)=>{
                            setSongComposer(e.target.value);
                          }} 
                        />
                      </div>
                    </div>
                    <div className="graduate-register-inputbox">
                      <div className="graduate-register-name">
                        <p>곡명1</p>
                      </div>
                      <div className='graduate-register-input'>
                        <input type="text" 
                          maxLength={100}
                          value={songTitle} 
                          placeholder={ 'Valse No.9 in A Flat Major ...'}
                          onChange={(e)=>{
                            setSongTitle(e.target.value)
                          }} 
                        />
                      </div>
                    </div>
                    {
                      styleSelected === '2' &&
                      <div className="graduate-register-inputbox">
                        <div className="graduate-register-name">
                          <p>소제목1</p>
                        </div>
                        <div className='graduate-register-input'>
                          <input type="text" 
                            maxLength={100}
                            value={songSubTitle} 
                            placeholder={'7. Funérailles'}
                            onChange={(e)=>{
                              setSongSubTitle(e.target.value);
                            }} 
                          />
                        </div>
                      </div>
                    }
                    {
                      styleSelected === '3' &&
                      <div className="graduate-register-inputbox">
                        <div className="graduate-register-name">
                          <p>출처1</p>
                        </div>
                        <div className='graduate-register-input'>
                          <input type="text" 
                              maxLength={100}
                              value={songFrom} 
                              placeholder={'Opera <Carmen>'}
                              onChange={(e)=>{
                                setSongFormFirst(e.target.value);
                              }} 
                            />
                        </div>
                      </div>
                    }
                    <div className="graduate-register-inputbox">
                      <div className="graduate-register-name">
                        <p>곡해설1</p>
                      </div>
                      <div className='graduate-register-input'>
                        <textarea 
                          style={{minHeight:'200px'}}
                          maxLength={500}
                          value={songNotice} 
                          placeholder={'빈칸으로 둘 경우, chat gpt에서 제시하는 글이 올라갑니다. (최대500자)'}
                          onChange={(e)=>{
                            setSongNotice(e.target.value);
                          }} 
                        />
                      </div>
                    </div>
                    {
                      sort === 'vocal' && 
                      <div className="graduate-register-inputbox">
                        <div className="graduate-register-name">
                          <p>곡가사1<span style={{fontSize:'12px'}}>(선택)</span></p>
                        </div>
                        <div className='graduate-register-input'>
                          <textarea 
                            style={{minHeight:'200px'}}
                            maxLength={500}
                            value={songLyrics} 
                            placeholder={'성악곡인 경우 가사를 입력해주세요. 빈칸으로 둘 경우, chat gpt에서 제시하는 글이 올라갑니다. (최대500자)'}
                            onChange={(e)=>{
                              setSongLyrics(e.target.value);
                            }} 
                          />
                        </div>
                      </div>
                    }
                  </div>
                }
                {/* ---------------------------------------------------------------------------------------------------- */}
                {
                  songNum === '2' &&
                  <>
                    {
                    styleSelected2nd === '0' &&
                    <ul className="graduate-registerProgram-StyleSelect">
                      <div className="graduate-registerProgram-title">
                        곡2 형식 선택
                      </div>
                      <li className={`graduate-registerProgram-styleSelectBox`} onClick={()=>{
                          setStyleSelected2nd('1');
                      }}>
                        <div className="graduate-registerProgram-text">
                          <h3>A-Type</h3>
                          <p>작곡가, 곡명</p>
                        </div>
                        <div className='graduate-registerProgram-sampletext'>
                          <p>(ex.)</p>
                          <h3>Fryderyk Chopin</h3>
                          <h4>Valse No.9 in A Flat Major Op.69-1 L'adieu</h4>
                        </div>
                        <p className={'graduate-registerProgram-selectBtn'}>선택</p>
                      </li>
                      <li className={`graduate-registerProgram-styleSelectBox`} onClick={()=>{
                          setStyleSelected2nd('2');
                      }}>
                        <div className="graduate-registerProgram-text">
                          <h3>B-Type</h3>
                          <p>작곡가, 곡명, 소제목</p>
                        </div>
                        <div className='graduate-registerProgram-sampletext'>
                          <p>(ex.)</p>
                          <h3>FRANZ LISZT</h3>
                          <h4>Harmonies poétiques et religieuses</h4>
                          <p style={{marginLeft:'5px'}}>7. Funérailles</p>
                        </div>
                        <p className={'graduate-registerProgram-selectBtn'}>선택</p>
                      </li>
                      <li className={`graduate-registerProgram-styleSelectBox`} onClick={()=>{
                          setStyleSelected2nd('3');
                      }}>
                        <div className="graduate-registerProgram-text">
                          <h3>C-Type</h3>
                          <p>작곡가, 곡명, 출처(오페라 등)</p>
                        </div>
                        <div className='graduate-registerProgram-sampletext'>
                          <p>(ex.)</p>
                          <h3>G.Verdi</h3>
                          <h4>Pace pace miio dio</h4>
                          <p style={{marginLeft:'5px'}}>from Opera "La Forza del Destino"</p>
                        </div>
                        <p className={'graduate-registerProgram-selectBtn'}>선택</p>
                      </li>
                    </ul>
                  }
                  {
                    styleSelected2nd !== '0' &&
                    <div className='graduate-register-inputCover'>
                      <div className="graduate-register-inputbox">
                        <div className="graduate-register-name">
                          <p>작곡가2</p>
                        </div>
                        <div className='graduate-register-input'>
                          <input type="text" 
                            maxLength={100}
                            value={songComposer2nd} 
                            placeholder={ 'W.A.Mozart'}
                            onChange={(e)=>{
                              setSongComposer2nd(e.target.value);
                            }} 
                          />
                        </div>
                      </div>
                      <div className="graduate-register-inputbox">
                        <div className="graduate-register-name">
                          <p>곡명2</p>
                        </div>
                        <div className='graduate-register-input'>
                          <input type="text" 
                            maxLength={100}
                            value={songTitle2nd} 
                            placeholder={ 'Valse No.9 in A Flat Major ...'}
                            onChange={(e)=>{
                              setSongTitle2nd(e.target.value);
                            }} 
                          />
                        </div>
                      </div>
                      {
                        styleSelected2nd === '2' &&
                        <div className="graduate-register-inputbox">
                          <div className="graduate-register-name">
                            <p>소제목2</p>
                          </div>
                          <div className='graduate-register-input'>
                            <input type="text" 
                              maxLength={100}
                              value={songSubTitle2nd} 
                              placeholder={'7. Funérailles'}
                              onChange={(e)=>{
                                setSongSubTitle2nd(e.target.value);
                              }} 
                            />
                          </div>
                        </div>
                      }
                      {
                        styleSelected2nd === '3' &&
                        <div className="graduate-register-inputbox">
                          <div className="graduate-register-name">
                            <p>출처2</p>
                          </div>
                          <div className='graduate-register-input'>
                            <input type="text" 
                                maxLength={100}
                                value={songFrom2nd} 
                                placeholder={'Opera <Carmen>'}
                                onChange={(e)=>{
                                  setSongForm2nd(e.target.value);
                                }} 
                              />
                          </div>
                        </div>
                      }
                      <div className="graduate-register-inputbox">
                        <div className="graduate-register-name">
                          <p>곡해설2</p>
                        </div>
                        <div className='graduate-register-input'>
                          <textarea 
                            style={{minHeight:'200px'}}
                            maxLength={500}
                            value={songNotice2nd} 
                            placeholder={'빈칸으로 둘 경우, chat gpt에서 제시하는 글이 올라갑니다. (최대500자)'}
                            onChange={(e)=>{
                              setSongNotice2nd(e.target.value)
                            }} 
                          />
                        </div>
                      </div>
                      {
                        sort === 'vocal' &&
                        <div className="graduate-register-inputbox">
                          <div className="graduate-register-name">
                            <p>곡가사2<span style={{fontSize:'12px'}}>(선택)</span></p>
                          </div>
                          <div className='graduate-register-input'>
                            <textarea 
                              style={{minHeight:'200px'}}
                              maxLength={500}
                              value={songLyrics2nd} 
                              placeholder={'성악곡인 경우 가사를 입력해주세요. 빈칸으로 둘 경우, chat gpt에서 제시하는 글이 올라갑니다. (최대500자)'}
                              onChange={(e)=>{
                                setSongLyrics2nd(e.target.value);
                              }} 
                            />
                          </div>
                        </div>
                      }
                    </div>
                  }
                  </>
                }
                
              
                <div className='graduate-register-inputCover'>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>프로필사진</p>
                    </div>
                    {
                      isAddOrRevise === 'add'
                      ?
                      <div className='graduate-register-input'>
                        <div className="graduate-imageInputBox">
                          {
                            imageLoading ?
                            <div style={{width:'100%', height:'100%', position:'absolute'}}>
                              <Loading/>
                            </div>
                            :
                            <div className='graduate-imageDropzoneCover'>
                              <div {...getRootProps()} className="graduate-imageDropzoneStyle" >
                                <input {...getInputProps()} />
                                {
                                  imageFiles.length > 0 
                                  ? <div className='imageplus'>+ 다시첨부하기</div>
                                  : <div className='imageplus'>+ 프로필사진 첨부하기</div>
                                }
                              </div>
                            </div>
                          }
                          {
                            imageFiles.length > 0 &&
                            imageFiles.map((item:any, index:any)=>{
                              return (
                                <div key={index} className='graduate-imagebox'>
                                  <img 
                                    src={URL.createObjectURL(item)}
                                  />
                                  <p>{item.name}</p>
                                  <div onClick={()=>{deleteInputImage(index);}}>
                                    <CiCircleMinus color='#FF0000' size={26}/>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                      :
                      <div className='graduate-register-input'>
                        <div className="graduate-imageInputBox">
                          <div className='graduate-imagebox'>
                            {
                              inputImages.length > 0
                              ?
                              <img 
                                src={`${MainURL}/images/pamphlet_graduate/${inputImages[0]}`}
                              />
                              :
                              <p>이미지가 없습니다.</p>
                            }
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>연주순서</p>
                    </div>
                    <div className='graduate-register-input'>
                      <div className="register-inputbox">
                        {/* <div className='register-input'> */}
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'5px'}}>
                          <select value={playOrderMain} onChange={(e)=>{setPlayOrderMain(e.target.value)}} className="input">
                            <option value='1부'>1부</option>
                            <option value='2부'>2부</option>
                          </select>
                          <select value={playOrder} onChange={(e)=>{setPlayOrder(e.target.value)}} className="input">
                            {playOrderOption.map((option:any, index:any) => (
                              <option key={index} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                {
                  isAddOrRevise === 'add' &&
                  <div className="graduate-register-inputbox">
                    <div className="graduate-register-name">
                      <p>임시비밀번호</p>
                    </div>
                    <div className='graduate-register-input'>
                      <input type="text" 
                        maxLength={10}
                        onChange={(e)=>{setPassword(e.target.value)}} value={password} 
                        placeholder={ '수정할때 필요한 비밀번호를 입력해주세요. (~10자)'}/>
                    </div>
                  </div>
                }
                </div>
                
                
              </div>
              
            </div>

            <div className="buttonbox">
              {
                isAddOrRevise === 'revise' &&
                <div className="button"
                  style={{backgroundColor:'#FF0000'}}
                  onClick={()=>{
                    handleDeleteAlert();
                  }}
                  >
                  <p>삭제하기</p>
                </div>
              }
              <div className="button"
                style={{backgroundColor:'#BDBDBD'}}
                onClick={()=>{
                  navigate(-1);
                }}
                >
                <p>취소하기</p>
              </div>
              <div className="button"
                onClick={()=>{
                  isAddOrRevise === 'revise'
                  ? revisePost()
                  : registerPost()
                }}
                >
                <p>{isAddOrRevise === 'revise'? '수정' : '입력'}하기</p>
              </div>
            </div>           

          </div>

        </div>

      </div>
      <Footer/>
    </div>
  )
}



