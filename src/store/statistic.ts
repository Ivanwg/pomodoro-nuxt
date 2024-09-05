import { dateSortFromPast, fillDateArray, filterLastOneWeekDays, filterLastTwoWeeksDays, filterThisWeekDays, getLastTwoWeeksFirstDay, getLastWeekFirstDay } from '@/utils/datesOperations';
import { fillDefaultStatistic } from '@/utils/fillDefaultStatistic';
import { startOfDay } from 'date-fns';
import { makeAutoObservable } from 'mobx';
import { updateLocalStorageStatistic } from './localStore/statistic';

export type TFlag = 'this' | 'lastOne' | 'lastTwo';
export type TActivity = 'work' | 'rest';


export interface IOption {
  value: number,
  label: string,
}

export interface IDayStatistic {
  date: Date;
  tomatosDone: number;
  stopsCount: number;
  pausedMlscndS: number;
  workedMlscndS: number;
  focus: number;
}

export type TOptionalDayStatistic = Partial<IDayStatistic>;


export type TDatesArray = Array<IDayStatistic>;


const OPTIONS = [
  {
    value: 0,
    label: 'Эта неделя'
  },
  {
    value: 1,
    label: 'Прошедшая неделя'
  },
  {
    value: 2,
    label: '2 недели назад'
  },
]


class Statistic {
  filterList = OPTIONS;
  _defaultFilterValue = 0;
  activeFilterObj = this.getObjByValue(this._defaultFilterValue);
  inactiveList = this.createInActives;
  dates: TDatesArray = [];
  timeOfWorkStart: Date | null = null;
  timeOfRestStart: Date | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  getObjByValue(value: number) {
    return this.filterList.find(obj => obj.value === value)
  }

  changeActiveFilter(value: number) {
    this.activeFilterObj = this.getObjByValue(value);
    this.inactiveList = this.createInActives;
  }

  get createInActives() {
    return this.filterList.filter(obj => obj.value !== this.activeFilterObj?.value);
  }

  getWeekList() {
    let weekList: TDatesArray = [];
    let flag: TFlag = 'this';
    if (this.activeFilterObj?.value === 0) {
      weekList = filterThisWeekDays(this.dates);
    } else if (this.activeFilterObj?.value === 1) {
      weekList = filterLastOneWeekDays(this.dates);
      flag = 'lastOne'
    } else if  (this.activeFilterObj?.value === 2) {
      weekList = filterLastTwoWeeksDays(this.dates);
      flag = 'lastTwo'
    }
    return fillDateArray(weekList, flag);
    
  }

  getActiveDay() {
    if (this.activeFilterObj?.value === 1) {
      return getLastWeekFirstDay();
    } else if (this.activeFilterObj?.value === 2) {
      return getLastTwoWeeksFirstDay();
    } else return startOfDay(new Date());
  }

  setWeeksDataObject(newDates: TDatesArray) {
    this.dates = newDates;
  }

  markStartTime(type: TActivity) {
    if (type === 'work') {
      this.timeOfWorkStart = new Date();
    } else if (type === 'rest') {
      this.timeOfRestStart = new Date();
    }
  }

  setDayActivity(type: TActivity, tomatoDone=false, maxWorkMinutes: number | null = null) {
    let passedMlscnds = 0;
    if (type === 'work' && this.timeOfWorkStart) {
      passedMlscnds = new Date().getTime() - this.timeOfWorkStart.getTime();
      this.timeOfWorkStart = null;
    } else if (type === 'rest' && this.timeOfRestStart) {
      passedMlscnds = new Date().getTime() - this.timeOfRestStart.getTime();
      this.timeOfRestStart = null;
    }
  }

  // сделать проверку на новый день
  appendStatisticActivityTime(time: number, type: TActivity) {
    const date = startOfDay(new Date);
    const objInList = this.dates.find(obj => obj.date === date);
    if (type === 'work') {
      if (objInList) {
        objInList.workedMlscndS += time;
      } else {
        const newDataObj = Object.assign(fillDefaultStatistic(), {date, workedMlscndS: time});
        this.dates.push(newDataObj);
      }
    } else {
      if (objInList) {
        objInList.pausedMlscndS += time;
      } else {
        const newDataObj = Object.assign(fillDefaultStatistic(), {date, pausedMlscndS: time});
        this.dates.push(newDataObj);
      }
    }
    updateLocalStorageStatistic(this.dates);
  }


}


export default new Statistic;