import CardBlock from "../CardBlock";

interface IProps {
  additionalClassName?: string;
}

const FocusBlock = ({additionalClassName}: IProps) => {
  const names = additionalClassName ? ['peach-card', additionalClassName] : ['peach-card'];
  return ( 
    <CardBlock additionalClassNames={names} name='Фокус' value={'1'}>
      <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M64.5 102C85.2107 102 102 85.2107 102 64.5C102 43.7893 85.2107 27 64.5 27C43.7893 27 27 43.7893 27 64.5C27 85.2107 43.7893 102 64.5 102Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M64.5 85C75.8218 85 85 75.8218 85 64.5C85 53.1782 75.8218 44 64.5 44C53.1782 44 44 53.1782 44 64.5C44 75.8218 53.1782 85 64.5 85Z" stroke="#FFAE35" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </CardBlock>
   );
}
 
export default FocusBlock;