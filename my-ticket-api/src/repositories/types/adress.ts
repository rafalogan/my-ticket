export interface IAddress {
	zipCode: string;
	street: string;
	number?: string;
	complement?: string;
	district: string;
	city: string;
	state: string;
	urlMaps?: string;
}
