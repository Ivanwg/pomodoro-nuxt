import Layout from '@/components/Layout'
import 'normalize.css';
import '@/styles/reset.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';



export default function App({ Component, pageProps }: AppProps) {
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
