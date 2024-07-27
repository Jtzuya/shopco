import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

import productImgTest from '../../assets/product-img-1.png'
import Stars from "../../components/Stars";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Brands() {
  const [filterMobState, setFilterMobState] = useState(false) 
  
  function filterStateHandler() {
    setFilterMobState(!filterMobState)
  }

  return (
    <>
      <Nav />
      <Breadcrumb />

      <div className="collections">
        <div className="collections__wrapper">

          <div onClick={filterStateHandler} className={`collections__sidebar-backdrop ${filterMobState === false ? '' : 'collections__sidebar-backdrop--mob-active'}`}></div>
          <div className={`collections__sidebar ${filterMobState === false ? '' : 'collections__sidebar--mob-active'}`}>

            <div className="collections__sidebar-item">
              <div className="collections__sidebar-header">
                <p className="collections__sidebar-title">Filters</p>
                <button className="collections__sidebar-icon collections__sidebar-icon--desktop">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.125 12.125V20.75C13.125 21.0484 13.0065 21.3345 12.7955 21.5455C12.5845 21.7565 12.2984 21.875 12 21.875C11.7016 21.875 11.4155 21.7565 11.2045 21.5455C10.9935 21.3345 10.875 21.0484 10.875 20.75V12.125C10.875 11.8266 10.9935 11.5405 11.2045 11.3295C11.4155 11.1185 11.7016 11 12 11C12.2984 11 12.5845 11.1185 12.7955 11.3295C13.0065 11.5405 13.125 11.8266 13.125 12.125ZM18.75 18.5C18.4516 18.5 18.1655 18.6185 17.9545 18.8295C17.7435 19.0405 17.625 19.3266 17.625 19.625V20.75C17.625 21.0484 17.7435 21.3345 17.9545 21.5455C18.1655 21.7565 18.4516 21.875 18.75 21.875C19.0484 21.875 19.3345 21.7565 19.5455 21.5455C19.7565 21.3345 19.875 21.0484 19.875 20.75V19.625C19.875 19.3266 19.7565 19.0405 19.5455 18.8295C19.3345 18.6185 19.0484 18.5 18.75 18.5ZM21 14.75H19.875V4.25C19.875 3.95163 19.7565 3.66548 19.5455 3.4545C19.3345 3.24353 19.0484 3.125 18.75 3.125C18.4516 3.125 18.1655 3.24353 17.9545 3.4545C17.7435 3.66548 17.625 3.95163 17.625 4.25V14.75H16.5C16.2016 14.75 15.9155 14.8685 15.7045 15.0795C15.4935 15.2905 15.375 15.5766 15.375 15.875C15.375 16.1734 15.4935 16.4595 15.7045 16.6705C15.9155 16.8815 16.2016 17 16.5 17H21C21.2984 17 21.5845 16.8815 21.7955 16.6705C22.0065 16.4595 22.125 16.1734 22.125 15.875C22.125 15.5766 22.0065 15.2905 21.7955 15.0795C21.5845 14.8685 21.2984 14.75 21 14.75ZM5.25 15.5C4.95163 15.5 4.66548 15.6185 4.4545 15.8295C4.24353 16.0405 4.125 16.3266 4.125 16.625V20.75C4.125 21.0484 4.24353 21.3345 4.4545 21.5455C4.66548 21.7565 4.95163 21.875 5.25 21.875C5.54837 21.875 5.83452 21.7565 6.0455 21.5455C6.25647 21.3345 6.375 21.0484 6.375 20.75V16.625C6.375 16.3266 6.25647 16.0405 6.0455 15.8295C5.83452 15.6185 5.54837 15.5 5.25 15.5ZM7.5 11.75H6.375V4.25C6.375 3.95163 6.25647 3.66548 6.0455 3.4545C5.83452 3.24353 5.54837 3.125 5.25 3.125C4.95163 3.125 4.66548 3.24353 4.4545 3.4545C4.24353 3.66548 4.125 3.95163 4.125 4.25V11.75H3C2.70163 11.75 2.41548 11.8685 2.2045 12.0795C1.99353 12.2905 1.875 12.5766 1.875 12.875C1.875 13.1734 1.99353 13.4595 2.2045 13.6705C2.41548 13.8815 2.70163 14 3 14H7.5C7.79837 14 8.08452 13.8815 8.2955 13.6705C8.50647 13.4595 8.625 13.1734 8.625 12.875C8.625 12.5766 8.50647 12.2905 8.2955 12.0795C8.08452 11.8685 7.79837 11.75 7.5 11.75ZM14.25 7.25H13.125V4.25C13.125 3.95163 13.0065 3.66548 12.7955 3.4545C12.5845 3.24353 12.2984 3.125 12 3.125C11.7016 3.125 11.4155 3.24353 11.2045 3.4545C10.9935 3.66548 10.875 3.95163 10.875 4.25V7.25H9.75C9.45163 7.25 9.16548 7.36853 8.9545 7.5795C8.74353 7.79048 8.625 8.07663 8.625 8.375C8.625 8.67337 8.74353 8.95952 8.9545 9.1705C9.16548 9.38147 9.45163 9.5 9.75 9.5H14.25C14.5484 9.5 14.8345 9.38147 15.0455 9.1705C15.2565 8.95952 15.375 8.67337 15.375 8.375C15.375 8.07663 15.2565 7.79048 15.0455 7.5795C14.8345 7.36853 14.5484 7.25 14.25 7.25Z" fill="black" fillOpacity="0.4"/>
                  </svg>
                </button>
                <button onClick={filterStateHandler} className="collections__sidebar-icon collections__sidebar-icon--mob">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5459 18.4541C19.7572 18.6654 19.876 18.952 19.876 19.2509C19.876 19.5498 19.7572 19.8365 19.5459 20.0478C19.3346 20.2592 19.0479 20.3779 18.749 20.3779C18.4501 20.3779 18.1635 20.2592 17.9521 20.0478L12 14.0937L6.0459 20.0459C5.83455 20.2573 5.54791 20.376 5.24902 20.376C4.95014 20.376 4.66349 20.2573 4.45215 20.0459C4.2408 19.8346 4.12207 19.5479 4.12207 19.2491C4.12207 18.9502 4.2408 18.6635 4.45215 18.4522L10.4062 12.5L4.45402 6.54593C4.24268 6.33459 4.12395 6.04795 4.12395 5.74906C4.12395 5.45017 4.24268 5.16353 4.45402 4.95218C4.66537 4.74084 4.95201 4.62211 5.2509 4.62211C5.54978 4.62211 5.83643 4.74084 6.04777 4.95218L12 10.9062L17.954 4.95125C18.1654 4.7399 18.452 4.62117 18.7509 4.62117C19.0498 4.62117 19.3364 4.7399 19.5478 4.95125C19.7591 5.16259 19.8778 5.44924 19.8778 5.74812C19.8778 6.04701 19.7591 6.33365 19.5478 6.545L13.5937 12.5L19.5459 18.4541Z" fill="black" fillOpacity="0.4"/>
                  </svg>
                </button>
              </div>

            </div>

            <div className="collections__sidebar-item">
              <ul className="collections__sidebar-links">
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">T-shirts</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">Shorts</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">Shirts</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">Hoodie</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">Jeans</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="collections__sidebar-item">
              <div className="collections__sidebar-header">
                <p className="collections__sidebar-title">Price</p>
                <span className="collections__sidebar-icon">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.4694 9.96945L7.4694 4.96945C7.53908 4.89953 7.62187 4.84405 7.71304 4.8062C7.8042 4.76834 7.90194 4.74886 8.00065 4.74886C8.09936 4.74886 8.1971 4.76834 8.28827 4.8062C8.37943 4.84405 8.46222 4.89953 8.5319 4.96945L13.5319 9.96945C13.6728 10.1103 13.752 10.3014 13.752 10.5007C13.752 10.7 13.6728 10.8911 13.5319 11.0319C13.391 11.1728 13.1999 11.252 13.0007 11.252C12.8014 11.252 12.6103 11.1728 12.4694 11.0319L8.00003 6.56257L3.53065 11.0326C3.38976 11.1735 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1735 2.46815 11.0326C2.32726 10.8917 2.2481 10.7006 2.2481 10.5013C2.2481 10.3021 2.32726 10.111 2.46815 9.97007L2.4694 9.96945Z" fill="black"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="collections__sidebar-item">
              <div className="collections__sidebar-header">
                <p className="collections__sidebar-title">Colors</p>
                <span className="collections__sidebar-icon">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.4694 9.96945L7.4694 4.96945C7.53908 4.89953 7.62187 4.84405 7.71304 4.8062C7.8042 4.76834 7.90194 4.74886 8.00065 4.74886C8.09936 4.74886 8.1971 4.76834 8.28827 4.8062C8.37943 4.84405 8.46222 4.89953 8.5319 4.96945L13.5319 9.96945C13.6728 10.1103 13.752 10.3014 13.752 10.5007C13.752 10.7 13.6728 10.8911 13.5319 11.0319C13.391 11.1728 13.1999 11.252 13.0007 11.252C12.8014 11.252 12.6103 11.1728 12.4694 11.0319L8.00003 6.56257L3.53065 11.0326C3.38976 11.1735 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1735 2.46815 11.0326C2.32726 10.8917 2.2481 10.7006 2.2481 10.5013C2.2481 10.3021 2.32726 10.111 2.46815 9.97007L2.4694 9.96945Z" fill="black"/>
                  </svg>
                </span>
              </div>

              {/* TODO: should be dynamic based on the colors available around the rendered data */}
              <div className="collections__sidebar-colors">
                <span className="collections__sidebar-color" style={{'--bg-clr': '#00C12B'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#F50606'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#F5DD06'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#F57906'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#06CAF5'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#063AF5'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#7D06F5'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#F506A4'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#FFFFFF'} as React.CSSProperties}>&nbsp;</span>
                <span className="collections__sidebar-color" style={{'--bg-clr': '#000'} as React.CSSProperties}>&nbsp;</span>
              </div>
            </div>

            <div className="collections__sidebar-item">
              <div className="collections__sidebar-header">
                <p className="collections__sidebar-title">Size</p>
                <span className="collections__sidebar-icon">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.4694 9.96945L7.4694 4.96945C7.53908 4.89953 7.62187 4.84405 7.71304 4.8062C7.8042 4.76834 7.90194 4.74886 8.00065 4.74886C8.09936 4.74886 8.1971 4.76834 8.28827 4.8062C8.37943 4.84405 8.46222 4.89953 8.5319 4.96945L13.5319 9.96945C13.6728 10.1103 13.752 10.3014 13.752 10.5007C13.752 10.7 13.6728 10.8911 13.5319 11.0319C13.391 11.1728 13.1999 11.252 13.0007 11.252C12.8014 11.252 12.6103 11.1728 12.4694 11.0319L8.00003 6.56257L3.53065 11.0326C3.38976 11.1735 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1735 2.46815 11.0326C2.32726 10.8917 2.2481 10.7006 2.2481 10.5013C2.2481 10.3021 2.32726 10.111 2.46815 9.97007L2.4694 9.96945Z" fill="black"/>
                  </svg>
                </span>
              </div>

              <div className="collections__sidebar-sizes">
                <span className="collections__sidebar-size">XX-Small</span>
                <span className="collections__sidebar-size">X-Small</span>
                <span className="collections__sidebar-size">Small</span>
                <span className="collections__sidebar-size collections__sidebar-size--active">Medium</span>
                <span className="collections__sidebar-size">Large</span>
                <span className="collections__sidebar-size">XX-Large</span>
                <span className="collections__sidebar-size">3X-Large</span>
                <span className="collections__sidebar-size">4X-Large</span>
              </div>
            </div>

            <div className="collections__sidebar-item">
              <div className="collections__sidebar-header">
                <p className="collections__sidebar-title">Dress Style</p>
                <span className="collections__sidebar-icon">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.4694 9.96945L7.4694 4.96945C7.53908 4.89953 7.62187 4.84405 7.71304 4.8062C7.8042 4.76834 7.90194 4.74886 8.00065 4.74886C8.09936 4.74886 8.1971 4.76834 8.28827 4.8062C8.37943 4.84405 8.46222 4.89953 8.5319 4.96945L13.5319 9.96945C13.6728 10.1103 13.752 10.3014 13.752 10.5007C13.752 10.7 13.6728 10.8911 13.5319 11.0319C13.391 11.1728 13.1999 11.252 13.0007 11.252C12.8014 11.252 12.6103 11.1728 12.4694 11.0319L8.00003 6.56257L3.53065 11.0326C3.38976 11.1735 3.19866 11.2526 2.9994 11.2526C2.80015 11.2526 2.60905 11.1735 2.46815 11.0326C2.32726 10.8917 2.2481 10.7006 2.2481 10.5013C2.2481 10.3021 2.32726 10.111 2.46815 9.97007L2.4694 9.96945Z" fill="black"/>
                  </svg>
                </span>
              </div>

              <ul className="collections__sidebar-style">
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">T-shirts</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">Shorts</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">Shirts</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">Hoodie</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
                <li className="collections__sidebar-link">
                  <span className="collections__sidebar-link-text">Jeans</span>
                  <span className="collections__sidebar-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.53073 2.4694L11.5307 7.4694C11.6007 7.53908 11.6561 7.62187 11.694 7.71304C11.7318 7.8042 11.7513 7.90194 11.7513 8.00065C11.7513 8.09936 11.7318 8.1971 11.694 8.28827C11.6561 8.37943 11.6007 8.46222 11.5307 8.5319L6.53073 13.5319C6.38984 13.6728 6.19874 13.752 5.99948 13.752C5.80023 13.752 5.60913 13.6728 5.46823 13.5319C5.32734 13.391 5.24818 13.1999 5.24818 13.0007C5.24818 12.8014 5.32734 12.6103 5.46823 12.4694L9.93761 8.00003L5.46761 3.53065C5.32671 3.38976 5.24756 3.19866 5.24756 2.9994C5.24756 2.80015 5.32671 2.60905 5.46761 2.46815C5.60851 2.32726 5.7996 2.2481 5.99886 2.2481C6.19812 2.2481 6.38921 2.32726 6.53011 2.46815L6.53073 2.4694Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                  </span>
                </li>
              </ul>
            </div>

            <div className="collections__sidebar-item">
              <button className="collections__sidebar-apply">Apply Filter</button>
            </div>
          </div>

          <div className="collections__main">
            <div className="collections__header">
              <h1 className="collections__heading">Casual</h1>
              <p className="collections__sort">
                <span>Showing 1-10 of 100 Products</span>
                <span>
                  Sort by:
                  <select name="" id="">
                    <option value="Most popular" selected disabled hidden>Most popular</option>
                    <option  value="Most popular">Most popular</option>  
                    <option  value="Lowest Price">Lowest Price</option>  
                    <option  value="Highest Price">Highest Price</option>  
                  </select>  
                </span>
              </p>
              <button onClick={filterStateHandler} className="collections__sidebar-icon collections__sidebar-icon--mob">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.125 12.125V20.75C13.125 21.0484 13.0065 21.3345 12.7955 21.5455C12.5845 21.7565 12.2984 21.875 12 21.875C11.7016 21.875 11.4155 21.7565 11.2045 21.5455C10.9935 21.3345 10.875 21.0484 10.875 20.75V12.125C10.875 11.8266 10.9935 11.5405 11.2045 11.3295C11.4155 11.1185 11.7016 11 12 11C12.2984 11 12.5845 11.1185 12.7955 11.3295C13.0065 11.5405 13.125 11.8266 13.125 12.125ZM18.75 18.5C18.4516 18.5 18.1655 18.6185 17.9545 18.8295C17.7435 19.0405 17.625 19.3266 17.625 19.625V20.75C17.625 21.0484 17.7435 21.3345 17.9545 21.5455C18.1655 21.7565 18.4516 21.875 18.75 21.875C19.0484 21.875 19.3345 21.7565 19.5455 21.5455C19.7565 21.3345 19.875 21.0484 19.875 20.75V19.625C19.875 19.3266 19.7565 19.0405 19.5455 18.8295C19.3345 18.6185 19.0484 18.5 18.75 18.5ZM21 14.75H19.875V4.25C19.875 3.95163 19.7565 3.66548 19.5455 3.4545C19.3345 3.24353 19.0484 3.125 18.75 3.125C18.4516 3.125 18.1655 3.24353 17.9545 3.4545C17.7435 3.66548 17.625 3.95163 17.625 4.25V14.75H16.5C16.2016 14.75 15.9155 14.8685 15.7045 15.0795C15.4935 15.2905 15.375 15.5766 15.375 15.875C15.375 16.1734 15.4935 16.4595 15.7045 16.6705C15.9155 16.8815 16.2016 17 16.5 17H21C21.2984 17 21.5845 16.8815 21.7955 16.6705C22.0065 16.4595 22.125 16.1734 22.125 15.875C22.125 15.5766 22.0065 15.2905 21.7955 15.0795C21.5845 14.8685 21.2984 14.75 21 14.75ZM5.25 15.5C4.95163 15.5 4.66548 15.6185 4.4545 15.8295C4.24353 16.0405 4.125 16.3266 4.125 16.625V20.75C4.125 21.0484 4.24353 21.3345 4.4545 21.5455C4.66548 21.7565 4.95163 21.875 5.25 21.875C5.54837 21.875 5.83452 21.7565 6.0455 21.5455C6.25647 21.3345 6.375 21.0484 6.375 20.75V16.625C6.375 16.3266 6.25647 16.0405 6.0455 15.8295C5.83452 15.6185 5.54837 15.5 5.25 15.5ZM7.5 11.75H6.375V4.25C6.375 3.95163 6.25647 3.66548 6.0455 3.4545C5.83452 3.24353 5.54837 3.125 5.25 3.125C4.95163 3.125 4.66548 3.24353 4.4545 3.4545C4.24353 3.66548 4.125 3.95163 4.125 4.25V11.75H3C2.70163 11.75 2.41548 11.8685 2.2045 12.0795C1.99353 12.2905 1.875 12.5766 1.875 12.875C1.875 13.1734 1.99353 13.4595 2.2045 13.6705C2.41548 13.8815 2.70163 14 3 14H7.5C7.79837 14 8.08452 13.8815 8.2955 13.6705C8.50647 13.4595 8.625 13.1734 8.625 12.875C8.625 12.5766 8.50647 12.2905 8.2955 12.0795C8.08452 11.8685 7.79837 11.75 7.5 11.75ZM14.25 7.25H13.125V4.25C13.125 3.95163 13.0065 3.66548 12.7955 3.4545C12.5845 3.24353 12.2984 3.125 12 3.125C11.7016 3.125 11.4155 3.24353 11.2045 3.4545C10.9935 3.66548 10.875 3.95163 10.875 4.25V7.25H9.75C9.45163 7.25 9.16548 7.36853 8.9545 7.5795C8.74353 7.79048 8.625 8.07663 8.625 8.375C8.625 8.67337 8.74353 8.95952 8.9545 9.1705C9.16548 9.38147 9.45163 9.5 9.75 9.5H14.25C14.5484 9.5 14.8345 9.38147 15.0455 9.1705C15.2565 8.95952 15.375 8.67337 15.375 8.375C15.375 8.07663 15.2565 7.79048 15.0455 7.5795C14.8345 7.36853 14.5484 7.25 14.25 7.25Z" fill="black" fillOpacity="0.4"/>
                </svg>
              </button>
            </div>

            <div className="collections__products">
              <div className="collections__product">
                <img src={productImgTest} alt="" className='collections__product-img'/>
                <Link to="/product/ta so" className="collections__product-title">test</Link>
                <div className="collections__ratings">
                  {/* <div className="collections__ratings-stars">

                  </div> */}
                  <Stars rating_count={4} />
                  <span className="collections__ratings-count">4.5/5</span>
                </div>
                <p className="collections__price">$2,000</p>
              </div>    
            </div>


            <div className="pagination">
              <span className="pagination__btn pagination__btn--prev">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8332 9.99996H4.1665M4.1665 9.99996L9.99984 15.8333M4.1665 9.99996L9.99984 4.16663" stroke="black" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous
              </span>

              <div className="pagination__pages">
                <span className="pagination__page pagination__page--active">1</span>
                <span className="pagination__page pagination__page--ellipsis">...</span>
                <span className="pagination__page">3</span>
              </div>

              <span className="pagination__btn pagination__btn--next">
                Next
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.1665 9.99996H15.8332M15.8332 9.99996L9.99984 4.16663M15.8332 9.99996L9.99984 15.8333" stroke="black" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}