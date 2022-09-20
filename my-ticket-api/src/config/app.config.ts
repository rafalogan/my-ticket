import express, { Application } from 'express';
import cors from 'cors';
import { ICorsOptions } from 'src/repositories/types';

export class AppConfig {
  private readonly _express: Application;

  constructor(private env: string, private corsOptions: ICorsOptions) {
    this._express = express();
  }

  get express() {
    return this._express;
  }

  configExpress() {
    this.express.use(cors(this.corsOptions));
  }
}
