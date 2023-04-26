import { runInAction, makeAutoObservable } from 'mobx';


// const workTime = 25;
const workTime = 1;
const restTime = 5;

class Timer {

  timerInterval: NodeJS.Timer | undefined = undefined;
  dateFuture: Date = new Date(0);
  timeLeft: Date = new Date(0);
  minutesLeft: number = 0;
  secondsLeft: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  run(dateTime: Date | null = null) {
    clearInterval(this.timerInterval);
    this.dateFuture = dateTime ? dateTime : new Date();
    !dateTime && this.dateFuture.setMinutes(this.dateFuture.getMinutes() + workTime);
    
    const id = setInterval(() => {
      const dateNow = new Date();
      const difference = this.dateFuture.getTime() - dateNow.getTime();
      if (difference <= 0) {
        clearInterval(id);
        return;
      }
      runInAction(() => {
        const newDate = new Date(difference);
        this.minutesLeft = newDate.getMinutes();
        this.secondsLeft = newDate.getSeconds();
        
      })
    }, 1000);
    this.timerInterval = id;
  }

  addMinute() {
    this.dateFuture.setMinutes(this.dateFuture.getMinutes() + 1);
    this.run(this.dateFuture);
  }

  stop() {
    clearInterval(this.timerInterval);
  }
  
  pause() {
    clearInterval(this.timerInterval);
  }

  toggleTimer() {
    // this.isOpened = !this.isOpened;
  }

}


export default new Timer;