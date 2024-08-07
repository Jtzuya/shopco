import { useEffect, useState } from "react";
import { useProductContext } from "../../../../libs/context/ProductContext"
import { T } from "../../../../types/Product";

type InputVal = { 
  colors  : T[] | []; 
  sizes   : T[] | []; 
}

type Input = {
  label: string;
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
export default function VariantInput(props: Input) {
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
    console.log(value)
    setProduct(prev => {
      if (!prev) return null;

      return {
        ...prev,
        [key]: value.split(', ')
      };
    });
  }

  return (
    <div className={`form__field ${props.dynamic && isLoading ? 'form__field--skeleton' : ''}`}>
      <p>{props.label}</p>
      <label>
        <input 
          type={props.type}
          name={props.name}
          id={props.id}
          value={product[props.pkey] ? product[props.pkey].join(', ') : ''}
          onChange={e => changeHandler(e.target.value, props.pkey)} 
          placeholder={props.placeholder}
        />
      </label>
    </div>    
  )
}