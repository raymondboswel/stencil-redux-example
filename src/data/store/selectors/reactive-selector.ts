import { BehaviorSubject, distinctUntilChanged, Observable, Observer, Subscription } from "rxjs";

export class ReactiveSelector<T> {
  subject: BehaviorSubject<T>;
  selector: Observable<T>;
  value: T;
  constructor(defaultVal?: T) {
    this.subject = new BehaviorSubject<T>(defaultVal);
    this.selector = this.subject.pipe(distinctUntilChanged())
    this.subject.subscribe(v => this.value = v);
  }

  subscribe(handler: Partial<Observer<T>> | ((value: T) => void)): Subscription {
    return this.selector.subscribe(handler);
  }
}

export function createReactiveSelector<T>(defaultVal: T = undefined): ReactiveSelector<T> {
  return new ReactiveSelector<T>(defaultVal)
}
