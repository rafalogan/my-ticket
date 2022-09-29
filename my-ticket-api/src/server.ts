import { Knex } from 'knex';
import Config = Knex.Config;

import { execDotenv } from 'src/utils';
import { AppConfig, Environment, KnexConfig, LoggerConfig } from 'src/config';
import { App, ServerController } from 'src/core/controllers';
import { InitService } from './services';
import { DatabaseService } from 'src/core/service';

execDotenv();

export const env = new Environment();
const { client, host, database, password, port, user } = env.database;
const connection = { database, host, user, password, port };
const knexProps = { client, connection, useNullAsDefault: true };

export const logger = new LoggerConfig(env.nodeEnv).logger;
export const knexfile = new KnexConfig(knexProps) as Config;

const initService = new InitService();

const express = new AppConfig(env.nodeEnv, env.corsOptions, logger).express;
const server = new ServerController(express, env, initService);

// const databaseService = new DatabaseService();

export const app = new App(server);
