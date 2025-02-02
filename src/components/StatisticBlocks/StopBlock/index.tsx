import { observer } from 'mobx-react-lite';
import CardBlock from '../CardBlock';
import statistic from '@/store/statistic';

interface IProps {
  additionalClassName?: string;
}

const StopBlock = observer(({additionalClassName}: IProps) => {
  const names = additionalClassName ? ['green-card', additionalClassName] : ['green-card'];

  return ( 
    <CardBlock additionalClassNames={names} name='Остановки' value={'34'}>
      <svg width='129' height='129' viewBox='0 0 129 129' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z' stroke='#7FC2D7' strokeWidth='5' strokeLinecap='round' strokeLinejoin='round'/>
        <path d='M28 27L102 101' stroke='#7FC2D7' strokeWidth='5' strokeLinecap='round' strokeLinejoin='round'/>
      </svg>
    </CardBlock>
   );
})
 
export default StopBlock;