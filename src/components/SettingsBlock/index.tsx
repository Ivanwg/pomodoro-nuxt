import styles from './style.module.scss';
import Modal from '@/components/Modal';
import modalWindow from '@/store/modal';
import { observer } from 'mobx-react-lite';
import user from '@/store/user';
import { useEffect, useState } from 'react';
import { USER_MAX_LONG_REST_TIME, USER_MAX_SHORT_REST_TIME, USER_MAX_WORK_TIME, USER_MIN_LONG_REST_TIME, USER_MIN_SHORT_REST_TIME, USER_MIN_WORK_TIME } from '@/constants';
import RedBtn from '../RedBtn';
import timer from '@/store/timer';
import tasks from '@/store/tasks';
import { updateLocalStoragePreferences } from '@/store/localStore/timePreferences';
import { createLongClassName } from '@/utils/createLongClassName';
import GreenBtn from '../GreenBtn';


const SettingsBlock = observer(() => {
  const [workValue, setWorkValue] = useState(user.workTime);
  const [shortRestValue, setShortRestValue] = useState(user.shortRestTime);
  const [longRestValue, setLongRestValue] = useState(user.longRestTime);
  const [formTouched, setFormTouched] = useState(false);


  useEffect(() => {
    setWorkValue(user.workTime);
    setShortRestValue(user.shortRestTime);
    setLongRestValue(user.longRestTime);

  }, [user.workTime, user.shortRestTime, user.longRestTime]);

  useEffect(() => {
    return () => {
      if (modalWindow.whatIsOpened !== 'SETTINGS') {
        setWorkValue(user.workTime);
        setShortRestValue(user.shortRestTime);
        setLongRestValue(user.longRestTime);
      }
    }
  }, [modalWindow.whatIsOpened]);

  const onClick = (e: React.MouseEvent) => {
    modalWindow.openModal('SETTINGS');
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTouched(true);
    const target = e.target;
    const name = target.name;
    if (name === 'work') {
      setWorkValue(parseInt(target.value));
    } else if (name === 'shortRest') {
      console.log(name)
      setShortRestValue(parseInt(target.value));
    } else if (name === 'longRest') {
      setLongRestValue(parseInt(target.value));
      console.log(name)
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormTouched(false);
    const newPrefObj = {
      workTime: workValue,
      shortRestTime: shortRestValue,
      longRestTime: longRestValue,
    };
    user.changeTimeParams(newPrefObj);
    updateLocalStoragePreferences(newPrefObj);
    modalWindow.closeModal();
    timer.stop();
    user.changeStatus(tasks.activeTasksList.length ? 'BETWEEN_TASKS' : 'WITHOUT_TASK');
    modalWindow.openModal('POST_SUCCESS');
  }

  return ( 
    <div>
      <button className={styles.settings} onClick={onClick}>
        <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 50 50' width='22px' height='22px'>
          <path d='M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z' fill='transparent'/>
        </svg>
        <span>Настройки</span>
      </button>
      {
        modalWindow.isOpened && modalWindow.whatIsOpened === 'SETTINGS' && 
        <Modal>
          <div className={styles.modalWrap}>
            <h2 className='title'>Настройки</h2>
            <form className={styles.form} onSubmit={onSubmit}>
              <label>
                <span>Время работы:</span>
                <div className={styles.timeWrap}>
                  <input 
                  className={styles.rangeInput}
                  name='work' 
                  type='range' 
                  value={workValue} 
                  min={USER_MIN_WORK_TIME} 
                  max={USER_MAX_WORK_TIME} 
                  step={1}
                  onChange={onChange} />
                  <span>{workValue} мин.</span>
                </div>
              </label>
              <label>
                <span>Время короткого перерыва:</span>
                <div className={styles.timeWrap}>
                  <input 
                  className={styles.rangeInput}
                  name='shortRest' 
                  type='range' 
                  value={shortRestValue} 
                  min={USER_MIN_SHORT_REST_TIME} 
                  max={USER_MAX_SHORT_REST_TIME} 
                  step={1}
                  onChange={onChange} />
                  <span>{shortRestValue} мин.</span>
                </div>
              </label>
              <label>
                <span>Время длинного перерыва:</span>
                <div className={styles.timeWrap}>
                  <input 
                  className={styles.rangeInput}
                  name='longRest' 
                  type='range' 
                  value={longRestValue} 
                  min={USER_MIN_LONG_REST_TIME} 
                  max={USER_MAX_LONG_REST_TIME} 
                  step={1}
                  onChange={onChange} />
                  <span>{longRestValue} мин.</span>
                </div>
              </label>
              <RedBtn type='submit' classNames={[styles.btn]} filled={true} disabled={!formTouched ? true : false}>Сохранить</RedBtn>
            </form>
          </div>
        </Modal>
      }
      {
        modalWindow.isOpened && modalWindow.whatIsOpened === 'POST_SUCCESS' && 
        <Modal>
          <div className={styles.successWrap}>
            <h2 className={createLongClassName(['title', styles.successTitle])}>Изменения применены</h2>
            <GreenBtn onClick={() => modalWindow.closeModal()} classNames={[styles.successBtn]}>Закрыть</GreenBtn>
          </div>
        </Modal>
      }
    </div>
   );
})
 
export default SettingsBlock;