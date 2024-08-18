import React, { createRef, Ref, RefObject, useEffect, useRef, useState } from "react";
import { useProductContext } from "../../../../libs/context/ProductContext"
import CheckIcon from "../../Icons/CheckIcon";
import skeletonLoader from "../../../../libs/helper/skeletonLoader";
import { CollectionEntries } from "../../../../types/Product";

type InputVal = { 
  collections      : string[] | [];
}

type Input = {
  label?: string;
  type: string;
  name: string; // should be the same key inside context
  id: string;
  placeholder: string;
  dynamic: boolean;
  pkey: keyof InputVal;
}


/**
 * @description this function atm only uses type of text and number
 */
export default function GroupedInput(props: Input) {
  const {product, setProduct} = useProductContext()
  const { collections, collection_entries } = product
  const [isLoading, setIsLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const selectionRefs             = useRef<(HTMLInputElement | null)[]>([])

  const collectionEntriesMap = new Map(collection_entries.map(entry => [entry.collection_id, entry]))

  const collectionsExtend = collections.map(collection => {
    return {
      ...collection, 
      isSelected: collectionEntriesMap.get(collection.id) ? true : false
    }
  })

  if (isLoading === true) {
    (async() => {
      const animationTimer = await skeletonLoader(1000)
      setIsLoading(animationTimer)
    })()
  }

  function removeCollection(e: React.MouseEvent<HTMLButtonElement>, collection_id: number) {
    e.preventDefault()
    // console.log(selectionRefs.current)
    if (!selectionRefs.current) return
    if (selectionRefs.current.length < 1) return

    const map = new Map(selectionRefs.current.map(selection => [selection?.id, selection]));
    const removeAttributes = map.get(String(collection_id));

    if (!removeAttributes) return
    removeAttributes.setAttribute('data-checked-state', 'false')
    setProduct(prev => {
      if (!prev) return null
      const collection_entries = prev.collection_entries.filter(collection => collection.collection_id !== collection_id)

      return {
        ...prev,
        collection_entries
      }
    })
  }

  function isOpenModal(e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault
    setOpenModal(!openModal)
  }

  function addToGroup(e: React.MouseEvent<HTMLInputElement>, collection_id: number, name: string) {
    e.preventDefault()
    const isChecked = e.currentTarget.getAttribute('data-checked-state')
    const value     = e.currentTarget.getAttribute('data-value')
    if (!isChecked && !value) return

    if (isChecked === 'false') {
      e.currentTarget.setAttribute('data-checked-state', 'true')
      if (value) {
        setProduct(prev => {
          if (!prev) return null

          const c_entries = prev.collection_entries;

          return {
            ...prev,
            collection_entries: [
              ...c_entries,
              {
                name,
                collection_id,
                product_id: prev.id
              }
            ]
          }
        })
      }
    } else {
      e.currentTarget.setAttribute('data-checked-state', 'false')
      setProduct(prev => {
        if (!prev) return null
        const collection_entries = prev.collection_entries.filter(collection => collection.collection_id !== collection_id)

        return {
          ...prev,
          collection_entries
        }
      })
    }
  }

  return (
    <div className={`form__field ${props.dynamic && isLoading ? 'form__field--skeleton' : ''}`}>
      <span className={`backdrop ${openModal ? '' : 'hidden'}`} onClick={e => isOpenModal(e)}>&nbsp;</span>

      <p>{props.label}</p>
      <label data-margin="false">
        <input 
          type={props.type}
          name={props.name}
          onFocus={e => isOpenModal(e)}
          id={props.id}
          // onChange={e => changeHandler(e.target.value, props.pkey)} 
          placeholder={props.placeholder}
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
                    onClick={e => addToGroup(e, collection.id, collection.name)} 
                    data-value={collection.name} 
                    data-checked-state={collection.isSelected ? 'true' : 'false'} 
                    type="checkbox" name={String(collection.id)} 
                    id={String(collection.id)} hidden 
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
          collection_entries ? 
          collection_entries.map((collection) => {
            return (<div key={collection.collection_id} className="form__field-selected__item">
              <a href="/" title={`Visit ${collection.name}`}>{collection.name}</a>
              <button onClick={e => removeCollection(e, collection.collection_id)} title="Delete collection">
                <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
                  <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"></path>
                </svg>
              </button>
            </div>)
          })
          :
          ''
        }
      </div>
    </div>    
  )
}