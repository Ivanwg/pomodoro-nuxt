import ReactDOM from "react-dom";
import styles from './style.module.scss';
import { useEffect, useRef, useState } from "react";
import modalWindow from "@/store/modal";

interface IProps {
  children?: React.ReactNode;
}

const Modal = ({children} :IProps) => {
  const wrap = document.getElementById('modal');
  const wrapContentRef = useRef<HTMLDivElement>(null);
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
  useEffect(() => {
    if (!isMount) return;
    function handleClick(e: MouseEvent) {
      if (e.target instanceof Node && !wrapContentRef.current?.contains(e.target) && isMount) {
        e.stopPropagation()
        modalWindow.closeModal();
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [isMount]);
  return wrap ? ReactDOM.createPortal(
    (<div className={styles.wrap}>
      <div className={styles.content} ref={wrapContentRef}>
        {children}
        <button className={styles.icon} onClick={() => {modalWindow.closeModal()}}>
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.9115 8.80583L2.84406 13.9567L0.961665 12.0433L6.02911 6.89245L1.0675 1.84914L2.85992 0.0272091L7.82153 5.07052L12.7673 0.0433371L14.6497 1.95672L9.70392 6.9839L14.6655 12.0272L12.8731 13.8491L7.9115 8.80583Z" fill="#C4C4C4"/>
          </svg>
        </button>
      </div>
    </div>), wrap
  ) : null;
}
 
export default Modal;