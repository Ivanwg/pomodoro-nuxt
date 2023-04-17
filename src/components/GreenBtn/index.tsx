import { createLongClassName } from '@/utils/createLongClassName';
import styles from './style.module.scss';


interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  classNames?: Array<string>;
}

function GreenBtn({children, onClick, type, classNames}: IProps) {
  const names = classNames ? [styles.btn, ...classNames] : [styles.btn];
  return ( 
    <button 
      className={createLongClassName(names)} 
      onClick={onClick ? onClick : undefined}
      type={type ? type : undefined}
    >
      {children}
    </button>
   );
}

export default GreenBtn;