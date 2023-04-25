import { createLongClassName } from '@/utils/createLongClassName';
import styles from './style.module.scss';


interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  classNames?: Array<string>;
  filled?: boolean;
  disabled?: boolean;
}

function RedBtn({children, onClick, type, classNames, filled=false, disabled=false}: IProps) {
  const targetStyle = filled ? [styles.btn, styles.btnFilled] : [styles.btn];
  const names = classNames ? [...targetStyle, ...classNames] : [...targetStyle];
  return ( 
    <button 
      className={createLongClassName(names)} 
      onClick={onClick ? onClick : undefined}
      type={type ? type : undefined}
      disabled={disabled ? true : undefined}
    >
      {children}
    </button>
   );
}
 
export default RedBtn;