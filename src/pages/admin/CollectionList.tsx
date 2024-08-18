import { Link } from "react-router-dom";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import { useState } from "react";
import Endpoints from "../../libs/helper/endpoints";
import butter from "../../libs/helper/butter";
import cache from "../../libs/helper/cache";
import GetErrorMessage from "../../helpers/GetErrorMessage";
import Pagination from "../../components/admin/Pagination";
import CollectionTable from "../../components/admin/CollectionTable";

const Server = new Endpoints()

type CollectionList = {
  id: number;
  name: string;
  created_at: string;
}

export default function CollectionList() {
  const [totalProductsInDb, setTotalProductsInDb] = useState<number | null>(null) // for pagination track
  const [collectionList, setCollectionList] = useState<CollectionList[] | []>([])
  const [onMountFetch, setOnMountFetch] = useState(true)
 
  async function onMountFetchHandler(page: number = 1) {
    // console.log(params)
    // console.log(window.location.search)
    setOnMountFetch(false)

    const collectionsInCache = cache({key: 'collections', method: 'getAll'})

    if (collectionsInCache) {
      console.log('get list collections from cache')
      for (const key of Object.keys(collectionsInCache)) {
        const {id, name, created_at} = collectionsInCache[key]
        setCollectionList(prev => [...prev, {id, name, created_at}])
      }

      // TODO: flaw of count
      const count = cache({key: 'collections_count', method: 'singleGet' })
      setTotalProductsInDb(Number(count))
      return
    }
    
    await getCollectionList(page)
  }

  async function getCollectionList(page: number = 1) {
    try {
      console.log('atempting to get list of collections from db')
      const request   = await butter(Server.getCollectionList(page), 'get')
      if (!request.ok) throw new Error('failed to grab data')

      const { data, count } = await request.json()

      if (data.length > 0) {
        data.map((collection: CollectionList) => { 
          cache({
            key: 'collections', 
            target_key: String(collection.id), 
            method: 'saveCollection', 
            collection: collection
          })
        })
      }

      if (page < 2) {
        cache({key: 'collections_count', method: 'singleSave', data: count }) // stores the collections count in localstorage
      }

      setTotalProductsInDb(count)
      setCollectionList(data)
    } catch (error) {
      alert(GetErrorMessage(error))
    }
  }

  // call funciton
  if (onMountFetch === true) { onMountFetchHandler() }

  async function paginationCallback(page: number) {
    await onMountFetchHandler(page)
  }

  return (
    <div className="admin">
      <div className="admin__wrapper">
        <Sidebar currentPage="collection-list" />

        <main className="products">
          <Nav name='Collections Dashboard' />
          <div className="products__links">
            <Link to={`/admin/collection/create`} className="products__create">Create new collection</Link>
          </div>

          {
            collectionList ?
            <div className="products__table">
              <CollectionTable
                column={2}
                heading={['Collection Name', 'Created']}
                to='/admin/collection'
                datas={collectionList}
              />
            </div>
            : 
            ''
          }

          <div className="products__pagination">
            { 
              totalProductsInDb ?
                totalProductsInDb > 5 ? 
                    <Pagination length={totalProductsInDb} callback={paginationCallback}/>
                  : 
                    'no' 
              : 
                '' 
            }
          </div>
        </main>
      </div>
    </div>
  )
}