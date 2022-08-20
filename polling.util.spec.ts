// import { BehaviorSubject, Subject } from 'rxjs';
// import { TestScheduler } from 'rxjs/testing';
// import { createPollingObservable } from './polling.util';

// describe('Test the polling', () => {
//   let scheduler: TestScheduler;

//   beforeEach(() => {
//     scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
//   });

//   it('should start and stop when all calls have been done', () => {
//     scheduler.run(({ expectObservable, cold }) => {
//       //GIVEN
//       const isPolling$ = new BehaviorSubject<boolean>(true);
//       const resetSubject = new Subject<void>();

//       cold('x 999ms x 999ms').subscribe();

//       // TEST
//       const polling$ = createPollingObservable(isPolling$, resetSubject, 1000, 2);

//       // EXPECT
//       expectObservable(polling$).toBe('x 999ms y', {
//         x: 0,
//         y: 1,
//       });
//     });
//   });

//   it('should start and stop when polling is stopped', () => {
//     scheduler.run(({ expectObservable, cold }) => {
//       //GIVEN
//       const isPolling$ = new BehaviorSubject<boolean>(true);
//       const resetSubject = new Subject<void>();

//       cold('x 999ms x 999ms -z', { x: 'polling', z: 'stop' }).subscribe((status) => {
//         if (status === 'stop') {
//           isPolling$.next(false);
//         }
//       });

//       // TEST
//       const polling$ = createPollingObservable(isPolling$, resetSubject, 1000, 2);

//       // EXPECT
//       expectObservable(polling$).toBe('x 999ms y 999ms -z', {
//         x: 0,
//         y: 1,
//         z: 0,
//       });
//     });
//   });

//   it('should start, poll 2 times, reset, poll 3 and stop', () => {
//     scheduler.run(({ expectObservable, cold }) => {
//       //GIVEN
//       const isPolling$ = new BehaviorSubject<boolean>(true);
//       const resetSubject = new Subject<void>();

//       cold('x 999ms x 999ms z 999ms x 999ms x 999ms x', { x: 'polling', z: 'reset' }).subscribe((status) => {
//         if (status === 'reset') {
//           resetSubject.next();
//         }
//       });

//       // TEST
//       const polling$ = createPollingObservable(isPolling$, resetSubject, 1000, 3);

//       // EXPECT
//       expectObservable(polling$).toBe('a 999ms b 999ms a 999ms b 999ms c', {
//         a: 0,
//         b: 1,
//         c: 2,
//       });
//     });
//   });
// });
