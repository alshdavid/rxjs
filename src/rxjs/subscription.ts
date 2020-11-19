export interface Unsubscriber {
  unsubscribe(): void;
}

export class Subscription implements Unsubscriber {
  private _subscribers: Array<Unsubscriber> = [];

  add(subscriber: Unsubscriber) {
    this._subscribers.push(subscriber);
  }

  unsubscribe() {
    this._subscribers.forEach((s) => s.unsubscribe());
  }
}
