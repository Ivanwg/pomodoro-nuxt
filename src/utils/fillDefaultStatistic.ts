import { IDayStatistic } from '@/store/statistic';

export const fillDefaultStatistic = (): IDayStatistic => {
  return {
    date: new Date(),
    tomatosDone: 0,
    stopsCount: 0,
    pausedMlscndS: 0,
    workedMlscndS: 0,
    focus: 0
  }
}