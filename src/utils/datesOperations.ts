import { ru } from 'date-fns/locale';
import { addDays, eachDayOfInterval, formatDuration, lastDayOfWeek, setHours, startOfDay, startOfWeek } from 'date-fns'
import format from 'date-fns/format';
import { TDatesArray, TFlag } from '@/store/statistic';
import { fillDefaultStatistic } from './fillDefaultStatistic';


// return format(newDay, 'dd MMMM', {locale: ru})

export const getLastTwoWeeksFirstDay = () => {
  const dayfirstDay = getFirstWeekDay();
  return addDays(dayfirstDay, -14);
}

export const getLastWeekFirstDay = () => {
  const dayfirstDay = getFirstWeekDay();
  return addDays(dayfirstDay, -7);
}

export const getFirstWeekDay = () => {
  return startOfWeek(new Date(), { weekStartsOn: 1 });
}

export const getLastWeekDay = (date: Date = new Date()) => {
  return lastDayOfWeek(date, { weekStartsOn: 1 });
}

export const filterFromOldDays = (arr: TDatesArray) => {
  const minDate = getLastTwoWeeksFirstDay();
  return arr.filter(date => date.date >= minDate);
}

export const filterThisWeekDays = (arr: TDatesArray) => {
  const minDate = getFirstWeekDay();
  return arr.filter(date => date.date >= minDate);
}

export const filterLastOneWeekDays = (arr: TDatesArray) => {
  const minDate = getLastWeekFirstDay();
  const maxDate = getFirstWeekDay();
  return arr.filter(date => date.date >= minDate && date.date < maxDate);
}

export const filterLastTwoWeeksDays = (arr: TDatesArray) => {
  const minDate = getLastTwoWeeksFirstDay();
  const maxDate = getLastWeekFirstDay();
  return arr.filter(date => date.date >= minDate && date.date < maxDate);
}


export function dateSortFromPast(arr: TDatesArray) {
  return arr.sort((obj1, obj2) => obj1.date.getTime() - obj2.date.getTime());
}

export function fillDateArray(arr: TDatesArray, flag: TFlag) {
  let minDate: Date = getFirstWeekDay();
  let lastDate: Date = getLastWeekDay();
  if (flag === 'lastOne') {
    minDate = getLastWeekFirstDay();
    lastDate = getLastWeekDay(minDate);
  } else if (flag === 'lastTwo') {
    minDate = getLastTwoWeeksFirstDay();
    lastDate = getLastWeekDay(minDate);
  }
  const days = arr.filter(date => date.date >= minDate);
  const datesArr = days.map(statObj => statObj.date);
  const fullDays = eachDayOfInterval({
    start: minDate, 
    end: lastDate
  });
  return fullDays.map(date => {
    if (datesArr.includes(date)) {
      return days.find(statObj => statObj.date === date);
    } else {
      return Object.assign(fillDefaultStatistic(), {date});
    }
  })
}
