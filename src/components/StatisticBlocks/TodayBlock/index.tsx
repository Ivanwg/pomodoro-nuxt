import Image from 'next/image';
import styles from './style.module.scss';
import { createLongClassName } from '@/utils/createLongClassName';

interface IProps {
  additionalClassName?: string;
}


const TodayBlock = ({additionalClassName} :IProps) => {
  const names = additionalClassName ? [additionalClassName, styles.todays] : [styles.todays];

  return ( 
    <div className={createLongClassName(names)}>
      <div className={styles.day}>
        <h3 className={createLongClassName(['title', styles.title])}>Понедельник</h3>
        <div className={styles.todayProgress}>
          Вы работали над задачами в течение <span>51 минуты</span>
        </div>
      </div>
      <div className={styles.tomatopPlus}>
        <div className={styles.imgContent}>
          <Image src="/img/tomato_logo.png" alt="" width={81} height={81} />
          <span>х 2</span>
        </div>
        <div className={styles.text}>
          2 помидора
        </div>
      </div>
    </div>
   );
}
 
export default TodayBlock;