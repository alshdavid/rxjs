import { Unsubscriber, Subscription } from './subscription';

/* tslint:disable-next-line */
export const noop = () => {};
export type Callback<T extends Array<any> = any> = (...args: T) => any | Promise<any>;
export type TeardownFn = void | Callback<[]>;
export type SetupFn<T> = (observer: Observer<T>) => TeardownFn;
export type NextFn<T> = (value: T) => void;

export interface Observer<T> {
  next: NextFn<T>;
  error: (error?: any) => any;
  complete: Callback<[]>;
}

export interface Subscriber<T> {
  subscribe(value?: Callback<[T]>, error?: Callback<any>, complete?: Callback<[]>): Unsubscriber;
}

export type SubscriberValue<T> = T extends Subscriber<infer U> ? U : T;

export class Observable<T = void> implements Subscriber<T> {
  private _setupFn: SetupFn<T>;

  constructor(setupFn: SetupFn<T>) {
    this._setupFn = setupFn;
  }

  subscribe(callback: Callback<[T]> = noop, error: Callback<[T]> = noop, complete: Callback<[]> = noop): Subscription {
    let active: boolean = true;
    let teardown: TeardownFn;

    const observer: Observer<T> = {
      next: (v: T) => {
        /* tslint:disable-next-line */
        active && callback(v);
      },
      complete: () => {
        if (!active) return;
        if (teardown) teardown();
        complete();
        active = false;
      },
      error: (err: any) => {
        if (!active) return;
        error(err);
        active = false;
      },
    };

    /* tslint:disable-next-line */
    teardown = this._setupFn(observer);
    /* tslint:disable-next-line */
    active || (teardown && teardown());

    const subscription = new Subscription();
    subscription.add({
      unsubscribe: () => {
        /* tslint:disable-next-line */
        teardown && teardown();
        active = false;
      },
    });
    return subscription;
  }
}
