import { makeAutoObservable } from 'mobx';

export interface ITaskObj {
  id: string;
  name: string;
  tomatoesCountNeed: number;
}

export type TTasksList = Array<ITaskObj>;


class Tasks {
  list: TTasksList = []
  constructor() {
    makeAutoObservable(this);
  }

  appendTask(task: ITaskObj) {
    if (!this.findById(task.id)) {
      this.list.push(task);
    }
  }

  clearTasks() {
    this.list = [];
  }

  deleteTask(id: string) {
    this.list = this.list.filter(obj => obj.id !== id)
  }

  plusTomatosNeed(id: string) {
    const target = this.findById(id);
    if (target) {
      target.tomatoesCountNeed += 1;
    }
  }

  minusTomatosNeed(id: string) {
    const target = this.findById(id);
    if (target && target.tomatoesCountNeed > 1) {
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
    return this.list.find(obj => obj.id === id)
  }

}


export default new Tasks;