import { useEffect } from 'react';
import Layout from '@/components/Layout'
import 'normalize.css';
import '@/styles/reset.css';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import user from '@/store/user';
import tasks from '@/store/tasks';
import { setDefaultLocalStorage, getLocalStorageTasks } from '@/store/localStore/tasks';



export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setDefaultLocalStorage();
    const localTasks = getLocalStorageTasks();
    const status = localTasks.length ? 'BETWEEN_TASKS' : 'WITHOUT_TASK';
    user.changeStatus(status);
    tasks.setTasks(localTasks);
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
