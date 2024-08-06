type Price = {
  current: number, 
  old?: number
}

export default function Price(props: Price) {
  const { current, old } = props
  const sale = () => {
    if (old) {
      const tempval = Math.round(((100 * current) / old) - 100)
      return tempval
      return (Math.sign(tempval) * tempval).toFixed()
    }
  }

  const priceState = old && current > old ? '--increased' : ''

  return (
    <div className="product__prices">
      <span className="product__price-current">$260</span>
      {
        old ?
        <>
          <span className="product__price-old">$300</span>
          <span className={`product__price-saved${priceState}`}>{sale()}%</span>
        </> 
        : ''
      }
    </div>
  )
}