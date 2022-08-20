import { Subject, take } from 'rxjs';
import { createPollingObservable } from './polling.util';

// Setup the mechanisme
const isPolling$ = new Subject<boolean>();
const resetPollingSubject = new Subject<void>();

createPollingObservable(isPolling$, resetPollingSubject).subscribe((v) => {
  console.log(v);
});

// Start the polling (by default, 10 times)
isPolling$.next(true);
