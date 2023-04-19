import { createLongClassName } from '@/utils/createLongClassName';
import styles from './style.module.scss';
import React from 'react';
interface IProps {
  additionalClassNames?: Array<string>;
  name: string;
  value: string;
  children: React.ReactNode;
  empty?: boolean;
}


function CardBlock({additionalClassNames, name, value, children, empty=false}: IProps) {
  const names = additionalClassNames ? [styles.CardBlock, ...additionalClassNames] : [styles.CardBlock];
  return ( 
    <div className={createLongClassName(names)} aria-disabled={empty ? true : undefined}>
      <div className={createLongClassName(['title', styles.name])}>
        {name}
      </div>
      <div className={styles.value}>
        {value}
      </div>
      <div className={createLongClassName([styles.icon])}>
        {children}
      </div>
    </div>
   );
}

export default CardBlock;