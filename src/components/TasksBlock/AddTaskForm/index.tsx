import GreenBtn from '@/components/GreenBtn';
import styles from './style.module.scss';

function AddTaskForm() {
  return ( 
    <form className={styles.form}> 
      <input type='text' placeholder='Название задачи' />
      <div className={styles.err}></div>
      <GreenBtn type='submit' classNames={[styles.btn]}>
        Добавить
      </GreenBtn>
    </form>
   );
}

export default AddTaskForm;