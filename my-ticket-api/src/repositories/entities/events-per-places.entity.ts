import { IEventsPerPlaces } from '../types';

export class EventsPerPlaces {
  private _eventId: number;
  private _placeId: number;

  constructor(data: IEventsPerPlaces) {
    Object.assign(this, data);
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
}
