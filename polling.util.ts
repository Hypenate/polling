import { combineLatest, type Observable, of, type Subject, take, timer } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

/**
 * If started (polling), it returns how many polls it's at.
 * When a reset happens, the count is set back to zero and it restarts
 * @param isPolling - a subject to (de)active polling
 * @param resetTimes - a subject to reset the progress
 * @param pollEveryMs - how many milliseconds should be between the calls
 * @param pollTimes - how many times the polling should be executed */
export function createPollingObservable(
  isPolling: Subject<boolean>,
  resetTimes: Subject<void>,
  pollEveryMs = 1000,
  pollTimes = 10
): Observable<number> {
  return combineLatest([isPolling, resetTimes.pipe(startWith(null))]).pipe(
    switchMap(([isPolling, reset]) => {
      return isPolling || reset ? timer(0, pollEveryMs).pipe(take(pollTimes), takeUntil(resetTimes)) : of(0);
    })
  );
}