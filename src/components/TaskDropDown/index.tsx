import styles from './style.module.scss';

interface IProps {
  children?: React.ReactNode;
}

const TaskDropDown = ({children}: IProps) => {
  return ( 
    <div className={styles.wrap}>
      {children}
    </div>
   );
}
 
export default TaskDropDown;