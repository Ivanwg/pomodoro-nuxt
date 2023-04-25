import { ChangeEvent, useState, FocusEvent, useRef, useEffect } from 'react';
import tasks, { ITaskObj } from '@/store/tasks';
import styles from './style.module.scss';
import TaskDropDown from '@/components/TaskDropDown/TaskDropDown';
import { createLongClassName } from '@/utils/createLongClassName';
import ReactDOM from 'react-dom';
import Modal from '@/components/Modal';
import { observer } from 'mobx-react-lite';
import modalWindow from '../../../store/modal';
import RedBtn from '@/components/RedBtn';




const TaskItem = observer(({id, tomatoesCountNeed, name}: ITaskObj) => {

  const [dropOpened, setDropOpened] = useState(false);
  const [inputEditing, setInputEditing] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState(name);
  const inpurRef = useRef<HTMLInputElement>(null);
  const menuWrapRef = useRef<HTMLDivElement>(null);
  const [toDeleteItem, setToDeleteItem] = useState<string | null>(null);

  const dropOnCLick = () => {
    setDropOpened(prevState => !prevState);
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(e.target.value);
  }

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (currentInputValue !== name && currentInputValue !== '') {
      tasks.rename(id, currentInputValue);
    }
    else {
      setCurrentInputValue(name);
    }
    setInputEditing(false);
  }

  const onDelete = (id: string) => {
    tasks.deleteTask(id);
    modalWindow.closeModal();
  }

  const TASK_OPTIONS = [
    {
      id: 0,
      name: 'Увеличить',
      iconClassName: styles.plus,
      func: (id: string) => {tasks.plusTomatosNeed(id)},
    },
    {
      id: 1,
      name: 'Уменьшить',
      iconClassName: styles.minus,
      func: (id: string) => {tasks.minusTomatosNeed(id)},
    },
    {
      id: 2,
      name: 'Редактирововать',
      iconClassName: styles.edit,
      func: () => {setInputEditing(true);},
    },
    {
      id: 3,
      name: 'Удалить',
      iconClassName: styles.delete,
      func: (id: string) => {
        modalWindow.openModal();
        setDropOpened(false);
        setToDeleteItem(id);
      },
    },
  ];

  useEffect(() => {
    if (inputEditing) {
      inpurRef.current?.focus();
      setDropOpened(false);
    }
  }, [inputEditing]);

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (e.target instanceof Node && !menuWrapRef.current?.contains(e.target)) {
        setDropOpened(false);
      }
    }
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, []);



  return ( 
    <div className={styles.taskItem}>
      {modalWindow.isOpened && toDeleteItem &&
      <Modal>
        <div className={styles.deleteConfirm}>
          <h3 className={styles.deleteTitle}>Удалить задачу?</h3>
          <RedBtn filled={true} onClick={onDelete.bind(null, toDeleteItem)}>Удалить</RedBtn>
          <button className={styles.deleteCancell} onClick={() => {modalWindow.closeModal();}}>Отмена</button>
        </div>
      </Modal>
      }
      <div className={styles.textContent}>
        <div className={styles.count}>{tomatoesCountNeed}</div>
        <input 
          onChange={onChange}
          onBlur={onBlur}
          ref={inpurRef}
          className={styles.name} 
          value={currentInputValue}  
          disabled={!inputEditing ? true : undefined} 
        />
      </div>
      <div className={styles.settings} ref={menuWrapRef}>
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
                  <li 
                  key={obj.id} 
                  onClick={() => {obj.func(id)}} 
                  className={createLongClassName([obj.iconClassName, styles.option])}>
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
})
 
export default TaskItem;