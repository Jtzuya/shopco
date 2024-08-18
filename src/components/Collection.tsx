import { Link } from "react-router-dom";
import ImagePlaceholderIcon from "./admin/Icons/ImagePlaceholderIcon";
import Stars from "./Stars";

// interface Reviews {
//   name: string;
//   message: string;
//   date: string;
//   verified: boolean;
//   rating_count: number;
// }

interface Product {
  // id: number;
  // product_id: string;
  name: string;
  url: string; // first image url
  current_price: number;
}


interface CollectionProps {
  underline?    : boolean;
  toCollection? : boolean;
  title         : string;
  data          : Product[];
  loader?       : boolean;
}

export default function Collection(props: CollectionProps) {
  const { underline, toCollection, data, title, loader } = props
  // const review_count = 4.5
  // const review_stars = 5

  return(
    <section className={loader ? 'collection collection--skeleton' : 'collection'}>
      <div className={`collection__wrapper ${underline ? 'collection__wrapper--separator' : ''}`}>
        <h3 className="collection__heading">{title}</h3>
        <div className="collection__products">
          {
            data.map((product, idx) => {
              const { name, url, current_price } = product
              const rating_count = Math.floor(Math.random() * (5 - 3) + 1) + 3
              const product_url = ['/product', name].join('/')

              return (
                <div key={idx} className="collection__product">
                  <div className="collection__product-img-wrapper">
                    { url ? <img src={url} alt="" className='collection__product-img'/> : <ImagePlaceholderIcon /> }
                  </div>
                  
                  <Link to={product_url} className="collection__product-title">{name}</Link>
                  <div className="collection__ratings">
                    <div className="collection__ratings-stars">
                      <Stars rating_count={rating_count} />
                    </div>
                    <span className="collection__ratings-count">{rating_count}/5</span>
                  </div>
                  <p className="collection__price">&#36;{current_price}</p>
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