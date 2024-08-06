import { useEffect, useState } from "react";
import { useProductContext } from "../../../../libs/context/ProductContext"

type InputVal = { 
  name            : string; 
  description     : string; 
  summary         : string; 
  stock           : number; 
  current_price   : number; 
  old_price       : number;
}

type Input = {
  label?: string;
  name: string; // should be the same key inside context
  id: string;
  placeholder: string;
  dynamic: boolean;
  pkey: keyof InputVal;
}

/**
 * @description this function atm only uses type of text and number
 */
export default function Textarea(props: Input) {
  const {product, setProduct} = useProductContext()
  const [isLoading, isSetLoading] = useState(true)

  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        isSetLoading(false)
        clearTimeout(timer)
      }, 5000)
    }
  }, [product])

  function changeHandler(value: string, key: string) {
    setProduct(prev => {
      if (!prev) return null;

      return {
        ...prev,
        [key]: value
      };
    });
  }

  return (
    <div className={`form__field ${props.dynamic && isLoading ? 'form__field--skeleton' : ''}`}>
      <p>{props.label}</p>
      <label>
        <textarea 
          name={props.name}
          id={props.id}
          value={product[props.pkey] ? product[props.pkey] : ''}
          onChange={e => changeHandler(e.target.value, props.pkey)} 
          placeholder={props.placeholder}>``</textarea>
      </label>
    </div>    
  )
}
