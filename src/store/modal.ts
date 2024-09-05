import { makeAutoObservable } from 'mobx';

type TWhatCanBeOpened = 'DELETE' | 'SETTINGS' | 'POST_SUCCESS';


class Modal {
  isOpened = false;
  whatIsOpened: TWhatCanBeOpened | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  openModal(whatOpened: TWhatCanBeOpened) {
    this.isOpened = true;
    this.whatIsOpened = whatOpened;
  }

  closeModal() {
    this.isOpened = false;
    this.whatIsOpened = null;

  }

  toggleModal() {
    this.isOpened = !this.isOpened;
    if (this.isOpened === false) {
      this.whatIsOpened = null;
    }
  }

}


export default new Modal;