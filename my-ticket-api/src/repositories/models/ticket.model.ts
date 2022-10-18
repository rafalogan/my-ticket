import { ITheater, ITicketModel, TicketDuration, TicketEvent, TicketPlace, TicketTheater } from 'src/repositories/types';
import { convertToDate } from 'src/utils';

export class TicketModel {
	id?: number;
	amount: number;
	unitaryValue: number;
	event: TicketEvent;
	place: TicketPlace;
	theater: TicketTheater;
	duration: TicketDuration;

	constructor(data: ITicketModel, id?: number) {
		this.id = Number(id || data.id);
		this.amount = Number(data.amount);
		this.unitaryValue = Number(data.unitaryValue);
		this.event = this.setTicketEvent(data);
		this.place = this.setTicketPlace(data);
		this.theater = this.setTicketTheater(data);
		this.duration = this.setTicketDuration(data);
	}

	private setTicketEvent(data: ITicketModel): TicketEvent {
		const id = Number(data.eventId);
		const title = data.eventTitle;
		const subtitle = data.eventSubtitle;
		const content = data.eventContent.toString();

		return { id, title, subtitle, content };
	}

	private setTicketPlace = (data: ITicketModel): TicketPlace => ({
		id: Number(data.placeId),
		name: data.placeName,
		description: data.placeDescription.toString(),
	});

	private setTicketTheater = (data: ITicketModel): TicketTheater => ({
		id: Number(data.theaterId),
		name: data.theaterName,
		description: data.theaterDescription.toString(),
	});

	private setTicketDuration = (data: ITicketModel): TicketDuration => ({
		id: Number(data.durationId),
		start: convertToDate(data.durationStart),
		end: convertToDate(data.durationEnd),
	});
}
