import nodemailer from 'nodemailer';

import { MailerConfig } from 'src/config';
import { onLog } from 'src/core/handlers';
import { SendEmailOptions } from 'src/repositories/types';
import { ResponseException } from 'src/utils';

export class MailService {
	constructor(private config: MailerConfig) {}

	send(options: SendEmailOptions) {
		const mailOptions = {
			from: 'no-replay@my-ticket.com',
			to: options.to,
			subject: options.subject,
			html: options.message,
		};

		const transporter = nodemailer.createTransport({
			host: this.config.host || undefined,
			port: this.config.port || undefined,
			service: this.config.service,
			secure: false,
			auth: {
				user: this.config.user,
				pass: this.config.password,
			},
			tls: { rejectUnauthorized: false },
		});

		onLog('mail options', mailOptions);

		return transporter.sendMail(mailOptions, (err, info) =>
			err ? new ResponseException('Error on send e-mail', err) : { message: 'e-mail enviado com sucesso!', info }
		);
	}
}
