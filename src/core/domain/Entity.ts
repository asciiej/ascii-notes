import crypto from "crypto";

/**
 * modelo base para criar as entidades da aplicação
 */
abstract class Entity<T> {
  protected _id: string;
  public props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? crypto.randomUUID();
  }
}

export { Entity };
