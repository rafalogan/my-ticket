import { ITicketModel, TicketDuration, TicketEvent, TicketPlace } from 'src/repositories/types';
import { convertToDate } from 'src/utils';

export class TicketModel {
	id?: number;
	amount: number;
	unitaryValue: number;
	event: TicketEvent;
	place: TicketPlace;
	duration: TicketDuration;

	constructor(data: ITicketModel, id?: number) {
		this.id = Number(id || data.id);
		this.amount = Number(data.amount);
		this.unitaryValue = Number(data.unitaryValue);
		this.event = this.setTicketEvent(data);
		this.place = this.setTicketPlace(data);
		this.duration = this.setTicketDuration(data);
	}

	private setTicketEvent(data: ITicketModel): TicketEvent {
		const id = Number(data.eventId);
		const title = data.eventTitle;
		const subtitle = data.eventSubtitle;
		const content = data.eventContent.toString();

		return { id, title, subtitle, content };
	}

	private setTicketPlace(data: ITicketModel): TicketPlace {
		const id = Number(data.placeId);
		const name = data.placeName;
		const description = data.placeDescription.toString();

		return { id, name, description };
	}

	private setTicketDuration(data: ITicketModel): TicketDuration {
		const id = Number(data.durationId);
		const start = convertToDate(data.durationStart);
		const end = convertToDate(data.durationEnd);

		return { id, start, end };
	}
}
