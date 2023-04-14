function Header() {
  return ( 
    <header className="header">
      <div className="container">
        <div className="content">
          <div className="logo"></div>
          <div className="statistic">
          <svg className="scheme-icon" version="1.1"
            baseProfile="full"
            width="16" height="16"
            xmlns="http://www.w3.org/2000/svg">
            <rect className="scheme-icon__rect scheme-icon__rect_first" y="50%" width="4" height="50%" fill="#DC3E22"/>
            <rect className="scheme-icon__rect scheme-icon__rect_second" x="6" width="4" height="100%" fill="#DC3E22"/>
            <rect className="scheme-icon__rect scheme-icon__rect_fthird" x="12" y="5" width="4" height="11" fill="#DC3E22"/>
          </svg>  
          </div>
        </div>
      </div>
    </header>
   );
}

export default Header;