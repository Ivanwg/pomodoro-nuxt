import * as React from 'react';
import { useState } from 'react';
import { ITaskObj } from '@/store/tasks';
import styles from './style.module.scss';
import TaskDropDown from '@/components/TaskDropDown/TaskDropDown';
import { createLongClassName } from '@/utils/createLongClassName';


const TASK_OPTIONS = [
  {
    id: 0,
    name: 'Увеличить',
    iconClassName: styles.plus,
    func: () => {},
  },
  {
    id: 1,
    name: 'Уменьшить',
    iconClassName: styles.minus,
    func: () => {},
  },
  {
    id: 2,
    name: 'Редактирововать',
    iconClassName: styles.edit,
    func: () => {},
  },
  {
    id: 3,
    name: 'Удалить',
    iconClassName: styles.delete,
    func: () => {},
  },
]


const TaskItem = ({id, tomatoesCount, name}: ITaskObj) => {

  const [dropOpened, setDropOpened] = useState(false);

  const dropOnCLick = () => {
    setDropOpened(prevState => !prevState);
  }


  return ( 
    <div className={styles.taskItem}>
      <div className={styles.textContent}>
        <div className={styles.count}>{tomatoesCount}</div>
        <input className={styles.name} value={name}  readOnly />
      </div>
      <div className={styles.settings}>
        <svg width="26" height="25" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg"  onClick={dropOnCLick}>
          <circle cx="3" cy="3" r="3"/>
          <circle cx="13" cy="3" r="3"/>
          <circle cx="23" cy="3" r="3"/>
        </svg>
        {
          dropOpened && <TaskDropDown>
            <ul className={styles.optionsList}>
              {
                TASK_OPTIONS.map(obj => 
                  <li key={obj.id} onClick={obj.func} className={createLongClassName([obj.iconClassName, styles.option])}>
                    {obj.name}
                  </li> 
                )
              }
            </ul>
          </TaskDropDown>
        }
      </div>
    </div>
   );
}
 
export default TaskItem;