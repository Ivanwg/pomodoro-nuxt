import { makeAutoObservable } from 'mobx';
import timer from './timer';
import tasks from './tasks';

export type TUserStatus = 'WORK' | 'SHORT_REST' | 'LONG_REST' | 'REST_PAUSE' | 'BETWEEN_TASKS' | 'WITHOUT_TASK' | 'TASK_PAUSE';

export type TRestType = 'LONG_REST' | 'SHORT_REST';

export interface IUserTimePreferences {
  workTime: number, 
  shortRestTime: number, 
  longRestTime: number
}

class User {
  status: TUserStatus = 'WITHOUT_TASK';
  workDoneLevel = 0;
  workTime = 0;
  shortRestTime = 0;
  longRestTime = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getRestStatus(): TRestType {
    return this.workDoneLevel === 0 ? 'LONG_REST' : 'SHORT_REST';
  }

  setInitialStatus() {
    this.status = 'WITHOUT_TASK';
  }

  changeStatus(newStatus: TUserStatus=this.getRestStatus()) {
    this.status = newStatus;
  }

  doneAndDetermineRest() {
    this.workDoneLevel += 1;
    if (this.workDoneLevel === 4) {
      this.status = 'LONG_REST';
      this.workDoneLevel = 0;
    } else {
      this.status = 'SHORT_REST';
    }
  }

  changeTimeParams({workTime, shortRestTime, longRestTime}: IUserTimePreferences) {
    this.workTime = workTime;
    this.shortRestTime = shortRestTime;
    this.longRestTime = longRestTime;
  }

}


export default new User;