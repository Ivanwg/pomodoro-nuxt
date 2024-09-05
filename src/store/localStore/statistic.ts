import { filterFromOldDays } from '@/utils/datesOperations';
import { TDatesArray } from '../statistic';


const key = 'POMODORO_STATISTIC';
const defaultStatistic: TDatesArray = [];

export function setDefaultStatsLocalStorage() {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultStatistic));
  }
}


export function getLocalStorageStatistic(): TDatesArray {
  const storageSata = localStorage.getItem(key);
  const tasks = storageSata ? JSON.parse(storageSata) : defaultStatistic;
  return filterFromOldDays(tasks);
}

export function updateLocalStorageStatistic(newDates: TDatesArray) {
  localStorage.setItem(key, JSON.stringify(newDates));
}
