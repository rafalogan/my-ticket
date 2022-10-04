import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { User } from 'src/repositories/entities';
import { AuthService } from 'src/services';
import { onLog, ResponseHandle } from 'src/core/handlers';
import { messages } from 'src/utils';

export class AuthController {
	constructor(private authService: AuthService) {}

	async signing(req: Request, res: Response) {
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
		const user = new User(req.body);

		this.authService
			.signupOnApp(user)
			.then(data => ResponseHandle.onSuccess({ res, data, message: messages.auth.success.signup }))
			.catch(err => ResponseHandle.onError({ res, message: err.message, err, status: httpStatus.UNAUTHORIZED }));
	}

	validateToken(req: Request, res: Response) {
		this.authService
			.tokenIsValid(req)
			.then(result => ResponseHandle.onSuccess({ res, data: result, message: result.message, status: result.status }))
			.catch(err => ResponseHandle.onError({ res, message: err.message, err, status: httpStatus.UNAUTHORIZED }));
	}
}
