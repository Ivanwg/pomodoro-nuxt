import { makeAutoObservable } from 'mobx';
import user from './user';
// import timer from './timer';

export interface ITaskObj {
  id: string;
  name: string;
  tomatoesCountNeed: number;
  tomatoesDone: number;
}

export type TTasksList = Array<ITaskObj>;

export interface ITasksDateObj {

}


class Tasks {
  activeTasksList: TTasksList = []
  tomatoesMinLimit = 1;
  tomatoesMaxLimit = 99;
  constructor() {
    makeAutoObservable(this);
  }

  appendTask(task: ITaskObj) {
    if (this.activeTasksList.length === 0) {
      user.changeStatus('BETWEEN_TASKS');
      // timer.setWorkTimeDefault();
    }
    if (!this.findById(task.id)) {
      this.activeTasksList.push(task);
    }
  }

  clearTasks() {
    this.activeTasksList = [];
    // user.changeStatus('WITHOUT_TASK');
  }

  deleteTask(id: string) {
    console.log(id)
    this.activeTasksList = this.activeTasksList.filter(obj => obj.id !== id);
    if (this.activeTasksList.length === 0) {
      // user.changeStatus('WITHOUT_TASK');
      // timer.deactivate();

    }
  }

  plusTomatosNeed(id: string) {
    const target = this.findById(id);
    if (target && target.tomatoesCountNeed < this.tomatoesMaxLimit) {
      target.tomatoesCountNeed += 1;
    }
  }

  doneOneTomato(id: string = '') {
    const target = id.length ? this.findById(id) : this.getActiveTaskObj();
    if (target) {
      target.tomatoesDone += 1;
      if (target.tomatoesCountNeed <= target.tomatoesDone) {
        this.deleteTask(target.id);
      }
    }
  }

  minusTomatosNeed(id: string) {
    const target = this.findById(id);
    if (target && target.tomatoesCountNeed > this.tomatoesMinLimit) {
      target.tomatoesCountNeed -= 1;
    }
  }

  rename(id: string, newName: string) {
    const target = this.findById(id);
    if (target) {
      target.name = newName;
    }
  }

  findById(id: string) {
    return this.activeTasksList.find(obj => obj.id === id)
  }

  getActiveTaskObj() {
    if (!this.activeTasksList.length) {
      return null;
    } else {
      return this.activeTasksList[0];
    }
  }

}


export default new Tasks;