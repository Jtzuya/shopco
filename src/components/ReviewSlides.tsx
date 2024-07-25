export default function ReviewSlides(props) {
  const {Splide, SplideSlide} = props

  const reviews = [
    {
      author: 'Sharah M.',
      rating: [1,1,1,1,1],
      verified: true,
      message: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”` 
    },
    {
      author: 'Alex K.',
      rating: [1,1,1,1,1],
      verified: true,
      message: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.”` 
    },
    {
      author: 'James L.',
      rating: [1,1,1,0,0],
      verified: true,
      message: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”` 
    },
    {
      author: 'Mooen',
      rating: [1,1,1,1,1],
      verified: true,
      message: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.”` 
    },
    {
      author: 'Michelle O.',
      rating: [1,1,1,1,0],
      verified: false,
      message: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”` 
    },
  ]

  return (
    <Splide
      options={ 
        {
          rewind: true,
          gap   : '20px',
          perPage: 3,
          pagination: false,
          breakpoints: {
            767: {
              perPage: 1,
              perMove: 1
            }
          }
        } 
      }
      aria-label="My Favorite Images"
    >
      {
        reviews.map((i, idx) => {
          return(
            <SplideSlide key={idx}>
              <div className="review__card">
                <div className="review__card__ratings">
                  {
                    i.rating.map((rating, rIdx) => {
                      return (
                        <svg key={rIdx} width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.5526 0L14.751 6.8872L22.2895 7.80085L16.7278 12.971L18.1884 20.4229L11.5526 16.731L4.91676 20.4229L6.37735 12.971L0.815609 7.80085L8.3541 6.8872L11.5526 0Z" fill={rating === 1 ? "#FFC633" : "grey"}/>
                        </svg>
                      )
                    })
                  }
                </div>
    
                <div className="review__card__author">
                  <p>{i.author}</p>
                  <span className="review__card__verified">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.8291C10.0716 2.8291 8.18657 3.40093 6.58319 4.47227C4.97982 5.54362 3.73013 7.06636 2.99218 8.84794C2.25422 10.6295 2.06114 12.5899 2.43735 14.4812C2.81355 16.3725 3.74215 18.1098 5.10571 19.4734C6.46928 20.837 8.20656 21.7656 10.0979 22.1418C11.9892 22.518 13.9496 22.3249 15.7312 21.5869C17.5127 20.849 19.0355 19.5993 20.1068 17.9959C21.1782 16.3925 21.75 14.5075 21.75 12.5791C21.7473 9.99408 20.7192 7.51571 18.8913 5.68783C17.0634 3.85994 14.585 2.83183 12 2.8291ZM16.2806 10.8597L11.0306 16.1097C10.961 16.1795 10.8783 16.2348 10.7872 16.2725C10.6962 16.3103 10.5986 16.3297 10.5 16.3297C10.4014 16.3297 10.3038 16.3103 10.2128 16.2725C10.1218 16.2348 10.039 16.1795 9.96938 16.1097L7.71938 13.8597C7.57865 13.719 7.49959 13.5281 7.49959 13.3291C7.49959 13.1301 7.57865 12.9392 7.71938 12.7985C7.86011 12.6577 8.05098 12.5787 8.25 12.5787C8.44903 12.5787 8.6399 12.6577 8.78063 12.7985L10.5 14.5188L15.2194 9.79848C15.2891 9.72879 15.3718 9.67352 15.4628 9.63581C15.5539 9.59809 15.6515 9.57868 15.75 9.57868C15.8486 9.57868 15.9461 9.59809 16.0372 9.63581C16.1282 9.67352 16.2109 9.72879 16.2806 9.79848C16.3503 9.86816 16.4056 9.95088 16.4433 10.0419C16.481 10.133 16.5004 10.2306 16.5004 10.3291C16.5004 10.4276 16.481 10.5252 16.4433 10.6163C16.4056 10.7073 16.3503 10.79 16.2806 10.8597Z" fill={i.verified === true ? '#01AB31' : 'gray'}/>
                    </svg>
                  </span>
                </div>
    
                <p className="review__card__message">{i.message}</p>
              </div>
            </SplideSlide>
          )
        })
      }
    </Splide>
  )
}