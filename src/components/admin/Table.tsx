// import 'dotenv/config'
// const serverOrigin = process.env.REACT_APP_SERVER
import { Link } from 'react-router-dom';
import { useRef, useState, RefObject, createRef } from 'react'
import { Table as PTT } from '../../types/Product';

interface TableProps {
  products: PTT[];
}

export default function Table(props: TableProps) {
  const [checkbox, setCheckbox] = useState(false)
  const { products } = props

  // const tableRowRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  const tableRowRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  // tableRowRefs.current = []

  if (products.length) {
    // tableRowRefs.current = Array.from({ length: products.length }, () => createRef(null));
    tableRowRefs.current = Array.from({ length: products.length }, () => createRef<HTMLInputElement>());
  }

  function checkBoxHandler(state: boolean) {
    // console.log(tableRowRefs)
    tableRowRefs.current.forEach((row) => {
      // console.log(row);
      if (row && row.current) row.current.checked = !state;
    });
    setCheckbox(!state)
  }

  return (
    <div className="table">
      <div className="table__heading">
        <div className="table__row">
          {/* select all products in this page*/}
          <div className="table__cell">
            <input type="checkbox" name="select_all_products" id="select_all_products" onClick={() => checkBoxHandler(checkbox)}/> 

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
                  <input type="checkbox" name="select_product" id="select_product" ref={tableRowRefs.current[idx]}/> 
                </div>
                <div className="table__cell">
                  <Link to={`/admin/product/${product.product_id}`}>{product.name}</Link>
                </div>
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