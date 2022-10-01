import { RedisClientType } from 'redis';
import isEmpty from 'is-empty';
import md5 from 'md5';

import { onError, onInfo, onLog, onWarn } from 'src/core/handlers';
import { promisify } from 'util';
import { convertToJson, existsOrError, stringify } from 'src/utils';
import { CacheBaseServiceOptions } from 'src/repositories/types';

export abstract class CacheBaseService {
	private readonly getAsync: (key: any) => Promise<any>;
	private setAsync: (key: any, parseData: string, ex: string, parseTime: number) => Promise<any>;
	private delAsync: (key: any) => Promise<any>;

	protected activeCache: boolean;
	protected defaultTime: number;
	private readonly client: RedisClientType;
	private readonly isValidEnv: boolean;

	protected constructor(data: CacheBaseServiceOptions) {
		this.activeCache = data?.active ?? false;
		this.client = data.client;
		this.isValidEnv = data.nodeEnv !== 'production';
		this.defaultTime = data?.time ?? 5;

		this.getAsync = promisify(this.client.get).bind(this.client);
		this.setAsync = promisify(this.client.set).bind(this.client);
		this.delAsync = promisify(this.client.del).bind(this.client);
	}

	async findCache(args: string[], fn: () => Promise<any>, time?: number | undefined) {
		const key = this.generateKey(args);

		if (!this.activeCache) return await fn();

		try {
			onInfo(`Search cache ${key}, waiting...`);
			const data = await this.getAsync(key);

			if (!data || isEmpty(data)) return this.createCache(key as string, fn, time);
			return convertToJson(data);
		} catch (err) {
			onError(`Find cache ${key} is failed`, __filename, err);
		}
	}

	async deleteCache(args: string[]) {
		if (!this.activeCache) return onInfo('Cache server disable');

		const key = this.generateKey(args);
		const data = await this.getAsync(key);

		try {
			existsOrError(data, `Cache key ${key} is not exists.`);
		} catch (msg) {
			return onWarn(msg);
		}

		return this.delAsync(key)
			.then(() => onInfo(`Cache key ${key} is deleted with success.`))
			.catch(err => onError(`Delete cache ${key} failed`, 'error', err));
	}

	private generateKey(ags: string[]) {
		try {
			existsOrError(ags, 'To generate the data key, the arguments must be filled in correctly');
			return md5(ags.join('-'));
		} catch (msg) {
			return onError(msg);
		}
	}

	private setCache(key: string, data: any, time?: number) {
		const convertTime = this.isValidEnv ? 10 : 60;
		const defaultTime = time ? time * convertTime : this.defaultTime * convertTime;
		const dataToString = stringify(data);

		return this.setAsync(key, dataToString, 'EX', defaultTime)
			.then(() => onLog(`Cache ${key}, created with success!`, 'info'))
			.catch(err => onError(`Create cache failed`, __filename, err));
	}

	private async createCache(key: string, fn: () => Promise<any>, time?: number) {
		const data = await fn();

		if (data) await this.setCache(key, data, time);
		return data;
	}
}
