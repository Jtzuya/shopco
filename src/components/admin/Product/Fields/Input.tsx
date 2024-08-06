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
export default function Input(props: Input) {
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
    if (typeof product[props.pkey] === 'number') {
      isNumber(value, key)
      return
    }

    if (typeof product[props.pkey] === 'string') {
      isString(value, key)
      return
    }
  }

  function isString(value: string, key: string) {
    setProduct(prev => {
      if (!prev) return null;

      return {
        ...prev,
        [key]: value
      };
    });
  }

  function isNumber(value: string, key: string) {
    if (isNaN(parseFloat(value)) === true && value.length > 0) return

    if (isNaN(parseFloat(value)) === true) {
      setProduct(prev => {
        if (!prev) return null;

        return {
          ...prev,
          [key]: 0
        }
      })

      return
    }

    if (parseFloat(value) > 999_999_999) {
      return
    }

    setProduct(prev => {
      if (!prev) return null;

      return {
        ...prev,
        [key]: parseInt(value)
      }
    })
  }

  return (
    <div className={`form__field ${props.dynamic && isLoading ? 'form__field--skeleton' : ''}`}>
      <p>{props.label}</p>
      <label>
        <input 
          type={props.type}
          name={props.name}
          id={props.id}
          value={product[props.pkey] ? product[props.pkey] : props.type === 'text' ? '' : 0}
          onChange={e => changeHandler(e.target.value, props.pkey)} 
          placeholder={props.placeholder}
        />
      </label>
    </div>    
  )
}