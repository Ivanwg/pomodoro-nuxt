import { observer } from 'mobx-react-lite';
import tasks from '../../../store/tasks';
import styles from './style.module.scss';
import TaskItem from '../TaskItem/TaskItem';


interface IProps {
  additionalClassName?: string;
}

const TasksList = observer(({additionalClassName}: IProps) => {
  return ( 
    <div className={additionalClassName ? additionalClassName : undefined}>
      {
        tasks.list.length ? 
        <ul className={styles.tasksList}>
        {
          tasks.list.map(taskObj => (
            <li key={taskObj.id} className={styles.tasksLi}>
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