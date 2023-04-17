import styles from './style.module.scss'
import Image from 'next/image';

interface IProps {
  errCode: string;
  errMsg: string;
  children?: React.ReactNode;
}


function ErrorBlock({children, errCode, errMsg} : IProps) {
  return ( 
    <div className={styles.err}>
      <div className={styles.content}>
      <Image src="/img/tomato_logo.png" alt="" width={80} height={80} />
      <div className={styles.name}>
        Ошибка&nbsp;
        <span>{errCode}</span>
      </div>
      <div className={styles.message}>
        {errMsg}
      </div>
      {children}
      </div>
    </div>
   );
}

export default ErrorBlock;