import { Observable, interval, map, filter, of, retry, fromEvent } from 'rxjs';

const rxjsdemo = () => {
  const observable = new Observable((subscribe) => {
    subscribe.next(1);
    subscribe.next(2);
    subscribe.next(3);

    setTimeout(() => {
      subscribe.next(4);
      subscribe.complete();
    }, 3000);
  });
  observable.subscribe({
    next: (num) => {
      console.log(num);
    },
  });

  //   interval
  const subs = interval(500)
    .pipe(
      map((v) => ({ num: v })),
      filter((v) => v.num % 2 == 0),
    )
    .subscribe((e) => {
      console.log(e);
      if (e.num === 10) {
        // 停止
        subs.unsubscribe();
      }
    });

  // of
  const subs1 = of(1, 2, 3, 4, 5, 6)
    .pipe(
      map((v) => ({ num: v })),
      filter((v) => v.num % 2 == 0),
    )
    .subscribe((e) => {
      console.log(e);
    });

  // retry: 出错重试
  const subs2 = of(1, 2, 3, 4, 5, 6)
    .pipe(
      retry(3),
      map((v) => ({ num: v })),
      filter((v) => v.num % 2 == 0),
    )
    .subscribe((e) => {
      console.log(e);
    });

  // fromEvent: 前端处理事件
  const clicl$ = fromEvent(document, 'click').pipe(map((v) => v.target));
  clicl$.subscribe((e) => {
    console.log(e);
  });
};
export { rxjsdemo };
