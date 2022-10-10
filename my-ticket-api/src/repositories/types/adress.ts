export interface IAddress {
	id?: number;
	main: boolean;
	zipCode: string;
	street: string;
	number?: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	urlMaps?: string;
	placeId?: number;
	userId?: number;
}
