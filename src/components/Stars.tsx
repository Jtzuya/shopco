import { useRef } from "react";
import { createRoot } from 'react-dom/client';

type StarProps = {
  rating_count: number;
}

// TODO: fix component. This is currently a temporary component
export default function Stars(props: StarProps) {
  // const { rating_count } = props
  const rating_el = useRef<HTMLDivElement>(null)
  // const rating_max = 5;

  
  function renderStars() {
    // let i = 0

    // rating = 3
    // i = 1; rating > i = i - rating = -2
    // i = 2; rating > i = i - rating = -1
    // i = 3; rating > i = i - rating = 0
    // i = 4; rating > i = i - rating = 1
    // i = 5; rating > i = i - rating = 2
  
    // rating = 5
    // i = 1; rating > i = i - rating = -4
    // i = 2; rating > i = i - rating = -3
    // i = 3; rating > i = i - rating = -2
    // i = 4; rating > i = i - rating = -1
    // i = 5; rating > i = i - rating = 0
  
    // while (rating_max > i) {
    //   const temp = document.createElement('div')
    //   document.body.appendChild(temp)
  
    //   const root = createRoot(temp)
    //   root.render(
    //     <svg className="rating__star" width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <path
    //         fill={(i + 1) - rating_count > 0 ? "grey" : "#FFC633"}
    //         d="M11.5526 0L14.751 6.8872L22.2895 7.80085L16.7278 12.971L18.1884 20.4229L11.5526 16.731L4.91676 20.4229L6.37735 12.971L0.815609 7.80085L8.3541 6.8872L11.5526 0Z"/>
    //     </svg>
    //   )
  
    //   // Wait for the component to render
    //   setTimeout(() => {
    //     if (rating_el.current) {
    //       while (temp.firstChild) {
    //         rating_el.current.appendChild(temp.firstChild);
    //       }
    //     }
    //     // Clean up the temporary container
    //     document.body.removeChild(temp);
    //   }, 100);
  
    //   i++
    // }

    return (<></>)
  }

  
  return (
    <div ref={rating_el} className="rating__stars">{ renderStars() }</div>
  )
}