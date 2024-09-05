import { createLongClassName } from '@/utils/createLongClassName';
import styles from './style.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import SettingsBlock from '../SettingsBlock';

function Header() {
  return ( 
    <header className={styles.header}>
      <div className={createLongClassName(['container', styles.container])}>
        <div className={styles.content}>
          <Link href={'/'} className={styles.logo}>
            <Image src="/img/tomato_logo.png" alt="" width={40} height={40} />
            <span>pomodoro_box</span>
          </Link>
          <div className={styles.rightBtns}>
            <SettingsBlock />
            <Link href={'/statistic'} className={styles.statistic}>
              <svg  version="1.1"
                baseProfile="full"
                width="16" height="16"
                xmlns="http://www.w3.org/2000/svg">
                <rect y="50%" width="4" height="50%" fill="#DC3E22"/>
                <rect x="6" width="4" height="100%" fill="#DC3E22"/>
                <rect x="12" y="5" width="4" height="11" fill="#DC3E22"/>
              </svg>  
              <span>Статистика</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
   );
}

export default Header;