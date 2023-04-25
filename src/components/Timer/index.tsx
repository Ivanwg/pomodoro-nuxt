import { observer } from 'mobx-react-lite';
import styles from './style.module.scss';
import { createLongClassName } from '@/utils/createLongClassName';
import GreenBtn from '../GreenBtn';
import RedBtn from '../RedBtn';
import { fullfillNumber } from '@/utils/fullfillNumber';
import timerStore from '@/store/timer';
import user from '@/store/user';
import tasks from '@/store/tasks';
import { useEffect, useRef, useState } from 'react';


interface IProps {
  additionalClassName?: string;
}

interface IBtnObjProps {
  func: () => void;
  text: string;
}


const Timer = observer(({additionalClassName}: IProps) => {
  const names = additionalClassName ? [styles.timerWrap, additionalClassName] : [styles.timerWrap];
  const [greenBtnObj, setGreenBtnObj] = useState<IBtnObjProps | null>(null);
  const [redBtnObj, setRedBtnObj] = useState<IBtnObjProps | null>(null);


  const onStart = () => {
    console.log('I start')
    timerStore.run();
    user.changeStatus('WORK');
  }

  const onStop = () => {
    timerStore.stop();
  }

  const onAddMinute = () => {
    timerStore.addMinute();
  }

  const activeTask = tasks.getActiveTaskObj();

  useEffect(() => {
    if (user.status === 'WITHOUT_TASK' || user.status === 'BETWEEN_TASKS') {
      setGreenBtnObj({
        func: onStart,
        text: 'Старт',
      });
      setRedBtnObj({
        func: () => {},
        text: 'Стоп',
      });
    } else if (user.status === 'WORK') {
      setGreenBtnObj({
        func: () => {console.log('I paused')},
        text: 'Пауза',
      });
      setRedBtnObj({
        func: () => {},
        text: 'Стоп',
      });
    }
  }, [user.status, setGreenBtnObj, setRedBtnObj]);

  return ( 
    <div className={createLongClassName(names)}>
      <div className={styles.header}>
        <div className={styles.name}>
          {activeTask && activeTask.name ? activeTask.name : ''}
        </div>
        <div className={styles.number}>
          {activeTask && activeTask.tomatoesDone >= 0 ? `Помидор ${activeTask.tomatoesDone + 1}` : ''}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.time}>
          <span className={styles.numbers}>{fullfillNumber(timerStore.minutesLeft)}</span> :
          <span className={styles.numbers}>{fullfillNumber(timerStore.secondsLeft)}</span>
          <button className={styles.addTime} onClick={onAddMinute} disabled={user.status === 'WITHOUT_TASK'}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
              <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
            </svg>
          </button>
        </div>
        <div className={styles.empty}>{
          user.status === 'WITHOUT_TASK' && <>Добавьте задачу, чтобы&nbsp;запустить&nbsp;таймер</>
        }</div>
        <div className={styles.btns}>
          <GreenBtn classNames={[styles.first]} onClick={greenBtnObj?.func} disabled={user.status === 'WITHOUT_TASK'}>{greenBtnObj?.text}</GreenBtn>
          <RedBtn classNames={[styles.seconds]} onClick={redBtnObj?.func} disabled={['WITHOUT_TASK', 'BETWEEN_TASKS'].includes(user.status)}>{redBtnObj?.text}</RedBtn>
        </div>
      </div>
    </div>
   );
})
 
export default Timer;