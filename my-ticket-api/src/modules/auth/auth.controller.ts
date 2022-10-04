import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { AuthService } from 'src/services';
import { onLog, ResponseHandle } from 'src/core/handlers';
import { messages, ResponseException } from 'src/utils';

export class AuthController {
	constructor(private authService: AuthService) {}

	async signin(req: Request, res: Response) {
		try {
			this.authService.validateCredentials(req.body);
		} catch (err: any) {
			return ResponseHandle.onError({ res, message: err.message, err, status: httpStatus.BAD_REQUEST });
		}

		const auth = this.authService.setCredentials(req.body);
		onLog('Auth', auth);

		this.authService
			.verifyCredentials(auth)
			.then(data => ResponseHandle.onSuccess({ res, data }))
			.catch((err: Error) =>
				ResponseHandle.onError({
					res,
					message: messages.auth.error.Unauthorized,
					err,
					status: httpStatus.UNAUTHORIZED,
				})
			);
	}

	async signup(req: Request, res: Response) {
		const profile = req.query.profile as string;
		this.authService
			.signupOnApp(req.body, profile)
			.then(data => {
				return data instanceof ResponseException
					? ResponseHandle.onError({ res, message: data.message, err: data, status: httpStatus.INTERNAL_SERVER_ERROR })
					: ResponseHandle.onSuccess({ res, data, message: messages.auth.success.signup });
			})
			.catch(err => ResponseHandle.onError({ res, message: err.message, err, status: httpStatus.UNAUTHORIZED }));
	}

	validateToken(req: Request, res: Response) {
		this.authService
			.tokenIsValid(req)
			.then(result => ResponseHandle.onSuccess({ res, data: result }))
			.catch(err => ResponseHandle.onError({ res, message: err.message, err, status: httpStatus.UNAUTHORIZED }));
	}
}
