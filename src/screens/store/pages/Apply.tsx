import React, { useEffect, useState } from 'react';
import '../Store.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuTemplate from '../MenuTemplate';

export default function Apply() {

  let navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState(1);

  const [selectedBox, setSelectedBox] = useState(0);
  const [selectedIsDataInput, setSelectedIsDataInput] = useState(1);
  const [selectedIsHaveImage, setSelectedIsHaveImage] = useState(1);
  const [selectCostOrigin, setSelectCostOrigin] = useState(0);
  const [selectCost, setSelectCost] = useState(0);
  const [vatCostOrigin, setVatCostOrigin] = useState(0);
  const [vatCost, setVatCost] = useState(0);
  const [costAll, setCostAll] = useState(0);
  
  const costData = [
    {title : '무료처치북', notice:'이미지가 필요없이, 연주순서만 필요하다면!', cost:'0', originCost:0},
    {title : '독창회&독주회', notice:'1인 연주회 전용', cost:'30,000', originCost:30000},
    {title : '소형 연주회', notice:'2~5인 연주회 전용', cost:'50,000', originCost:50000},
    {title : '중형 연주회', notice:'6~10인 연주회 전용', cost:'100,000', originCost:100000},
    {title : '대형 연주회', notice:'11~20인 연주회 전용', cost:'150,000', originCost:150000},
    {title : '교향악&합창&오페라', notice:'교향악단 연주회, 합창 연주회, 오페라 연주회 전용', cost:'협의', originCost:0}
  ]

  const handleDiscount = (isDiscount:boolean) => {
    if (isDiscount) {
      const selectCostCopy = selectCostOrigin * 8 / 10
      setSelectCost(selectCostCopy);
      const vatCostCopy = vatCostOrigin * 8 / 10
      setVatCost(vatCostCopy);
      setCostAll(selectCostCopy + vatCostCopy)
    } else {
      setSelectCost(selectCostOrigin);
      setVatCost(vatCostOrigin);
      setCostAll(selectCostOrigin + vatCostOrigin)
    }
  }

  return (
    <div className='store'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <MenuTemplate currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} navigate={navigate} />

        <div className="subpage__main">
          <div className="subpage__main__title">
            <h3>구매&신청</h3>
          </div>

          <div className="subpage__main__content">

            <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'200px'}}>
              <div style={{textAlign:'center'}}>
                <p style={{fontSize:'20px', marginBottom:'10px'}}>현재 프로모션 기간으로 인해,</p>
                <p style={{fontSize:'20px', marginBottom:'10px'}}>전액 무상으로 서비스됩니다.</p>
                <p style={{fontSize:'18px', marginBottom:'10px'}}>(프로모션기간: 2024년 11월 신청분까지)</p>
              </div>
            </div>
            {/* <div className="apply_subtitle">
              <p>처치북 요금 선택</p>
            </div>

            <ul className="costBox">
              {
                costData.map((item:any, index:any)=>{
                  return (
                    <li className={ selectedBox === index ? 'cost selected' : 'cost'} 
                      onClick={()=>{
                        setSelectedBox(index);
                        setSelectCost(item.originCost);
                        setVatCost(item.originCost * 1 / 10)
                        setSelectCostOrigin(item.originCost);
                        setVatCostOrigin(item.originCost * 1 / 10)
                        setSelectedIsDataInput(1);
                        setSelectedIsHaveImage(1);
                        setCostAll((item.originCost) + (item.originCost * 1 / 10));
                      }}
                    >
                      <div className="costBox-text">
                        <h3>{item.title}</h3>
                        <p>{item.notice}</p>
                      </div>
                      <div className="costBox-cost">
                        <h2>₩ {item.cost}</h2>
                        <p>{index !== 0 && '(부가세별도)'}</p>
                      </div>  
                      <div className='costBox-buttonBox'>
                        <p className={selectedBox === index ? 'costBox-button selected' :'costBox-button'}>선택</p>
                      </div>
                    </li>
                  )
                })
              }
            </ul>

            <div className="apply_subtitle">
              <p>연주회 데이터 입력 여부 선택</p>
              <span className='apply_subtitle_sub'>(연주회정보, 프로그램, 프로필)</span>
            </div>

            <ul className="apply_selectBox">
              <div className={selectedIsDataInput === 1 ? 'apply_selectBtn selected' : 'apply_selectBtn'}
                onClick={()=>{
                  setSelectedIsDataInput(1);
                  handleDiscount(false);
                }}
              >
                <p className='apply_selectBtn_text'>연주회 정보 입력도 같이 작업해주세요</p>
                <p className={selectedIsDataInput === 1 ? 'selectBtn selected' : 'selectBtn'}>선택</p>
              </div>
              <div className={selectedIsDataInput === 2 ? 'apply_selectBtn selected' : 'apply_selectBtn'}
                onClick={()=>{
                  setSelectedIsDataInput(2);
                  handleDiscount(true);
                }}
              >
                <p className='apply_selectBtn_text'>직접 연주회 정보를 입력할래요</p>
                <p className='apply_selectBtn_text'>(20% 할인)</p>
                <p className={selectedIsDataInput === 2 ? 'selectBtn selected' : 'selectBtn'}>선택</p>
              </div>
            </ul>

            <div className="apply_subtitle">
              <p>포스터&프로필 이미지 여부 선택</p>
            </div>

            <ul className="apply_selectBox">
              <div className={selectedIsHaveImage === 1 ? 'apply_selectBtn selected' : 'apply_selectBtn'}
                onClick={()=>{
                  setSelectedIsHaveImage(1);
                }}
              >
                <p className='apply_selectBtn_text'>이미 제작된 포스터 이미지 파일을 가지고 있어요</p>
                <p className={selectedIsHaveImage === 1 ? 'selectBtn selected' : 'selectBtn'}>선택</p>
              </div>
              <div className={selectedIsHaveImage === 2 ? 'apply_selectBtn selected' : 'apply_selectBtn'}
                onClick={()=>{
                  setSelectedIsHaveImage(2);
                }}
              >
                <p className='apply_selectBtn_text'>처치북의 전문 디자이너에게 디자인을 맡길래요</p>
                <p className='apply_selectBtn_text'>(비용 별도)</p>
                <p className={selectedIsHaveImage === 2 ? 'selectBtn selected' : 'selectBtn'}>선택</p>
              </div>
            </ul>

            <div className="divider" style={{marginBottom:'20px'}}></div>

            <div className="apply_subtitle">
              <p>전체 요금</p>
            </div>

            <ul className="apply_costAll">
              <div className="costAllBox">
                <h3>선택요금</h3>  
                <p>₩ {selectCost.toLocaleString()}</p>  
              </div>
              <div className="costAllBox">
                <h3>부가세(vat)</h3>  
                <p>₩ {vatCost.toLocaleString()}</p>
              </div>
              <div className="costAllBox">
                <h3>최종요금</h3>  
                <p>₩ {costAll.toLocaleString()}</p>
              </div>
            </ul>

            <div className="buttonbox">
              <div className="button"
              onClick={()=>{
                alert('준비중입니다.')
                // registerComment();
              }}
              >
                <p>구매하기</p>
              </div>
            </div> */}

          </div>

        </div>
          
       

      </div>

      <Footer />
    </div>
  )
}



