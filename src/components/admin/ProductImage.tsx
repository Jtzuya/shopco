interface ProductImage {
  src: string;
  alt?: string;
}

export default function ProductImage(props: ProductImage) {
  const { src, alt } = props
  return (
    <div className="form__field-img">
      <img src={src} alt={alt} />
    </div>
  )
}