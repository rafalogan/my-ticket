export interface IProfile {
	id?: number;
	name: string;
	description: string;
	active: boolean;
}

export interface CustomProfile {
	id?: number;
	name: string;
	description: string;
	active?: boolean;
}
