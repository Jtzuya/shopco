import { useRef, useState } from "react";
import { Collection, CollectionEntry } from "../../../../types/Product";
import CheckIcon from "../../Icons/CheckIcon";
import cache from "../../../../libs/helper/cache";
import butter from "../../../../libs/helper/butter";
import Endpoints from "../../../../libs/helper/endpoints";
import GetErrorMessage from "../../../../helpers/GetErrorMessage";

export type Name = {
  name: string;
  id: number;
}

type Prop = {
  loader          ?: boolean;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  mainkeyTarget    : string;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  uid              : string;

  placeholder     ?: string;

  /** Input's value */
  initialValue      : CollectionEntry[] | [];
  existingValue     : Collection[] | [];
  
  callback: (state: string, keys: string, value: Name) => void;
}

export default function NewInputGroup(props: Prop) {
  const { 
    loader,
    mainkeyTarget, 
    initialValue, 
    existingValue,
    uid,
    callback 
  } = props

  const selectionRefs        = useRef<(HTMLInputElement | null)[]>([])
  const collectionEntriesMap = new Map(initialValue.map(entry => [entry.id, entry]))
  const collectionsMap       = new Map(existingValue.map(collection => [collection.id, collection]))
  const collectionsExtend    = existingValue.map(collection => {
    return {
      ...collection, 
      isSelected: collectionEntriesMap.get(collection.id) ? true : false
    }
  })

  const [openModal, setOpenModal] = useState(false)

  async function isOpenModal(e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault
    setOpenModal(!openModal)
  }

  function add(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()
    // , collection_id: number, name: string

    const isChecked       = e.currentTarget.getAttribute('data-checked-state')
    const collection_id   = e.currentTarget.getAttribute('data-collection-id')
    const name            = e.currentTarget.getAttribute('data-collection-name')
    
    if (!collection_id) return
    if (!name) return

    switch (isChecked) {
      case 'false': {
        e.currentTarget.setAttribute('data-checked-state', 'true')
        callback('add', 'collection_entries', {
          id: Number(collection_id),
          name
        })
        return
      }
      default: {
        e.currentTarget.setAttribute('data-checked-state', 'false')
        callback('remove', 'collection_entries', {
          id: Number(collection_id),
          name
        })
        return
      }
    }
  }

  function remove(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const name            = e.currentTarget.getAttribute('data-collection-name')
    const collection_id   = e.currentTarget.getAttribute('data-collection-id')

    if (!name) return
    if (!collection_id) return
    if (!selectionRefs.current) return
    if (selectionRefs.current.length < 1) return

    const map = new Map(selectionRefs.current.map(selection => [selection?.id, selection]));
    const removeAttributes = map.get(String(collection_id));

    if (!removeAttributes) return
    removeAttributes.setAttribute('data-checked-state', 'false')
    callback('remove', 'collection_entries', {
      id: Number(collection_id),
      name
    })
  }

  return (
    <div className={`form__field ${loader ? 'form__field--skeleton' : ''}`}>
      <span className={`backdrop ${openModal ? '' : 'hidden'}`} onClick={e => isOpenModal(e)}>&nbsp;</span>

      <p>{uid.split('_').join(' ')}</p>
      <label data-margin="false">
        <input 
          type='text'
          name={mainkeyTarget}
          id={uid}
          onFocus={isOpenModal}
        />
      </label>

      <div className={`form__field-existing-selections ${openModal ? 'form__field-existing-selections--active' : ''}`}>
        { 
          collectionsExtend && collectionsExtend.length > 0 ? 
            collectionsExtend.map((collection, idx) => {
              return (
                <div key={collection.id} className="form__field-existing-selection">
                  <label htmlFor={String(collection.id)} className="form__field-existing-selection-virtual-checkbox">&nbsp;</label>
                  <input 
                    ref={(el) => (selectionRefs.current[idx] = el)} 
                    onClick={add}
                    data-collection-id={collection.id} 
                    data-collection-name={collection.name}
                    data-checked-state={collection.isSelected ? 'true' : 'false'} 
                    type="checkbox" 
                    name={String(collection.id)} 
                    id={String(collection.id)} 
                    hidden 
                  />
                  <span className="form__field-existing-selection-checkbox">
                    <CheckIcon /> 
                  </span>
                  <span className="form__field-existing-selection-text">{collection.name}</span>
                </div>                
              )
            })
          : ''
        }
      </div>

      <div className="form__field-selected">
        {
          initialValue && initialValue.length > 0 ? 
          initialValue.map((entry) => {
            const item = collectionsMap.get(entry.collection_id)
            if (item) {
              return (<div key={entry.collection_id} className="form__field-selected__item">
                <a href="/" title={`Visit ${item.name}`}>{item.name}</a>
                <button onClick={remove} data-collection-id={item.id} data-collection-name={item.name} title="Delete collection">
                  <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                    <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"></path>
                  </svg>
                </button>
              </div>)
            }
          })
          :
          ''
        }
      </div>
    </div>    
  )
}