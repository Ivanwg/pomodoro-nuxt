import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import GreenBtn from '@/components/GreenBtn';
import tasks from '../../../store/tasks';
import { getRandomString } from '@/utils/getRandomIndex';

function AddTaskForm() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [inputRef]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.length) return;
    tasks.appendTask({
      id: getRandomString(),
      name: inputValue,
      tomatoesCountNeed: 1,
      tomatoesDone: 0,
    });
    setInputValue('');
  }


  return ( 
    <form className={styles.form} onSubmit={onSubmit}> 
      <input type='text' value={inputValue} onChange={onChange} placeholder='Название задачи' ref={inputRef} />
      <div className={styles.err}></div>
      <GreenBtn type='submit' classNames={[styles.btn]} disabled={inputValue.length ? undefined : true}>
        Добавить
      </GreenBtn>
    </form>
   );
}

export default AddTaskForm;