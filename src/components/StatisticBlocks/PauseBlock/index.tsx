import CardBlock from "../CardBlock";

interface IProps {
  additionalClassName?: string;
}

const PauseBlock = ({additionalClassName}: IProps) => {
  const names = additionalClassName ? ['blue-card', additionalClassName] : ['blue-card'];
  return ( 
    <CardBlock additionalClassNames={names} name='Время на паузе' value={'34'}>
      <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#9C97D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M64.3154 37.158V64.3159L77.8944 77.8948" stroke="#9C97D7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </CardBlock>
   );
}
 
export default PauseBlock;