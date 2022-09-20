import { INewsletter } from '../types';

export class Newsletter {
  private _id: number;
  private _name: string;
  private _email: string;
  private _active: boolean;

  constructor(data: INewsletter, id?: number) {
    Object.assign(this, data);

    if (id) this.id = id;
  }

  get id() {
    return this._id;
  }

  set id(value: number) {
    this._id = Number(value);
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get active() {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }
}
