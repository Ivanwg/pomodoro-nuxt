import { observer } from 'mobx-react-lite';
import styles from './style.module.scss';
import { createLongClassName } from '@/utils/createLongClassName';
import GreenBtn from '../GreenBtn';
import RedBtn from '../RedBtn';
import { fullfillNumber } from '@/utils/fullfillNumber';
import timerStore from '@/store/timer';
import user, { TRestType, TUserStatus } from '@/store/user';
import tasks from '@/store/tasks';
import { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import { USER_MAX_LONG_REST_TIME, USER_MAX_WORK_TIME } from '@/constants';


interface IProps {
  additionalClassName?: string;
}

interface IBtnObjProps {
  func: () => void;
  text: string;
}

function checkIfAddBtnDisable(minutes: number, status: TUserStatus) {
  if (status === 'WITHOUT_TASK') {
    return true;
  } else if ((['WORK', 'TASK_PAUSE', 'BETWEEN_TASKS'].includes(status) && minutes >= USER_MAX_WORK_TIME + 10) || (['LONG_REST', 'SHORT_REST', 'REST_PAUSE'].includes(status) && minutes >= USER_MAX_LONG_REST_TIME + 5)) {
    return true;
  }
  return false;
}

function defineHeaderClassNames(status: TUserStatus) {
  const names = [styles.header];
  if (['WORK', 'TASK_PAUSE'].includes(status)) {
    names.push(styles.headerWork);
  } else if (['LONG_REST', 'SHORT_REST', 'REST_PAUSE'].includes(status)) {
    names.push(styles.headerPause);
  }
  return names;
}


function timeNames(status: TUserStatus) {
  const names = [styles.time];
  if (status === 'WORK') {
    names.push(styles.timeWork);
  } else if (['LONG_REST', 'SHORT_REST'].includes(status)) {
    names.push(styles.timeRest);
  }
  return names;
}

function getTomatoOrRest(status: TUserStatus) {
  if (['SHORT_REST', 'LONG_REST', 'REST_PAUSE'].includes(status)) {
    return 'Перерыв'
  } else return 'Помидор'
}


const Timer = observer(({additionalClassName}: IProps) => {
  const names = additionalClassName ? [styles.timerWrap, additionalClassName] : [styles.timerWrap];
  const [greenBtnObj, setGreenBtnObj] = useState<IBtnObjProps | null>(null);
  const [redBtnObj, setRedBtnObj] = useState<IBtnObjProps | null>(null);
  const [play] = useSound('/audio/audio.wav', {
    volume: 2,
    interrupt: true,
  });
  const activeTask = tasks.getActiveTaskObj();

  const onStart = () => {
    timerStore.run();
    user.changeStatus('WORK');
  }

  const onStop = () => {
    timerStore.stop();
    user.changeStatus('BETWEEN_TASKS');
  }

  const onPause = () => {
    timerStore.pause()
    user.changeStatus('TASK_PAUSE');
  }

  const onRestPause = () => {
    timerStore.pause()
    user.changeStatus('REST_PAUSE');
  }

  const onContinueRest = () => {
    user.changeStatus(); 
    timerStore.run();
  }

  const onSkipRest = () => {
    tasks.doneOneTomato();
    timerStore.stop();
    if (!tasks.activeTasksList.length) {
      user.changeStatus('WITHOUT_TASK');
    } else {
      user.changeStatus('BETWEEN_TASKS');
    }
  }

  const onRest = (type: TRestType) => {
    const restMinutes = type === 'LONG_REST' ? user.longRestTime : user.shortRestTime;
    timerStore.setRestTime(restMinutes);
    timerStore.run();
  }

  const onTaskDone = () => {
    timerStore.stop();
    user.doneAndDetermineRest();
    onRest(user.getRestStatus());
  }

  const onAddMinute = () => {
    timerStore.addMinute();
  }


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
      user.status === 'WITHOUT_TASK' ? timerStore.deactivate() : timerStore.setWorkTimeDefault();
    } else if (user.status === 'WORK') {
      setGreenBtnObj({
        func: onPause,
        text: 'Пауза',
      });
      setRedBtnObj({
        func: onStop,
        text: 'Стоп',
      });
    } else if (user.status === 'TASK_PAUSE') {
      setGreenBtnObj({
        func: onStart,
        text: 'Продолжить',
      });
      setRedBtnObj({
        func: onTaskDone,
        text: 'Сделано',
      });
    } else if (user.status === 'LONG_REST' || user.status === 'SHORT_REST') {
      setGreenBtnObj({
        func: onRestPause,
        text: 'Пауза',
      });
      setRedBtnObj({
        func: onSkipRest,
        text: 'Пропустить',
      });
    }
    else if (user.status === 'REST_PAUSE') {
      setGreenBtnObj({
        func: onContinueRest,
        text: 'Продолжить',
      });
      setRedBtnObj({
        func: onSkipRest,
        text: 'Пропустить',
      });
    }
  }, [user.status, setGreenBtnObj, setRedBtnObj]);

  useEffect(() => {
    if (timerStore.timeLeft === 0 && ['WORK', 'LONG_REST', 'SHORT_REST'].includes(user.status)) {
      play();
      if (user.status === 'WORK') {
        onTaskDone();
      } else {
        timerStore.setWorkTimeDefault();
        tasks.doneOneTomato();
        if (!tasks.activeTasksList.length) {
          user.changeStatus('WITHOUT_TASK');
        } else {
          user.changeStatus('BETWEEN_TASKS');
        }
        
      }
    }
  }, [timerStore.timeLeft, user.status]);

  return ( 
    <div className={createLongClassName(names)}>
      <div className={createLongClassName(defineHeaderClassNames(user.status))}>
        <div className={styles.name}>
          {activeTask && activeTask.name ? activeTask.name : ''}
        </div>
        <div className={styles.number}>
          {activeTask && activeTask.tomatoesDone >= 0 ? `${getTomatoOrRest(user.status)} ${activeTask.tomatoesDone + 1}` : ''}
        </div>
      </div>
      <div className={styles.body}>
        <div className={createLongClassName(timeNames(user.status))}>
          <span className={styles.numbers}>{fullfillNumber(timerStore.getMinutesLeft())}</span>
          <>:</>
          <span className={styles.numbers}>{fullfillNumber(timerStore.getSecondsLeft())}</span>
          <button className={styles.addTime} onClick={onAddMinute} disabled={checkIfAddBtnDisable(timerStore.getMinutesLeft(), user.status)}>
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