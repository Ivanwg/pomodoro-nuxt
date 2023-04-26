import { makeAutoObservable } from 'mobx';

const workTime = 1;
const restTime = 5;

export type TUserStatus = 'WORK' | 'SHORT_REST' | 'LONG_REST' | 'REST_PAUSE' | 'BETWEEN_TASKS' | 'WITHOUT_TASK' | 'TASK_PAUSE';

class User {
  status: TUserStatus = 'WITHOUT_TASK';
  workDoneLevel = 0;

  constructor() {
    makeAutoObservable(this);
  }


  setInitialStatus() {
    this.status = 'WITHOUT_TASK';
    const a = new Date()
    const b = new Date(new Date().setMinutes(20))

    console.log(new Date(a.getTime() + b.getTime()))
  }

  changeStatus(newStatus: TUserStatus) {
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