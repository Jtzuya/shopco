import React from "react";
import { Collection, CollectionEntry } from "../../../../types/Product";


export type Name = {
  name: string;
}

type Prop = {
  loader          ?: boolean;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  mainkeyTarget    : string;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  uid              : string;

  placeholder     ?: string;

  /** Input's value */
  initialValue     : string;
  
  callback: (keys: string, value: string) => void;
}

/**
 * @description this function atm only uses type of text and number
 */
export default function NewInputVariant(props: Prop) {
  const { 
    loader,
    mainkeyTarget, 
    initialValue, 
    uid,
    placeholder,
    callback 
  } = props

  function handleChange(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault()

    const currentValue = e.target.value
    const keys = e.target.getAttribute('name')

    if (!keys) return

    callback(keys, currentValue)
  }

  return (
    <div className={`form__field ${loader ? 'form__field--skeleton' : ''}`}>
      <p>{uid.split('_').join(' ')}</p>
      <label>
        <input 
          type='text'
          name={mainkeyTarget}
          id={mainkeyTarget}
          value={initialValue}
          onChange={handleChange} 
          placeholder={placeholder ? placeholder : ''}
        />
      </label>
    </div>    
  )
}