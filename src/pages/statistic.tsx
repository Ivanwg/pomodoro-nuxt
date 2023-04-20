import ChartBlock from "@/components/StatisticBlocks/ChartBlock";
import FocusBlock from "@/components/StatisticBlocks/FocusBlock";
import PauseBlock from "@/components/StatisticBlocks/PauseBlock";
import STopBlock from "@/components/StatisticBlocks/StopBlock";
import TodayBlock from "@/components/StatisticBlocks/TodayBlock";

function Statictic() {
  return ( 
    <>
      <div className='statistic'>
        <h1 className='title cell-title'>Ваша активность</h1>
        <ChartBlock additionalClassName='cell-chart' />
        <TodayBlock additionalClassName='cell-todays' />
        <FocusBlock additionalClassName='cell-card' />
        <PauseBlock additionalClassName='cell-card' />
        <STopBlock additionalClassName='cell-card' />
      </div>
    </>
   );
}

export default Statictic;