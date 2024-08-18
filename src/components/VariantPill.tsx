import { useState } from "react";

type Prop = {
  items: string[];
  title: string;
  callback: (selected: string) => void;
}

export default function VariantPill(props: Prop) {
  const { items, title, callback } = props
  const [isActiveIdx, setIsActiveIdx] = useState(0)

  function clickHandler(index: number, selected: string) {
    if (isActiveIdx === index) return
    setIsActiveIdx(index)
    callback(selected)
  }

  return (
    <>
    {
      items.length > 0 ?
      <div className="product__variant product__variant--sizes">
        <div className="product__variant-title">{title}</div>
        <div className="product__variant-selections">
          { 
            items.map((item, idx) => { 
              return (
                <span
                  onClick={() => clickHandler(idx, item)}
                  key={idx}
                  className={idx === isActiveIdx ? "product__variant-item product__variant-item--selected" : "product__variant-item"} 
                  data-size={item}
                >
                  {item}
                </span>    
              )
            }) 
          }
        </div>
      </div>
      : ''
    }
    </>
  )
}