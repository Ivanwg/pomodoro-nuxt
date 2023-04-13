import React from "react";
import Header from "../Header";


interface IProps {
  children: React.ReactNode;
}


function Layout({children}: IProps) {
  return ( 
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
   );
}

export default Layout;