import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './style.module.scss';


function Spinner() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [timeOutID, setTimeOutID] = useState<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
      const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
      const handleComplete = (url: string) => {
        clearTimeout(timeOutID);
        const newId = setTimeout(() => {
          setLoading(false);
        }, 500);
        setTimeOutID(newId);
      };

      router.events.on('routeChangeStart', handleStart)
      router.events.on('routeChangeComplete', handleComplete)
      router.events.on('routeChangeError', handleComplete)

      return () => {
          router.events.off('routeChangeStart', handleStart);
          router.events.off('routeChangeComplete', handleComplete);
          router.events.off('routeChangeError', handleComplete);
          clearTimeout(timeOutID);
      }
  })
  
  return (
    <>
    {
      loading && 
      <div className={styles.wrap}>
        <div className={styles.spinner}></div>
      </div>
    }
    </>
  );
}


export default Spinner;