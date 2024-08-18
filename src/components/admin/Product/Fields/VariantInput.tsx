import { useState } from "react";
import { useProductContext } from "../../../../libs/context/ProductContext"
import { Color, Name, Size, T } from "../../../../types/Product";
import skeletonLoader from "../../../../libs/helper/skeletonLoader";

type InputVal = { 
  colors  : Color; 
  sizes   : Size; 
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
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading === true) {
    (async() => {
      const animationTimer = await skeletonLoader(1000)
      setIsLoading(animationTimer)
    })()
  } 

  function changeHandler(value: string) {
    const input = value.split(', ').map((name, sort_order_id) => {
      return {
        name,
        sort_order_id
      }
    })

    setProduct(prev => {
      if (!prev || !prev[props.pkey]) return prev;

      return {
        ...prev,
        [props.pkey]: {
          id: prev[props.pkey].id,
          names: input
        }
      };
    });
  }

  const value = () => {
    if (!product[props.pkey]) return ''

    let temp = ''
    const namesLength = product[props.pkey].names.length - 1
    product[props.pkey].names.map((item: Name, idx: number) => {
      const concat = namesLength !== idx ? ', ' : ''
      temp += item.name + concat
    })

    return temp
  }

  return (
    <div className={`form__field ${props.dynamic && isLoading ? 'form__field--skeleton' : ''}`}>
      <p>{props.label}</p>
      <label>
        <input 
          type={props.type}
          name={props.name}
          id={props.id}
          value={value()}
          onChange={e => changeHandler(e.target.value)} 
          placeholder={props.placeholder}
        />
      </label>
    </div>    
  )
}