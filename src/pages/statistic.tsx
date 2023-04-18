import FocusBlock from "@/components/StatisticBlocks/FocusBlock";
import PauseBlock from "@/components/StatisticBlocks/PauseBlock";
import STopBlock from "@/components/StatisticBlocks/StopBlock";
import TodayBlock from "@/components/StatisticBlocks/TodayBlock";

function Statictic() {
  return ( 
    <>
      <div className='statistic'>
        <h1 className='title'>Ваша активность</h1>
        <TodayBlock />
        <FocusBlock />
        <PauseBlock />
        <STopBlock />
      </div>
    </>
   );
}

export default Statictic;