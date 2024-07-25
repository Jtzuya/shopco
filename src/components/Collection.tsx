interface Reviews {
  name: string;
  message: string;
  date: string;
  verified: boolean;
  rating_count: number;
}

interface Product {
  id: number;
  title: string;
  colors: string[];
  sizes: string[];
  category: string[];
  details: string;
  product_summary: string;
  images: string[];
  current_price: number;
  stock: number;
  reviews: Reviews[];
}


interface CollectionProps {
  underline?: boolean;
  toCollection?: boolean;
  title: string;
  data: Product[];
}

export default function Collection(props: CollectionProps) {
  const { underline, toCollection, title, data } = props
  // const review_count = 4.5
  // const review_stars = 5

  return(
    <section className="collection">
      <div className={`collection__wrapper ${underline ? 'collection__wrapper--separator' : ''}`}>
        <h3 className="collection__heading">{title}</h3>
        <div className="collection__products">
          {
            data.map((i, idx) => {
              return (
                <div key={idx} className="collection__product">
                <img src={i.images[0]} alt="" className='collection__product-img'/>
                <p className="collection__product-title">{i.title}</p>
                <div className="collection__ratings">
                  <div className="collection__ratings-stars"></div>
                  <span className="collection__ratings-count">4.5/5</span>
                </div>
                <p className="collection__price">{i.current_price}</p>
              </div>    
              )
            })
          }
        </div>
        { toCollection ? <a href="#" className="collection__cta">View All</a> : '' }
      </div>
    </section>
  )
}