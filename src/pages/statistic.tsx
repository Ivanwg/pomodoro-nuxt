import Chart from "@/components/StatisticBlocks/ChartBlock/Chart";
import WeekDropDown from "@/components/StatisticBlocks/ChartBlock/WeekDropDown";
import FocusBlock from "@/components/StatisticBlocks/FocusBlock";
import PauseBlock from "@/components/StatisticBlocks/PauseBlock";
import StopBlock from "@/components/StatisticBlocks/StopBlock";
import TodayBlock from "@/components/StatisticBlocks/TodayBlock";

function Statictic() {
  return ( 
    <>
      <div className='statistic'>
        <h1 className='title cell-title'>Ваша активность</h1>
        <WeekDropDown additionalClassName='cell-drop' />
        <Chart additionalClassName='cell-chart' />
        <TodayBlock additionalClassName='cell-todays' />
        <FocusBlock additionalClassName='cell-card' />
        <PauseBlock additionalClassName='cell-card' />
        <StopBlock additionalClassName='cell-card' />
      </div>
    </>
   );
}

export default Statictic;