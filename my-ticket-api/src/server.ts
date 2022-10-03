import { Knex } from 'knex';
import Config = Knex.Config;

import { execDotenv, getKnexProps } from 'src/utils';
import { AppConfig, AuthConfig, Environment, KnexConfig, LoggerConfig } from 'src/config';
import { App, ServerController } from 'src/core/controllers';
import { InitService, UserService } from './services';
import { CacheService, DatabaseService } from 'src/core/service';

execDotenv();

export const env = new Environment();
const knexProps = getKnexProps(env);

export const logger = new LoggerConfig(env.nodeEnv).logger;
export const knexfile = new KnexConfig(knexProps) as Config;
const auth = new AuthConfig(env.security.authsecret);

const initService = new InitService();
const userService = new UserService({});

const express = new AppConfig(env.nodeEnv, env.corsOptions, logger).express;
const server = new ServerController(express, env, initService);

const database = new DatabaseService(knexfile);
const cache = new CacheService(env.cache);

export const app = new App(server, database, cache);
