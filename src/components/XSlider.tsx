import { useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export default function XSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { width, height } = getWindowDimensions()
  // debugger
  
  const slides = [
    'https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Slide+1',
    'https://via.placeholder.com/300x200/00FF00/FFFFFF?text=Slide+2',
    'https://via.placeholder.com/300x200/0000FF/FFFFFF?text=Slide+3',
    'https://via.placeholder.com/300x200/FFFF00/FFFFFF?text=Slide+4',
    'https://via.placeholder.com/300x200/FF00FF/FFFFFF?text=Slide+5',
    'https://via.placeholder.com/300x200/00FFFF/FFFFFF?text=Slide+6',
  ];

  
  const totalSlides = slides.length;
  const slidesPerView = 3;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? totalSlides - slidesPerView : currentIndex - slidesPerView;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex >= totalSlides - slidesPerView;
    const newIndex = isLastSlide ? 0 : currentIndex + slidesPerView;
    setCurrentIndex(newIndex);
  };

  const getSlidesToShow = () => {
    const slidesToShow = [];
    for (let i = -1; i <= slidesPerView; i++) {
      const index = (currentIndex + i + totalSlides) % totalSlides;
      slidesToShow.push(slides[index]);
    }
    return slidesToShow;
  };
 
  return (
    <>
     <div className="slider">
      <button className="left-arrow" onClick={goToPrevious}>
        ❰
      </button>

      <div className="slide-container">
        {getSlidesToShow().map((slide, index) => (
          <div
            className={`slide ${index === 0 ? 'offset-left' : ''} ${
              index === slidesPerView + 1 ? 'offset-right' : ''
            }`}
            key={index}
          >
            <img src={slide} alt={`slide-${index}`} />
          </div>
        ))}
      </div>

      <button className="right-arrow" onClick={goToNext}>
        ❱
      </button>
    </div>
    </>
  )
}