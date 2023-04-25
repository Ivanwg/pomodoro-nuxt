import { makeAutoObservable } from 'mobx';

const workTime = 1;
const restTime = 5;

export type TUserStatus = 'WORK' | 'SHORT_REST' | 'LONG_REST' | 'REST_PAUSE' | 'BETWEEN_TASKS' | 'WITHOUT_TASK';

class User {
  status: TUserStatus = 'WITHOUT_TASK';
  tasksInARow = 0;

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

}


export default new User;