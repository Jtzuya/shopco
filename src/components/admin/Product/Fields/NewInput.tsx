import React from "react";

type Prop = {
  loader          ?: boolean;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  mainkeyTarget    : string;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  uid              : string;

  /** Input's value */
  initialValue     : string | number;
  
  callback: (keys: string, value: string | number) => void;
}

export default function NewInput(props: Prop) {
  const { 
    loader,
    mainkeyTarget, 
    initialValue, 
    uid,
    callback 
  } = props

  function handleChange(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault()
    const keys = e.currentTarget.getAttribute('name')
    const value = e.currentTarget.value

    if (!keys) return

    if (typeof initialValue === 'number') {
      isNumber(value, keys)
      return
    }

    if (typeof initialValue === 'string') {
      isString(value, keys)
      return
    }
  }

  function isString(value: string, keys: string) {
    callback(keys, value)
  }

  function isNumber(value: string, keys: string) {
    if (isNaN(parseFloat(value)) === true && value.length > 0) return

    if (isNaN(parseFloat(value)) === true) {
      callback(keys, 0)
      return
    }

    if (parseFloat(value) > 999_999_999) return

    callback(keys, parseInt(value))
  }

  return (
    <div className={`form__field ${loader ? 'form__field--skeleton' : ''}`}>
      <p>{uid.split('_').join(' ')}</p>
      <label>
        <input 
          type='text'
          name={[mainkeyTarget, uid].join('&')}
          id={uid}
          value={initialValue}
          onChange={handleChange} 
          placeholder='Lorem Ipsum Dolor Set'
        />
      </label>
    </div> 
  )
}