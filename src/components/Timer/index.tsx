import { observer } from 'mobx-react-lite';
import styles from './style.module.scss';
import { createLongClassName } from '@/utils/createLongClassName';
import GreenBtn from '../GreenBtn';
import RedBtn from '../RedBtn';


interface IProps {
  additionalClassName?: string;
}


const Timer = observer(({additionalClassName}: IProps) => {
  const names = additionalClassName ? [styles.wrap, additionalClassName] : [styles.wrap];
  return ( 
    <div className={createLongClassName(names)}>
      <div className={styles.header}>
      <div className={styles.name}>
        Сверстать сайт
      </div>
      <div className={styles.number}>
        Помидор 1
      </div>
      </div>
      <div className={styles.body}>
        <div className={styles.time}>
          24:00
          <button className={styles.addTime}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
              <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
            </svg>
          </button>
        </div>
        <div className={styles.btns}>
          <GreenBtn classNames={[styles.first]}>Start</GreenBtn>
          <RedBtn classNames={[styles.seconds]}>Pause</RedBtn>
        </div>
      </div>
    </div>
   );
})
 
export default Timer;