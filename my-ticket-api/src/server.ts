import { Knex } from 'knex';
import Config = Knex.Config;

import { execDotenv, getKnexProps } from 'src/utils';
import { AppConfig, Environment, KnexConfig, LoggerConfig } from 'src/config';
import { App, ServerController } from 'src/core/controllers';
import { InitService } from './services';
import { DatabaseService } from 'src/core/service';
import { CacheService } from 'src/core/service/cache.service';

execDotenv();

export const env = new Environment();
const knexProps = getKnexProps(env);

export const logger = new LoggerConfig(env.nodeEnv).logger;
export const knexfile = new KnexConfig(knexProps) as Config;

const initService = new InitService();

const express = new AppConfig(env.nodeEnv, env.corsOptions, logger).express;
const server = new ServerController(express, env, initService);

const database = new DatabaseService(knexfile);
const cache = new CacheService(env.cache);

export const app = new App(server);
