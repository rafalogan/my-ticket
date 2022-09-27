import { execDotenv } from 'src/utils';
import { AppConfig, Environment, LoggerConfig } from 'src/config';
import { App, ServerController } from 'src/core/controllers';
import { InitService } from './services';

execDotenv();

export const env = new Environment();
export const logger = new LoggerConfig(env.nodeEnv).logger;

const initService = new InitService();

const express = new AppConfig(env.nodeEnv, env.corsOptions, logger).express;
const server = new ServerController(express, env, initService);

export const app = new App(server);
