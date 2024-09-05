import { useEffect } from 'react';
import Layout from '@/components/Layout'
import 'normalize.css';
import '@/styles/reset.css';
import '@/styles/globals.scss';
import '@/styles/chart.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import user from '@/store/user';
import tasks from '@/store/tasks';
import statistic from '@/store/statistic';
import { getLocalStorageTasks } from '@/store/localStore/tasks';
import { getLocalStoragePreferences } from '@/store/localStore/timePreferences';
import { getLocalStorageStatistic, setDefaultStatsLocalStorage } from '@/store/localStore/statistic';



export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const localTasks = getLocalStorageTasks();
    const status = localTasks.length ? 'BETWEEN_TASKS' : 'WITHOUT_TASK';
    user.changeStatus(status);
    tasks.setTasks(localTasks);
    const prefs = getLocalStoragePreferences();
    user.changeTimeParams(prefs);
    const localStatistic = getLocalStorageStatistic();
    statistic.setWeeksDataObject(localStatistic);
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
