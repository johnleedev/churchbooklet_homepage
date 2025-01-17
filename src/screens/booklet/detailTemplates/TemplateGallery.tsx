import MainURL from '../../../MainURL';

export default function TemplateGallery (props:any) {

  return (
    <div className="gallerybox">
    {
      props.galleryData.map((item:any, index:any)=>{
        const imageArray = JSON.parse(item.images);
        return (
          <div className="gallery-content" key={index}>
            <div className="gallery-content-mainTitle">&#183; {item.title} &#183;</div>
            <div className="gallery-content-image">
              {
                imageArray?.map((subItem:any, subIndex:any)=>{
                  return (
                    <img key={subIndex} src={`${MainURL}/images/booklet_gallery/${subItem}`} alt='profileImage'/>
                  )
                })
              }
            </div>
          </div>
        )
      })
    }
  </div>
  )
}



