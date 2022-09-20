import { IContact } from '../types/contact';

export class Contact {
  private _id: number;
  private _name: string;
  private _email: string;
  private _subject: string;
  private _phone: string;
  private _message: string;
  private _saleId: number;

  constructor(data: IContact, id?: number) {
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

  get subject() {
    return this._subject;
  }

  set subject(value: string) {
    this._subject = value;
  }

  get phone() {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get message() {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get saleId() {
    return this._saleId;
  }

  set saleId(value: number) {
    this._saleId = Number(value);
  }
}
