import { makeAutoObservable } from 'mobx';

export interface IOption {
  value: number,
  label: string,
}

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
  inactiveList = this.createInActives
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

}


export default new Statistic;