import { observer } from 'mobx-react-lite';
import tasks from '../../../store/tasks';
import styles from './style.module.scss';
import TaskItem from '../TaskItem';


interface IProps {
  additionalClassName?: string;
}

const TasksList = observer(({additionalClassName}: IProps) => {
  return ( 
    <div className={additionalClassName ? additionalClassName : undefined}>
      {
        tasks.activeTasksList.length ? 
        <ul className={styles.tasksList}>
        {
          tasks.activeTasksList.map((taskObj, index) => (
            <li key={taskObj.id} className={styles.tasksLi} style={{zIndex: tasks.activeTasksList.length - index}}>
              <TaskItem {...taskObj} />
            </li>
          ))
        }
        </ul> : 'Пока еще нет задач'
      }
    </div>
   );
})
 
export default TasksList;