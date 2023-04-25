import { makeAutoObservable } from 'mobx';

export interface IObj {
  id: string;
  name: string;
  tomatoesCountNeed: number;
}



class Modal {
  isOpened = false;
  constructor() {
    makeAutoObservable(this);
  }

  openModal() {
    this.isOpened = true;
  }

  closeModal() {
    this.isOpened = false;
  }

  toggleModal() {
    this.isOpened = !this.isOpened;
  }

}


export default new Modal;