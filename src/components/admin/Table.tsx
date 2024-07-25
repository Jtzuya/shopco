// import 'dotenv/config'
// const serverOrigin = process.env.REACT_APP_SERVER
import { useEffect, useRef, useState, MutableRefObject } from 'react'

interface Product {
  name: string;
  stock: number;
}

interface TableProps {
  products: Product[];
}

export default function Table(props: TableProps) {
  const [checkbox, setCheckbox] = useState(false)
  const { products } = props
  const itemRefs: MutableRefObject<HTMLInputElement | null>[] = [];

  if (products && products.length > 0) {
    for (let i = 0; i < products.length; i++) {
      itemRefs.push(useRef(null))
    }
  }

  function checkBoxHandler() {
    setCheckbox(!checkbox)
  }

  useEffect(() => {
    if (checkbox === true) {
      itemRefs.forEach(i => {
        if (i.current) i.current.checked = true
      })
    } 

    if (checkbox === false) {
      itemRefs.forEach(i => {
        if (i.current) i.current.checked = false
      })
    }
  }, [checkbox, itemRefs])

  return (
    <div className="table">
      <div className="table__heading">
        <div className="table__row">
          {/* select all products in this page*/}
          <div className="table__cell">
            <input type="checkbox" name="select_all_products" id="select_all_products" onClick={checkBoxHandler}/> 

          </div>
          <div className="table__cell">Product</div>
          <div className="table__cell">Status</div>
          <div className="table__cell">Inventory</div>
          <div className="table__cell">Category</div>
          <div className="table__cell">Type</div>
        </div>
      </div>

      <div className="table__body">
        {
          products.map((product, idx) => {
            return (
              <div key={idx} className="table__row">
                <div className="table__cell">
                  <input type="checkbox" name="select_product" id="select_product" ref={itemRefs[idx]}/> 
                </div>
                <div className="table__cell">{product.name}</div>
                <div className="table__cell">Active</div>
                <div className="table__cell">
                  {/* <p>30 in stock for 3 variants 30 in stock for 3 variants</p> */}
                  <p>{product.stock} in stock</p>
                </div>
                <div className="table__cell"></div> {/** if blank means no category */}
                {/* <div className="table__cell">accessories</div> */}
                <div className="table__cell"></div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}