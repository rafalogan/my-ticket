import { ITicket } from '../types';

export class Ticket {
  private _id: number;
  private _eventId: number;
  private _placeId: number;
  private _theaterId: number;
  private _durationId: number;
  private _amount: number;
  private _unitaryValue: number;

  constructor(data: ITicket, id?: number) {
    Object.assign(this, data);

    if (id) this.id = id;
  }

  get id() {
    return this._id;
  }

  set id(value: number) {
    this._id = Number(value);
  }

  get eventId() {
    return this._eventId;
  }

  set eventId(value: number) {
    this._eventId = Number(value);
  }

  get placeId() {
    return this._placeId;
  }

  set placeId(value: number) {
    this._placeId = Number(value);
  }

  get theaterId() {
    return this._theaterId;
  }

  set theaterId(value: number) {
    this._theaterId = Number(value);
  }

  get durationId() {
    return this._durationId;
  }

  set durationId(value: number) {
    this._durationId = Number(value);
  }

  get amount() {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = Number(value);
  }

  get unitaryValue() {
    return this._unitaryValue;
  }

  set unitaryValue(value: number) {
    this._unitaryValue = Number(value);
  }
}
