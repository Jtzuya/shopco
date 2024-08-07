import { Link } from "react-router-dom";

import HomeIcon from "./Icons/HomeIcon";
import ProductIcon from "./Icons/ProductIcon";
import CollectionIcon from "./Icons/CollectionIcon";
import TransactionIcon from "./Icons/TransactionIcon";

interface Sidebar {
  current: boolean;
  name: string;
  url: string;
}

export default function SidebarLink(props: Sidebar) {
  const { current, name, url } = props

  function whichIcon(name: string) {
    switch(name.toLocaleLowerCase()) {
      case 'overview': {
        return <HomeIcon />
      }
      case 'products' || 'product-list': {
        return <ProductIcon />
      }
      case 'collections' || 'collection-list': {
        return <CollectionIcon />
      }
      case 'transactions': {
        return <TransactionIcon />
      }
    }
  }

  return(
    <Link to={url} className={`sidebar__menus-link ${current ? 'sidebar__menus-link--active' : ''}`}>
      { whichIcon(name) }
      <span>{ name }</span>
    </Link>
  )
}