import React, { useEffect, useState } from 'react';

import statistic from '@/store/statistic';
import { observer } from 'mobx-react-lite';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Text } from 'recharts';
import styles from './style.module.scss';
import { createLongClassName } from '@/utils/createLongClassName';
import { getRandomString } from '@/utils/getRandomIndex';



const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
interface IProps {
  additionalClassName?: string;
}





const Chart = observer(({additionalClassName}: IProps) => {
  const names = additionalClassName ? [additionalClassName, styles.chart] : [styles.chart];
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  const data2 = [{name: 'Page A', uv: 400, pv: 2400}];
  const data = statistic.getWeekList().map((statObj, index) => {
    const mlscnds = statObj?.workedMlscndS;
    const v = Math.floor(Math.random() * 500)
    return {
      name: labels[index],
      // value: statObj?.workedMlscndS
      value: 500,
      index
    }
  });
  const yAxisTickFormatter = (value: any, index: number) => {
    // if (index === 0 || index === 5) {
    //   return '';
    if (index === 0) {
      return '';
    } if (index === 5) {
      return value;
    } else if (index === 1) {
      return  '25 мин';
    } else if (index === 2) {
      return  '50 мин';
    } else if (index === 3) {
      return  '1 ч 15 мин';
    } else if (index === 4) {
      return  '1 ч 40 мин';
    } else return '';
    
  };
  return ( 
    <div className={createLongClassName(names)}>
      <ResponsiveContainer>
        <BarChart width={730} height={250} data={data} barGap={32}
        margin={{
          right: 40,
          bottom: 16,
          top: 10,
          left: 20,
        }}
        >
          <CartesianGrid stroke='#333333' opacity='0.2' vertical={false} />
          <XAxis dataKey="name" 
            tick={(e) => {
              const { payload: { value }, index } = e;
              console.log(index)
              const color = index === 6 ? "#DC3E22" : "#999999";
              e["fill"] = color;
              return <Text {...e}>{value}</Text>;
            }}

            // tickSize={11}
            cursor='pointer'
            onClick={(e: any) => {
              // console.log(e)
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis orientation='right' 
            tick={{
              fill: '#333333', 
              strokeWidth: 0
            }} 
            tickSize={20}
            axisLine={false}
            tickLine={false}
            // tickFormatter={yAxisTickFormatter}
            tickCount={6}
            // allowDecimals={false}
            // ticks={[0, 200, 300, 500, 1000, 1000000]}
            // allowDataOverflow={true}
            width={67}
            // domain={[0, 20000]}
            ticks={[0, 100, 200, 300, 400, 500]}
          />
          <Bar 
            dataKey='value' 
            fill="#EA8A79" 
            minPointSize={5} 
            maxBarSize={77} 
            isAnimationActive={true}
            onClick={(e: any) => {
              // console.log(e)
            }}
            cursor='pointer'
          >
          {
          	data.map((entry, index) => {
            	const color = entry.value > 500 ? '#DC3E22' : '#EA8A79';
            	return <Cell key={getRandomString()} fill={color} />;
            })
          }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
   );
});
 
export default Chart;