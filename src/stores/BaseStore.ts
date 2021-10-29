import { reactive, provide, inject } from "vue";

export abstract class BaseStore<T> {
  public abstract state: T;

  constructor() {
    console.log(`CONSTRUCTING AUTH STORE`);
  }
  public stateSymbol = Symbol(this.constructor.name);

  public setState(values: Partial<T>): T {
    for (const key in values) {
      (this.state as any)[key] = values[key];
    }
    return this.state;
  }
}
