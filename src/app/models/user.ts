import { Permissions } from 'src/app/models/permissions';

export interface User {
	userId: number;
	username: string;
	password?: string;
	permissions: Permissions[];
	favorites?: number[];
}

let user: User;
export const getUser = () => user;
export const setUser = (newUser: User) => {
	delete newUser.password;
	user = newUser;
};
