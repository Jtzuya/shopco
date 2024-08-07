import React, { useEffect, useRef, useState } from "react";
import { useProductContext } from "../../../../libs/context/ProductContext"
import CheckIcon from "../../Icons/CheckIcon";

type InputVal = { 
  collection      : string[] | [];
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
  const checkbox = useRef<HTMLInputElement>(null)
  const {product} = useProductContext()
  const [isLoading, isSetLoading] = useState(true)
  
  const [group, setGroup] = useState<string[] | []>([])
  const [showGroup, setShowGroup] = useState(false)

  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        isSetLoading(false)
        clearTimeout(timer)
      }, 5000)
    }
  }, [product])

  function removeCollection(e: React.MouseEvent<HTMLButtonElement>, i: number) {
    e.preventDefault()
    console.log('remove index of', i, 'from group array')
    
    setGroup(prev => {
      const arr = prev.filter((_, idx) => {
        return idx !== i
      })

      return arr
    })

    if (!checkbox.current) return
    checkbox.current.setAttribute('data-checked-state', 'false')
  }

  function showSelections(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault
    setShowGroup(true)
    console.log('run')
  }

  function hideSelections(e: React.MouseEvent<HTMLSpanElement>) {
    e.preventDefault()
    setShowGroup(false)
  }

  function addToGroup(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault()

    const isChecked = e.currentTarget.getAttribute('data-checked-state')
    const value = e.currentTarget.getAttribute('data-value')
    if (!isChecked && !value) return

    if (isChecked === 'false') {
      e.currentTarget.setAttribute('data-checked-state', 'true')
      if (value) {
        setGroup(prev => [...prev, value])
      }
    } else {
      e.currentTarget.setAttribute('data-checked-state', 'false')
      setGroup((prev) => prev.filter((_, idx) => idx !== 0));
    }
  }

  return (
    <div className={`form__field ${props.dynamic && isLoading ? 'form__field--skeleton' : ''}`}>
      <p>{props.label}</p>
      <label data-margin="false">
        <input 
          type={props.type}
          name={props.name}
          onFocus={e => showSelections(e)}
          id={props.id}
          // onChange={e => changeHandler(e.target.value, props.pkey)} 
          placeholder={props.placeholder}
        />
      </label>

      <div className={`form__field-existing-selections ${showGroup ? 'form__field-existing-selections--active' : ''}`}>
        <div className="form__field-existing-selection">
          <label htmlFor="collection_name" className="form__field-existing-selection-virtual-checkbox">&nbsp;</label>
          <input ref={checkbox} onClick={e => addToGroup(e)} data-value={'Collection Item'} data-checked-state='false' type="checkbox" name="collection_name" id="collection_name" hidden />
          <span className="form__field-existing-selection-checkbox">
            <CheckIcon />
          </span>
          <span className="form__field-existing-selection-text">Collection Item</span>
        </div>

        <span className="form__field-existing-selection-hide" onClick={e => hideSelections(e)}>Close</span>
      </div>

      <div className="form__field-selected">
        {
          group ? 
          group.map((i, idx) => {
            return (<div key={idx} className="form__field-selected__item">
              <a href="/" title="Visit collection">{i}</a>
              <button onClick={e => removeCollection(e, idx)} title="Delete collection">
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