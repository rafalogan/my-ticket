export const userFields = [
	'id',
	'first_name as firstName',
	'last_name as lastName',
	'cpf',
	'email',
	'password',
	'profile_id as profileId',
	'deleted_at as deletedAt',
];

export const profileFields = ['id', 'name', 'description', 'active'];

export const categoryFields = ['id', 'name', 'description', 'url', 'status', 'parent_id as parentId', 'user_id as userId'];

export const eventFields = ['id', 'title', 'subtitle', 'content', 'type', 'category_id as categoryId', 'user_id as userId'];

export const placeFields = ['id', 'name', 'description', 'user_id as  userId'];

export const addressFields = [
	'id',
	'main',
	'zip_code as zipCode',
	'street',
	'number',
	'complement',
	'district',
	'city',
	'state',
	'url_maps as  urlMaps',
	'place_id as placeId',
	'user_id as userId',
];

export const phoneFields = ['id', 'type', 'number', 'user_id as userId', 'place_id as placeId'];

export const theaterFields = ['id', 'name', 'description', 'place_id as placeId'];

export const capacityFields = ['id', 'section', 'row', 'places', 'theater_id as theaterId'];

export const durationFields = ['id', 'start', 'end', 'theater_id as theaterId'];

export const ticketFields = [
	'id',
	'amount',
	'unitary_value as unitaryValue',
	'event_id as eventId',
	'place_id as placeId',
	'theater_id as theaterId',
	'duration_id as durationId',
];

export const ticketOtherTableFields = {
	event: { eventTitle: 'e.title', eventSubtitle: 'e.subtitle', eventContent: 'e.content', eventType: 'e.type' },
	place: { placeName: 'p.name', placeDescription: 'p.description' },
	theater: { theaterName: 'th.name', theaterDescription: 'th.description' },
	duration: { durationStart: 'd.start', durationEnd: 'd.end' },
};

export const fileFields = ['id', 'title', 'alt', 'name', 'type', 'url', 'event_id as eventId', 'category_id as categoryId'];
