import Layout from '@/components/Layout'
import 'normalize.css';
import '@/styles/reset.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import user from '@/store/user';
import { useEffect } from 'react';



export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    user.setInitialStatus();
  }, []);
  return (
    <>
      <Head>
        <title>pomodoro_box</title>
        <link rel="icon" href="/img/tomato_icon.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
