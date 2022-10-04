import { Knex } from 'knex';
import Config = Knex.Config;

import { execDotenv, getKnexProps } from 'src/utils';
import { AppConfig, AuthConfig, Environment, KnexConfig, LoggerConfig } from 'src/config';
import { App, ServerController } from 'src/core/controllers';
import { InitService } from './services';
import { CacheService, DatabaseService } from 'src/core/service';
import { ServicesFactory } from 'src/core/factories/services.factory';

execDotenv();

export const env = new Environment();
const knexProps = getKnexProps(env);

export const logger = new LoggerConfig(env.nodeEnv).logger;
export const knexfile = new KnexConfig(knexProps) as Config;

const database = new DatabaseService(knexfile);
const cache = new CacheService(env.cache);
const services = new ServicesFactory(env, database.connection, cache.connection);

const auth = new AuthConfig(env.security.authsecret, services.userService);

const express = new AppConfig(env.nodeEnv, env.corsOptions, logger, auth, services).express;
const server = new ServerController(express, env, services.initService);

export const app = new App(server, database, cache);
