type StarProps = {
  rating_count: number;
}

// TODO: fix component. This is currently a temporary component
export default function Stars(props: StarProps) {
  
  return (
    <div className="rating__stars">
      {
        props.rating_count ?
          (
            Array.from({ length: 5 }, (_, i) => {
              return (
                <svg key={i} data-t={(i + 1) - props.rating_count} className="rating__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill={(i + 1) - props.rating_count > 0 ? "grey" : "#FFC633"}
                    d="M11.5526 0L14.751 6.8872L22.2895 7.80085L16.7278 12.971L18.1884 20.4229L11.5526 16.731L4.91676 20.4229L6.37735 12.971L0.815609 7.80085L8.3541 6.8872L11.5526 0Z"/>
                </svg>
              )
            })
          )
        : ''
      }
    </div>
  )
}