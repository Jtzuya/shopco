import texture from '../../assets/grainy-texture.svg'

interface Nav {
  name: string;
}

export default function Nav(props: Nav) {
  const { name } = props
  return (
    <nav className='nav'>
      <div className="nav__wrapper">
        <img src={texture} alt="" className="nav__wrapper-texture" />

        <div className="nav__content">
          <h1 className="nav__title">{name}</h1>
          {/* <div className="nav__options">
            <form className="nav__form">
              <div className="nav__form-field">
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.2755 18.4974C14.756 18.4974 18.3881 14.8652 18.3881 10.3847C18.3881 5.90424 14.756 2.27208 10.2755 2.27208C5.795 2.27208 2.16284 5.90424 2.16284 10.3847C2.16284 14.8652 5.795 18.4974 10.2755 18.4974Z" stroke="white" strokeWidth="1.53713" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.2421 19.3513L17.5342 17.6434" stroke="white" strokeWidth="1.53713" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <label>
                  <input type="search" name="search" id="search" placeholder='Search for anything' />
                </label>
              </div>
            </form>

            <span className="nav__notification">
              <span className="nav__notification-status">&nbsp;</span>
              <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.293 3.14467C9.90106 3.14467 7.14447 5.90126 7.14447 9.2932V12.2547C7.14447 12.8798 6.87803 13.8329 6.56036 14.3657L5.38189 16.323C4.65431 17.5322 5.15644 18.8747 6.48862 19.3256C10.9053 20.8012 15.6704 20.8012 20.0871 19.3256C21.3271 18.9157 21.8702 17.4503 21.1939 16.323L20.0154 14.3657C19.708 13.8329 19.4415 12.8798 19.4415 12.2547V9.2932C19.4415 5.91151 16.6747 3.14467 13.293 3.14467Z" stroke="currentColor" strokeWidth="1.53713" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M15.1886 3.44184C14.8709 3.34961 14.543 3.27788 14.2048 3.23689C13.221 3.11392 12.2783 3.18565 11.397 3.44184C11.6942 2.68352 12.432 2.15065 13.2928 2.15065C14.1536 2.15065 14.8914 2.68352 15.1886 3.44184Z" stroke="currentColor" strokeWidth="1.53713" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.3673 19.6945C16.3673 21.3853 14.9839 22.7687 13.293 22.7687C12.4527 22.7687 11.6739 22.4203 11.1205 21.8669C10.5672 21.3136 10.2188 20.5348 10.2188 19.6945" stroke="currentColor" strokeWidth="1.53713" strokeMiterlimit="10"/>
              </svg>
            </span>
          </div> */}
        </div>
      </div>
    </nav>
  )
}