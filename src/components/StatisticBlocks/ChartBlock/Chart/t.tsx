import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import statistic from '@/store/statistic';
import styles from './style.module.scss';
import { observer } from 'mobx-react-lite';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    background: null,
    padding: 0,
  },
  scales: {
    y: {
      position: 'right',
      beginAtZero: true,
      // max: Math.max(...dataArray),
      max: 3,
      // grid: {
      //   display: false,
      // },
      ticks: {
        backdropPadding: 10,
        // stepSize: Math.max(...dataArray),
        maxTicksLimit: 4,
        // callback: function(val, index) {
        //   const twoArr = [0, Math.max(...dataArray)]
        //   if (index < twoArr.length) return stringToFixed(twoArr.sort((a, b) => a - b)[index]);
        //   else return
        // },

        font: {
          family: 'SF UI Display',
          weight: 400,
          size: 12,
        },
        color: '#333333',
        // padding: 8,

      },
      // afterFit: (axis: any) => {
      //   axis.paddingLeft = 0;
      // }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'SF UI Display',
          weight: 400,
          size: 22,
        },
        color: '#999999',

      },
    },
  },
  plugins: {
    tooltip: {
      enabled: false
    },
    legend: {
      display: null
    },
  },
  onClick: (e: any) => {
    const c = helpers.getRelativePosition(e, e.chart);

}
}

const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];




const Chart = observer(() => {
  const data = {
    labels,
    datasets: [
      {
        data: statistic.getWeekList().map(statObj => {
          const mlscnds = statObj?.workedMlscndS;
          // return mlscnds;
          return 2
        }),
        backgroundColor: ['#EA8979', 'blue'],
        borderWidth: 0,
      },
    ],
  };

  return ( 
    <div className={styles.chart}>
      {
        <Bar 
        /* @ts-ignore */
        options={options} 
        data={data} 
      />
      }
    </div>
   );
});
 
export default Chart;