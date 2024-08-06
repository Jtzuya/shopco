import { Link } from "react-router-dom";

type Pagination = {
  length: number;
  callback: (page: number) => void;
}

export default function Pagination(props: Pagination) {
  const { length, callback } = props
  const len = Math.ceil(length / 5)

  return (
    <div className="pagination">
      <div className="pagination__pages">
        {
          Array.from({ length: len }, (_, i) => {
            return(
              // <button onClick={() => callback(i + 1)} className="pagination__page" data-to={`/admin/product-list?page=${i + 1}`} key={i + 1}>{i + 1}</button>
              <Link onClick={() => callback(i + 1)} className="pagination__page" to={`/admin/product-list?page=${i + 1}`} key={i + 1}>{i + 1}</Link>
            )
          })
        }
      </div>
    </div>
  )
}