import { runInAction, makeAutoObservable } from 'mobx';
import user from './user';
import { ITimerInterval, interval } from '@/utils/interval';

class Timer {

  timerInterval: ITimerInterval | null = null;
  timeLeft = 0;

  constructor() {
    makeAutoObservable(this);
  }

  deactivate() {
    this.timeLeft = 0;
  }

  setWorkTimeDefault() {
    this.timeLeft = user.workTime * 60;
    // this.timeLeft = 3;
  }

  setRestTime(minutes: number) {
    this.timeLeft = minutes * 60;
  }

  run() {
    this.timerInterval && this.timerInterval.clear();
    this.timeLeft += 1;
    const tick = () => {
      runInAction(() => {
        this.timeLeft -= 1;
      })
      return this.timeLeft;
    }
    this.timerInterval = interval(tick, 1000);
  }

  addMinute() {
    this.timeLeft += 60;
  }

  stop() {
    this.timerInterval?.clear();
    this.setWorkTimeDefault();
  }
  
  pause() {
    this.timerInterval?.clear();
  }

  getMinutesLeft() {
    return Math.floor(this.timeLeft / 60);
  }
  getSecondsLeft() {
    return this.timeLeft % 60;
  }


}


export default new Timer;