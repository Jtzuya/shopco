import { Link } from "react-router-dom";
import EyeIcon from "./Icons/EyeIcon"
import ImagePlaceholderIcon from "./Icons/ImagePlaceholderIcon"

type Product = {
  id          : number;
  product_id  : string;
  name        : string;
  url        ?: string; // string of image url
}

type Prop = {
  products: Product[] | [];
}

export default function CollectionProduct(props: Prop) {
  const { products } = props

  return (
    <>
      <div className="collection__associated-products">
        <h1>Products associated with this collection</h1>
        {
          products && products.length > 0 ?
            products.map(product => {
              return(
                <div key={product.product_id} className="collection__associated-product">
                  <div className="collection__associated-product-image">
                    {product.url ? <img src={product.url} alt={product.name} /> : <ImagePlaceholderIcon />}
                  </div>
                  <div className="collection__associated-product-name">
                    <Link to={`/admin/product/${product.product_id}`}>{product.name}</Link>
                  </div>
                  <div className="collection__associated-product-icon">
                    <Link to={`/admin/product/${product.product_id}`}><EyeIcon /></Link>
                  </div>
                </div>
              )
            }) 
          :
          ''
        }
      </div>
    </>
  )
}