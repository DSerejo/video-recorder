type TimerListener = (time: number) => void;


class Timer {
  private time: number;
  private intervalId: NodeJS.Timeout | null;
  private listeners: TimerListener[];

  constructor() {
    this.time = 0;
    this.intervalId = null;
    this.listeners = [];
  }

  start() {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => {
        this.time++;
        this.notifyListeners();
      }, 1000);
    }
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.time = 0;
    this.notifyListeners();
  }
  
  onTick(listener: TimerListener) {
    this.listeners.push(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.time));
  }
}

export default Timer;
