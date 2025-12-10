export class TimerManager {
  private timers = new Set<ReturnType<typeof setTimeout>>();

  wait(ms: number = 0): Promise<void> {
    let timeoutId: NodeJS.Timeout | null = null;

    const promise = new Promise<void>((resolve) => {
      timeoutId = setTimeout(() => {
        if (timeoutId) {
          this.timers.delete(timeoutId);
          resolve();
        }
      }, ms);

      if (timeoutId) {
        this.timers.add(timeoutId);
      }
    });

    return promise;
  }

  cancelAll(): void {
    for (const timeoutId of this.timers) {
      clearTimeout(timeoutId);
    }
    this.timers.clear();
  }
}
