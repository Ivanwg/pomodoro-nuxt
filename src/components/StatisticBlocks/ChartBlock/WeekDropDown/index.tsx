import { MouseEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import statistic from '@/store/statistic';
import styles from './style.module.scss';
import { createLongClassName } from '@/utils/createLongClassName';


const WeekDropDown = observer(() => {

  const [selectOpened, setSelectOpened] = useState(false);
  const mainClassNames = selectOpened ? [styles.select, styles.opened] : [styles.select];

  return ( 
    <div className={createLongClassName(mainClassNames)}>
      <div className={createLongClassName([styles.item, styles.activeItem])}>
        <button 
          className={styles.btn}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setSelectOpened(prev => !prev);
          }}
        >
          {statistic.activeFilterObj?.label}
        </button>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 9L8 2L15 9" stroke="#B7280F" strokeWidth="2"/>
        </svg>
      </div>
      {
        selectOpened && 
        <ul className={styles.filtersList}>
          {statistic.inactiveList.map(obj => 
            <li key={obj.value} className={styles.item}>
              <button 
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                statistic.changeActiveFilter(obj.value);
                setSelectOpened(false);
              }}
              className={styles.btn}
              >{obj.label}</button>
            </li>
          )}
        </ul>
      }
    </div>
  );
})
 
export default WeekDropDown;