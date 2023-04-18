import { makeAutoObservable } from 'mobx';

export interface ITaskObj {
  id: string;
  name: string;
  tomatoesCount: number;
}

export type TTasksList = Array<ITaskObj>;


class Tasks {
  list: TTasksList = []
  constructor() {
    makeAutoObservable(this);
  }

  appenTask(task: ITaskObj) {
    this.list.push(task);
  }

  clearTasks() {
    this.list = [];
  }

}


export default new Tasks;