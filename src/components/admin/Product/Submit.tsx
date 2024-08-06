import { useEffect, useState } from "react";
import { useProductContext } from "../../../libs/context/ProductContext";

type SubmitBtnProps = {
  value: string;
  modifier?: string;
  dynamic: boolean;
}

export default function SubmitBtn(props: SubmitBtnProps) {
  const { value, modifier } = props
  const {product} = useProductContext()
  const [isLoading, isSetLoading] = useState(true)

  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        isSetLoading(false)
        clearTimeout(timer)
      }, 5000)
    }
  }, [product])

  return (
    <div className={`form__field ${props.dynamic && isLoading ? 'form__field--skeleton' : ''}`}>
      <div className="form__field-submit-wrapper">
        <input className={`form__field-submit ${modifier ? 'form__field-submit--' + modifier : ''}`} type="submit" value={value} />
      </div>
    </div>
  )
}