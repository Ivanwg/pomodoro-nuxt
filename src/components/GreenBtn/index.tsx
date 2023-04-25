import { createLongClassName } from '@/utils/createLongClassName';
import styles from './style.module.scss';


interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  classNames?: Array<string>;
  disabled?: boolean;
}


function GreenBtn({children, onClick, type, classNames, disabled=false}: IProps) {
  const names = classNames ? [styles.btn, ...classNames] : [styles.btn];
  const onGreenClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  }
  return ( 
    <button 
      className={createLongClassName(names)} 
      onClick={onGreenClick}
      type={type ? type : undefined}
      disabled={disabled ? true : undefined}
    >
      {children}
    </button>
   );
}

export default GreenBtn;