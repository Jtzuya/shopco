import { useState } from "react";
// import Collection from "../components/Collection"
import Footer from "../components/Footer"
// import Hero from "../components/Hero"
// import Marquee from "../components/Marquee"
// import Masonry from "../components/Masonry"
import Nav from "../components/Nav"
// import Review from "../components/Review"

// import casual from '../store/casual'
import { useParams } from "react-router-dom";
import butter from "../libs/helper/butter";
import Error404 from "../components/Error404";
import Breadcrumb from "../components/Breadcrumb";
import Stars from "../components/Stars";
import Price from "../components/admin/Price";
// import formal from '../store/formal'

import Endpoints from "../libs/helper/endpoints";
import Notification from "../components/Notification";
import ProductImages from "../components/ProductImages";
import VariantPill from "../components/VariantPill";
import VariantCircle from "../components/VariantCircle";
import QuantitySelector from "../components/QuantitySelector";
import Loader from "../components/Loader";
// import Review from "../components/Review";

// type Reviews = {
//   name: string;
//   message: string;
//   date: string;
//   verified: boolean;
//   rating_count: number;
// }

type Product = {
  id: number;
  product_id: string;
  name: string;
  description: string;
  summary: string;
  stock: number;
  current_price: number;
  old_price: number;
}

const server = new Endpoints()

type RenderProduct = {
  product : Product,
  images  : string[] | [],
  colors  : string[] | [],
  sizes   : string[] | []
}

type ProductSelected = {
  name        ?: string;
  color       ?: string;
  size        ?: string;
  quantity     : number;
}

const randomCount      = Math.floor(Math.random() * (5 - 3) + 1) + 3
const reviewsCardLength = [1,1,1,1,1,1]
const reviewSample      = {
  rating: [1, 1, 1, 1, 0],
  author: 'John Doe',
  verified: true,
  date: 'August 19, 2023',
  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias explicabo dolorum natus. Vitae, nostrum temporibus.'
}

export default function Product() {
  const params = useParams()
  const param = params.name ? params.name : null
  const [product, setProduct] = useState<RenderProduct>(tempProductRender()) // default shows skeleton loader
  const [errorMessage, setErrorMessage] = useState('')
  const [tab, setTab] = useState('0')
  const [onMountFetch, setOnMountFetch] = useState(true)
  const [loader, setLoader] = useState(true)

  const [notification, setNotification] = useState<boolean>(false)
  const [notifMessage, setNotifMessage] = useState<string>('Something went wrong')
  const [toCart, setToCart] = useState<boolean>(false)

  const [productSelected, setProductSelected] = useState<ProductSelected>({quantity: 1})

  const [isError, setIsError] = useState(2) // 0 = show collections link; 1 = show collections link error 

  async function onMountFetchHandler() {
    setOnMountFetch(false)

    try {
      if (!param) throw new Error('Browse our Collection')

      const productRequest = await butter(server.getProductByName(param), 'GET')
      const { data, message } = await productRequest.json()
      if(!productRequest.ok) throw new Error(message)

      setProduct(data)
      setProductSelected({name: data.product.name, size: data.sizes[0], color: data.colors[0], quantity: 1})
      setLoader(false)
    } catch (error) {
      setLoader(false)
      setNotification(true)
      setErrorMessage("No product found.")
      setIsError(0)

      const timer = setTimeout(() => {
        setNotification(false)
        setNotifMessage('')
        clearTimeout(timer)
      }, 3000)
    }
  }

  if (onMountFetch) (async() => await onMountFetchHandler())()

  function detailsTab() { setTab('0') }
  function reviewsTab() { setTab('1') }
  function faqsTab()    { setTab('2') }

  function quantityHandler(type: string, quantity: number) {
    const temp = productSelected.quantity;

    switch(type) {
      case 'increment': {
        if (temp + 1 > product.product.stock) {
          setNotification(true)
          setNotifMessage(`there are only ${product.product.stock} stock${product.product.stock > 1 ? 's' : ''} left for this product.`)
    
          const timer = setTimeout(() => {
            setNotification(false)
            setNotifMessage('')
            clearTimeout(timer)
          }, 3000)
    
          return setProductSelected(prev => ({...prev, quantity: product.product.stock}))
        }

        return setProductSelected(prev => ({...prev, quantity: temp + 1}))
      }
      case 'decrement' : {
        if (temp - 1 < 0) return setProductSelected(prev => ({...prev, quantity: 0}))
        return setProductSelected(prev => ({...prev, quantity: temp - 1}))
      }
      default : {
        if (quantity > product.product.stock) {
          setNotification(true)
          setNotifMessage(`there are only ${product.product.stock} stock${product.product.stock > 1 ? 's' : ''} left for this product.`)
    
          const timer = setTimeout(() => {
            setNotification(false)
            setNotifMessage('')
            clearTimeout(timer)
          }, 3000)
    
          return setProductSelected(prev => ({...prev, quantity: product.product.stock}))
        }

        return setProductSelected(prev => ({...prev, quantity }))
      }
    }
  }

  function colorHandler(selected: string) {
    setProductSelected(prev => ({...prev, color: selected}))
  }

  function sizeHandler(selected: string) {
    setProductSelected(prev => ({...prev, size: selected}))
  }

  async function formHandler() {
    setToCart(true)
    const color       = productSelected.color ? productSelected.color.split(' ').join('_') : 'none'
    const size        = productSelected.size  ? productSelected.size.split(' ').join('_') : 'none'
    const product_id  = product.product.product_id

    const toCart = {
      ...productSelected,
      product_id,
      id: [product.product.product_id, `color=${color}`, `size=${size}`].join('&'), // being used when we try to search this product in cart
      price: product.product.current_price,
      image: product.images[0]
    }

    const inCache = window.localStorage.getItem('cart')
    let cart;

    if (!inCache) {
      cart = new Map()
    } else {
      cart = new Map(JSON.parse(inCache))
    }

    const existingItem = cart.get(toCart.id);
    if (existingItem) {
      // If item exists, increase quantity
      existingItem.quantity += toCart.quantity;
    } else {
      // Add new item to cart
      cart.set(toCart.id, toCart);
    }

    // Save updated cart back to localStorage
    window.localStorage.setItem('cart', JSON.stringify(Array.from(cart.entries())));

    await new Promise<void>(resolve => {
      const timer1 = setTimeout(() => {
        setToCart(false)
        clearTimeout(timer1)
        resolve()
      }, 2500)
    })

    setNotification(true);
    setNotifMessage('added to cart');

    await new Promise<void>((resolve) => {
      const timer2 = setTimeout(() => {
        setNotification(false)
        setNotifMessage('')     
        clearTimeout(timer2);
        resolve();
      }, 3000);
    });

  }

  return (
    <div className="public">
      <Nav />

      { 
        isError === 0 ? 
        <Error404 message={errorMessage} />
        :
        <>
          <Breadcrumb />
          <div className={loader ? 'product product--skeleton' : 'product'}>
            <div className="product__wrapper">
              <div className="product__overview">
                <ProductImages images={product.images} />

                <div className="product__content">
                  <h1 className="product__title">{product.product.name}</h1>
                  <div className="ratings">
                    <div className="ratings-stars">
                      <Stars rating_count={randomCount} />
                    </div>
                    <span className="ratings-count">4.5/5</span>
                  </div>

                  <Price current={product.product.current_price} old={product.product.old_price} />

                  <p className="product__summary">{product.product.summary}</p>

                  {/* Variants */}
                  <div className="product__variants">
                    <VariantCircle callback={colorHandler} items={product.colors} title="Select Color" />
                    <VariantPill callback={sizeHandler} items={product.sizes} title="Select Size" />
                  </div>

                  {/* Form */}
                  <div className="product__group">
                    { product.product.stock ? <QuantitySelector qty={productSelected.quantity} callback={quantityHandler} /> : '' }

                    <button 
                      className={product.product.stock ? 'product__add-to-cart' : 'product__add-to-cart product__add-to-cart--disabled'}
                      onClick={product.product.stock ? !toCart ? formHandler : undefined : undefined}
                    >
                      { 
                        toCart ?
                        <Loader />
                        :
                        <span className="product__add-to-cart-text">{product.product.stock ? 'Add to Cart' : 'Sold Out'}</span>
                      }
                    </button>
                  </div>
                </div>
              </div>

              <div className="product__tab-controls">
                <span onClick={detailsTab} className={`product__tab-control ${tab === '0' ? 'product__tab-control--active' : ''}`}>Product Details</span>
                <span onClick={reviewsTab} className={`product__tab-control ${tab === '1' ? 'product__tab-control--active' : ''}`}>Rating & Review</span>
                <span onClick={faqsTab} className={`product__tab-control ${tab === '2' ? 'product__tab-control--active' : ''}`}>FAQs</span>
              </div>

              <div className="product__tabs">
                <div className={`product__tab ${tab === '0' ? 'product__tab--details' : ''}`}>
                  {product.product.description}
                </div>
                
                <div className={`product__tab ${tab === '1' ? 'product__tab--review' : ''}`}>
                  <div className="product__tab--review-heading">
                    <span className="product__tab--review-title">
                      All Reviews
                      <span className="product__tab--review-count">(451)</span>
                    </span>
                    <div className="product__tab--review-options">
                      <button className="product__tab--review-option">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.125 11.625V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V11.625C10.875 11.3266 10.9935 11.0405 11.2045 10.8295C11.4155 10.6185 11.7016 10.5 12 10.5C12.2984 10.5 12.5845 10.6185 12.7955 10.8295C13.0065 11.0405 13.125 11.3266 13.125 11.625ZM18.75 18C18.4516 18 18.1655 18.1185 17.9545 18.3295C17.7435 18.5405 17.625 18.8266 17.625 19.125V20.25C17.625 20.5484 17.7435 20.8345 17.9545 21.0455C18.1655 21.2565 18.4516 21.375 18.75 21.375C19.0484 21.375 19.3345 21.2565 19.5455 21.0455C19.7565 20.8345 19.875 20.5484 19.875 20.25V19.125C19.875 18.8266 19.7565 18.5405 19.5455 18.3295C19.3345 18.1185 19.0484 18 18.75 18ZM21 14.25H19.875V3.75C19.875 3.45163 19.7565 3.16548 19.5455 2.9545C19.3345 2.74353 19.0484 2.625 18.75 2.625C18.4516 2.625 18.1655 2.74353 17.9545 2.9545C17.7435 3.16548 17.625 3.45163 17.625 3.75V14.25H16.5C16.2016 14.25 15.9155 14.3685 15.7045 14.5795C15.4935 14.7905 15.375 15.0766 15.375 15.375C15.375 15.6734 15.4935 15.9595 15.7045 16.1705C15.9155 16.3815 16.2016 16.5 16.5 16.5H21C21.2984 16.5 21.5845 16.3815 21.7955 16.1705C22.0065 15.9595 22.125 15.6734 22.125 15.375C22.125 15.0766 22.0065 14.7905 21.7955 14.5795C21.5845 14.3685 21.2984 14.25 21 14.25ZM5.25 15C4.95163 15 4.66548 15.1185 4.4545 15.3295C4.24353 15.5405 4.125 15.8266 4.125 16.125V20.25C4.125 20.5484 4.24353 20.8345 4.4545 21.0455C4.66548 21.2565 4.95163 21.375 5.25 21.375C5.54837 21.375 5.83452 21.2565 6.0455 21.0455C6.25647 20.8345 6.375 20.5484 6.375 20.25V16.125C6.375 15.8266 6.25647 15.5405 6.0455 15.3295C5.83452 15.1185 5.54837 15 5.25 15ZM7.5 11.25H6.375V3.75C6.375 3.45163 6.25647 3.16548 6.0455 2.9545C5.83452 2.74353 5.54837 2.625 5.25 2.625C4.95163 2.625 4.66548 2.74353 4.4545 2.9545C4.24353 3.16548 4.125 3.45163 4.125 3.75V11.25H3C2.70163 11.25 2.41548 11.3685 2.2045 11.5795C1.99353 11.7905 1.875 12.0766 1.875 12.375C1.875 12.6734 1.99353 12.9595 2.2045 13.1705C2.41548 13.3815 2.70163 13.5 3 13.5H7.5C7.79837 13.5 8.08452 13.3815 8.2955 13.1705C8.50647 12.9595 8.625 12.6734 8.625 12.375C8.625 12.0766 8.50647 11.7905 8.2955 11.5795C8.08452 11.3685 7.79837 11.25 7.5 11.25ZM14.25 6.75H13.125V3.75C13.125 3.45163 13.0065 3.16548 12.7955 2.9545C12.5845 2.74353 12.2984 2.625 12 2.625C11.7016 2.625 11.4155 2.74353 11.2045 2.9545C10.9935 3.16548 10.875 3.45163 10.875 3.75V6.75H9.75C9.45163 6.75 9.16548 6.86853 8.9545 7.0795C8.74353 7.29048 8.625 7.57663 8.625 7.875C8.625 8.17337 8.74353 8.45952 8.9545 8.6705C9.16548 8.88147 9.45163 9 9.75 9H14.25C14.5484 9 14.8345 8.88147 15.0455 8.6705C15.2565 8.45952 15.375 8.17337 15.375 7.875C15.375 7.57663 15.2565 7.29048 15.0455 7.0795C14.8345 6.86853 14.5484 6.75 14.25 6.75Z" fill="black"/>
                        </svg>
                      </button>
                      <div className="product__tab--review-sort">
                        <select name="sort" id="sort">
                          <option defaultValue="Latest">Latest</option>
                          <option value="Oldest">Oldest</option>
                        </select>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5306 6.53061L8.5306 11.5306C8.46092 11.6005 8.37813 11.656 8.28696 11.6939C8.1958 11.7317 8.09806 11.7512 7.99935 11.7512C7.90064 11.7512 7.8029 11.7317 7.71173 11.6939C7.62057 11.656 7.53778 11.6005 7.4681 11.5306L2.4681 6.53061C2.3272 6.38972 2.24805 6.19862 2.24805 5.99936C2.24805 5.80011 2.3272 5.60901 2.4681 5.46811C2.60899 5.32722 2.80009 5.24806 2.99935 5.24806C3.19861 5.24806 3.3897 5.32722 3.5306 5.46811L7.99997 9.93749L12.4693 5.46749C12.6102 5.32659 12.8013 5.24744 13.0006 5.24744C13.1999 5.24744 13.391 5.32659 13.5318 5.46749C13.6727 5.60838 13.7519 5.79948 13.7519 5.99874C13.7519 6.198 13.6727 6.38909 13.5318 6.52999L13.5306 6.53061Z" fill="black"/>
                        </svg>
                      </div>
                      <button className="product__tab--review-write">Write a Review</button>
                    </div>
                  </div>
                  <div className="review">
                    {
                      reviewsCardLength.map((_, idx)=> {
                        return (
                          <div key={idx} className="review__card">
                            <button className="review__card__options">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.625 12C14.625 12.5192 14.471 13.0267 14.1826 13.4584C13.8942 13.8901 13.4842 14.2265 13.0045 14.4252C12.5249 14.6239 11.9971 14.6758 11.4879 14.5746C10.9787 14.4733 10.511 14.2233 10.1438 13.8562C9.77673 13.489 9.52673 13.0213 9.42544 12.5121C9.32415 12.0029 9.37614 11.4751 9.57482 10.9955C9.7735 10.5158 10.11 10.1058 10.5416 9.81739C10.9733 9.52895 11.4808 9.375 12 9.375C12.6962 9.375 13.3639 9.65156 13.8562 10.1438C14.3484 10.6361 14.625 11.3038 14.625 12ZM4.5 9.375C3.98083 9.375 3.47331 9.52895 3.04163 9.81739C2.60995 10.1058 2.2735 10.5158 2.07482 10.9955C1.87614 11.4751 1.82415 12.0029 1.92544 12.5121C2.02673 13.0213 2.27673 13.489 2.64385 13.8562C3.01096 14.2233 3.47869 14.4733 3.98789 14.5746C4.49709 14.6758 5.02489 14.6239 5.50455 14.4252C5.9842 14.2265 6.39417 13.8901 6.68261 13.4584C6.97105 13.0267 7.125 12.5192 7.125 12C7.125 11.3038 6.84844 10.6361 6.35616 10.1438C5.86387 9.65156 5.19619 9.375 4.5 9.375ZM19.5 9.375C18.9808 9.375 18.4733 9.52895 18.0416 9.81739C17.61 10.1058 17.2735 10.5158 17.0748 10.9955C16.8761 11.4751 16.8242 12.0029 16.9254 12.5121C17.0267 13.0213 17.2767 13.489 17.6438 13.8562C18.011 14.2233 18.4787 14.4733 18.9879 14.5746C19.4971 14.6758 20.0249 14.6239 20.5045 14.4252C20.9842 14.2265 21.3942 13.8901 21.6826 13.4584C21.971 13.0267 22.125 12.5192 22.125 12C22.125 11.6553 22.0571 11.3139 21.9252 10.9955C21.7933 10.677 21.5999 10.3876 21.3562 10.1438C21.1124 9.90009 20.823 9.70673 20.5045 9.57482C20.1861 9.4429 19.8447 9.375 19.5 9.375Z" fill="black" fillOpacity="0.4"/>
                              </svg>
                            </button>

                            <div className="review__card__ratings">
                              {
                                reviewSample.rating.map((rating, rIdx) => {
                                  return (
                                    <svg key={rIdx} width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M11.5526 0L14.751 6.8872L22.2895 7.80085L16.7278 12.971L18.1884 20.4229L11.5526 16.731L4.91676 20.4229L6.37735 12.971L0.815609 7.80085L8.3541 6.8872L11.5526 0Z" fill={rating === 1 ? "#FFC633" : "grey"}/>
                                    </svg>
                                  )
                                })
                              }
                            </div>
                
                            <div className="review__card__author">
                              <p>{reviewSample.author}</p>
                              <span className="review__card__verified">
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2.8291C10.0716 2.8291 8.18657 3.40093 6.58319 4.47227C4.97982 5.54362 3.73013 7.06636 2.99218 8.84794C2.25422 10.6295 2.06114 12.5899 2.43735 14.4812C2.81355 16.3725 3.74215 18.1098 5.10571 19.4734C6.46928 20.837 8.20656 21.7656 10.0979 22.1418C11.9892 22.518 13.9496 22.3249 15.7312 21.5869C17.5127 20.849 19.0355 19.5993 20.1068 17.9959C21.1782 16.3925 21.75 14.5075 21.75 12.5791C21.7473 9.99408 20.7192 7.51571 18.8913 5.68783C17.0634 3.85994 14.585 2.83183 12 2.8291ZM16.2806 10.8597L11.0306 16.1097C10.961 16.1795 10.8783 16.2348 10.7872 16.2725C10.6962 16.3103 10.5986 16.3297 10.5 16.3297C10.4014 16.3297 10.3038 16.3103 10.2128 16.2725C10.1218 16.2348 10.039 16.1795 9.96938 16.1097L7.71938 13.8597C7.57865 13.719 7.49959 13.5281 7.49959 13.3291C7.49959 13.1301 7.57865 12.9392 7.71938 12.7985C7.86011 12.6577 8.05098 12.5787 8.25 12.5787C8.44903 12.5787 8.6399 12.6577 8.78063 12.7985L10.5 14.5188L15.2194 9.79848C15.2891 9.72879 15.3718 9.67352 15.4628 9.63581C15.5539 9.59809 15.6515 9.57868 15.75 9.57868C15.8486 9.57868 15.9461 9.59809 16.0372 9.63581C16.1282 9.67352 16.2109 9.72879 16.2806 9.79848C16.3503 9.86816 16.4056 9.95088 16.4433 10.0419C16.481 10.133 16.5004 10.2306 16.5004 10.3291C16.5004 10.4276 16.481 10.5252 16.4433 10.6163C16.4056 10.7073 16.3503 10.79 16.2806 10.8597Z" fill={reviewSample.verified === true ? '#01AB31' : 'gray'}/>
                                </svg>
                              </span>
                            </div>
                
                            <p className="review__card__message">{reviewSample.message}</p>

                            <p className="review__card__date">Posted on {reviewSample.date}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="product__tab--review-cta">
                    <span className="review__load-more">Load More Reviews</span>
                  </div>
                </div>

                <div className={`product__tab ${tab === '2' ? 'product__tab--faq' : ''}`}>No Information...</div>
              </div>
            </div>
          </div>
        </>
      }

      {notification ? <Notification message={notifMessage}/> : ''}
      <Footer />
    </div>
  )
}

function tempProductRender() {
  return {
    product: {
      id              : 0,
      name            : 'Lorem ipsum dolor sit amet',
      product_id      : '',
      description     : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium pariatur nesciunt, necessitatibus fuga corrupti deleniti.', 
      summary         : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 
      stock           : 10,
      current_price   : 999, 
      old_price       : 99999,
    },
    images: ['', '', ''],
    colors: ['', '', ''],
    sizes: ['', '', '']
  }
}