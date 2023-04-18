import { createLongClassName } from '@/utils/createLongClassName';
import styles from './style.module.scss';



function TasksBlock() {
  return (
    <div className={styles.tasksBlock}>
      <div className={styles.textContent}>
        <h1 className={createLongClassName(['title', styles.title])}>{'Ура! Теперь можно начать работать:'}</h1>
        <ul className={styles.staticList}>
          <li>
            {'Выберите категорию и напишите название текущей задачи'}
          </li>
          <li>
            {'Запустите таймер («помидор»)'}
          </li>
          <li>
            {'Работайте пока «помидор» не прозвонит'}
          </li>
          <li>
            {'Сделайте короткий перерыв (3-5 минут)'}
          </li>
          <li>
            {'Продолжайте работать «помидор» за «помидором», пока задачи не будут выполнены. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).'}
          </li>
        </ul>
      </div>
    </div>
   );
};

export default TasksBlock;