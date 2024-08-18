import React from "react";

type Prop = {
  loader          ?: boolean;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  mainkeyTarget    : string;
  /** Should be a key that exists in the type you are referencing when rendering this input. */
  uid              : string;

  /** Input's value */
  initialValue     : string | number;
  
  callback: (keys: string, value: string) => void;
}

export default function NewTextarea(props: Prop) {
  const { 
    loader,
    mainkeyTarget, 
    initialValue, 
    uid,
    callback 
  } = props

  function handleChange(e: React.FocusEvent<HTMLTextAreaElement>) {
    e.preventDefault();

    const keys = e.currentTarget.getAttribute('name')
    const value = e.currentTarget.value

    if (!keys) return

    callback(keys, value)
  }
  
  return (
    <div className={`form__field ${loader ? 'form__field--skeleton' : ''}`}>
      <p>{uid.split('_').join(' ')}</p>
      <label>
        <textarea 
          name={[mainkeyTarget, uid].join('&')}
          id={uid}
          value={initialValue}
          onChange={handleChange} 
        >``</textarea>
      </label>
    </div>    
  )
}