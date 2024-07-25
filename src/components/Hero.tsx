import imgDesktop from '../assets/hero-img.png'

export default function Hero() {
  return(
    <section className="hero">
      <div className="hero__wrapper">
        <div className="hero__content">
          <h1 className="hero__heading">Find Clothes that matches your style</h1>
          <p className="hero__sub">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          <a href="/brands" className='hero__cta'>Shop Now</a>
          
          <div className="hero__stats">
            <div className="hero__stats__col">
              <h6>200+</h6>
              <p>International Brands</p>
            </div>
            <div className="hero__stats__separator">&nbsp;</div>
            <div className="hero__stats__col">
              <h6>2,000+</h6>
              <p>High Quality Products</p>
            </div>
            <div className="hero__stats__separator">&nbsp;</div>
            <div className="hero__stats__col">
              <h6>30,000+</h6>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="hero__gallery">
          <img src={imgDesktop} alt="" className="hero__img"/>
          <svg className='hero__icon' width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M52 0C53.7654 27.955 76.0448 50.2347 104 52C76.0448 53.7654 53.7654 76.0448 52 104C50.2347 76.0448 27.955 53.7654 0 52C27.955 50.2347 50.2347 27.955 52 0Z" fill="black"/>
          </svg>
          <svg className='hero__icon hero__icon--sm' width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 0C28.9506 15.0527 40.9472 27.0495 56 28C40.9472 28.9506 28.9506 40.9472 28 56C27.0495 40.9472 15.0527 28.9506 0 28C15.0527 27.0495 27.0495 15.0527 28 0Z" fill="black"/>
          </svg>
        </div>
      </div>
    </section>
  )
}