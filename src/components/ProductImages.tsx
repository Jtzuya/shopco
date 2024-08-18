import ImagePlaceholderIcon from "./admin/Icons/ImagePlaceholderIcon"

type Prop = {
  images: string[]
}

export default function ProductImages(props: Prop) {
  const { images } = props

  return (
    <div className="product__images">
      <div className="product__images-stacked">
        {
          images.map((image, idx) => {
            const imageName = image.split('?')[0].split('.com/')[1]
            return (
              <div key={idx} className="product__images-stacked-wrapper">
                { image ? <img src={image} alt={imageName} /> : <ImagePlaceholderIcon /> }
              </div>
            )
          })
        }
      </div>

      <div className="product__images-main">
        {
          images.length > 0 ?
            <img src={images[0]} alt={'imageName'} />
            :
            <ImagePlaceholderIcon />
        }
      </div>
    </div>
  )
}