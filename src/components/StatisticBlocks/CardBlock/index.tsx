import { createLongClassName } from '@/utils/createLongClassName';
import styles from './style.module.scss';
import React from 'react';
interface IProps {
  additionalClassNames?: Array<string>;
  name: string;
  value: string;
  iconClassName: string;
}


function CardBlock({additionalClassNames, name, value, iconClassName}: IProps) {
  const names = additionalClassNames ? [styles.CardBlock, ...additionalClassNames] : [styles.CardBlock];
  return ( 
    <div className={createLongClassName(names)}>
      <div className={createLongClassName(['title', styles.name])}>
        {name}
      </div>
      <div className={styles.value}>
        {value}
      </div>
      <div className={createLongClassName([styles.icon, iconClassName])}>
      </div>
    </div>
   );
}

export default CardBlock;