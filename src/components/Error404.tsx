import { Link } from "react-router-dom";

type ErrorTypes = {
  message: string;
}

export default function Error404(props: ErrorTypes) {
  const { message } = props
  // const collectionUrl = ['/brands', '/on-sale', '/new-arrivals']
  // const randomCollectionIdx = Math.floor(Math.random() * ((collectionUrl.length - 1) - 0))

  return (
    <div className="error">
      <div className="error__wrapper">
        <h1>{message}</h1>
        <Link to={'/'} className="error__collection-link">Browse Collections</Link>
      </div>
    </div>
  )
}