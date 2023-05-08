export abstract class BaseEvent<T> {
  public readonly createdAt = new Date();
  public static readonly eventName: string;

  constructor(protected readonly _props: T) {}

  get props() {
    return { ...this._props };
  }
}
