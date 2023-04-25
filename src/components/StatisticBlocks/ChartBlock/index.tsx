import { createLongClassName } from '@/utils/createLongClassName';
import Chart from './Chart';
import WeekDropDown from './WeekDropDown';
import styles from './style.module.scss';

interface IProps {
  additionalClassName?: string;
}

const ChartBlock = ({additionalClassName}: IProps) => {
  const names = additionalClassName ? [additionalClassName, styles.chartBlock] : [styles.chartBlock];
  return ( 
    <div className={createLongClassName(names)}>
      <WeekDropDown additionalClassName={styles.gridEnd} />
      <Chart />
    </div>
   );
}
 
export default ChartBlock;