

export interface ITimerInterval {
  timer?: NodeJS.Timer;
  clear: () => void;
}


export function interval(cb: () => number, ms: number){
  const a: ITimerInterval= {
    clear : function() {
      clearTimeout(a.timer)
    }
  };
  (function run(){
    const timeLeft = cb();
    a.timer = setTimeout(run, ms);
    if (timeLeft <= 0) a.clear();
  })();
  
  return a;
}