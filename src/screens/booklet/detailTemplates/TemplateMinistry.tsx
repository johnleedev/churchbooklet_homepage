import YouTube from 'react-youtube';
import MainURL from '../../../MainURL';

export default function TemplateMinistry (props:any) {



  return (
    <div className="ministry-cover">
      {  
        props.ministryData?.map((item:any, index:any)=>{

          const imagesCopy = JSON.parse(item.images);

          return (
            <div className="ministry-content" key={index}>
              <div className="ministry-content-imagebox">
                <div className="ministry-content-image">
                  <img src={`${MainURL}/images/booklet_ministry/${imagesCopy[0]}`} alt='profileImage'/>
                </div>
                <div className="ministry-content-subimage">
                  <img src={`${MainURL}/images/booklet_ministry/${imagesCopy[1]}`} alt='profileImage'/>
                </div>
              </div>
              <div className="ministry-content-textbox">
                <div className="ministry-content-ministryName">{item.title}</div>
                <div className="ministry-content-notice">{item.notice}</div>
              </div>
            </div>
          )
        })
      }
    </div>  
  )
}



