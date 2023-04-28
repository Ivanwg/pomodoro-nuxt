import { makeAutoObservable } from 'mobx';
import timer from './timer';

export type TUserStatus = 'WORK' | 'SHORT_REST' | 'LONG_REST' | 'REST_PAUSE' | 'BETWEEN_TASKS' | 'WITHOUT_TASK' | 'TASK_PAUSE';

export type TRestType = 'LONG_REST' | 'SHORT_REST';

class User {
  status: TUserStatus = 'WITHOUT_TASK';
  workDoneLevel = 0;
  workTime = 1;
  shortRestTime = 1;
  longRestTime = 1;

  constructor() {
    makeAutoObservable(this);
  }

  getRestStatus(): TRestType {
    return this.workDoneLevel === 0 ? 'LONG_REST' : 'SHORT_REST';
  }

  setInitialStatus() {
    this.status = 'WITHOUT_TASK';
    // const a = new Date()
    // const b = new Date(new Date().setMinutes(20))

    // console.log(new Date(a.getTime() + b.getTime()))
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

}


export default new User;