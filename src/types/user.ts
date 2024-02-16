import { Role } from "./role";

export interface IUser {
	name: string;
	email: string;
	password: string;
	role: Role;
}