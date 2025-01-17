import './Booklet.scss';
import { useNavigate } from 'react-router-dom';
import MainURL from '../../MainURL';

export default function BookletList (props:any) {

  let navigate = useNavigate();


  return (
    <div className="subpage__main__content">

      <div className="main__content">
      {
        props.bookletData.length > 0 && !props.isResdataFalse
        ?
        props.bookletData.map((item:any, index:any) => (
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
                      window.scrollTo(0, 0);
                      navigate(`/churchbooklets/bookletdetail?id=${subItem.bookletId}&currentNum=1&currentSubNum=0`);
                    }}
                  >
                    <div className="pamphlet__img--cover">
                      <div className='imageBox'>
                        <img src={`https://churchbooklet.com/images/booklet_mainimages/241009_eunhyein.jpg`} alt={'등록된 사진이 없습니다.'} />
                      </div>
                    </div>
                    <div className="namecard">
                      <p>{subItem.religiousbody}</p>
                    </div>
                    <div className="pamphlet__coname">
                      <p>{subItem.churchName}</p>
                    </div>
                    <div className="pamphlet__name">
                      <p className='pamphlet__name-title'>담임</p>
                      <div className="pamphlet__divider"></div>
                      <p>{subItem.mainPastor}</p>
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
  )
}



