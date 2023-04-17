import React from "react";
import Header from "../Header";
import localFont from 'next/font/local';
import Spinner from "../Spinner";


interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const SFont = localFont({ src: [
  {
    path: '../../fonts/SFUIDisplay-Bold.woff2',
    weight: '700',
    style: 'normal',
  },
  {
    path: '../../fonts/SFUIDisplay-Medium.woff2',
    weight: '500',
    style: 'normal',
  },
  {
    path: '../../fonts/SFUIDisplay-Regular.woff2',
    weight: '400',
    style: 'normal',
  },
  {
    path: '../../fonts/SFUIDisplay-Light.woff2',
    weight: '300',
    style: 'normal',
  },
  {
    path: '../../fonts/SFUIDisplay-Thin.woff2',
    weight: '200',
    style: 'normal',
  },
] });


function Layout({children}: IProps) {
  return (
    <div className={SFont.className}>
      <Header />
      <main>
        <div className='container'>
          {children}
        </div>
      </main>
      <Spinner />
    </div>
   );
}

export default Layout;