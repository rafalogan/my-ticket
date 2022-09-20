import express, { Application } from 'express';

export class AppConfig {
  private _express: Application;

  constructor() {
    this._express = express();
  }

  get express() {
    return this._express;
  }

  configExpress() {}
}
