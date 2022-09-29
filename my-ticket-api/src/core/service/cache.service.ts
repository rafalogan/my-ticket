import { createClient, RedisClientType } from 'redis';

import { ICache } from 'src/repositories/types';
import { onError, onInfo } from 'src/core/handlers';

export class CacheConnectionController {
	private readonly _connection: RedisClientType;
	connectonUp = false;

	constructor(private cacheEnv: ICache) {
		const url = `redis://${this.cacheEnv.host}:${this.cacheEnv.port}`;

		this._connection = createClient({ url });
	}

	get connection() {
		return this._connection;
	}

	isConnect() {
		if (!this.cacheEnv.enable) return onInfo('Cache is disabled');

		return this.connection
			.on('connect', () => this.onConnect())
			.on('ready', () => this.onReady())
			.on('error', (error: any) => this.onCacheError(error));
	}

	disconnect() {
		if (this.connection) return this.connection.quit();
	}

	private onConnect() {
		return onInfo('SUCCESS: Cache(Redis) is connected');
	}

	private onReady() {
		this.connectonUp = true;
		return onInfo('ONLINE: Cache Redis...');
	}

	private onCacheError(error?: any) {
		return onError('FAILED: Cache Redis is not connected', error);
	}
}
