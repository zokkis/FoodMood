export interface User {
	username: string;
	password: string;
	permissions?: any; //@FIXME implement permissions (enum?)
}
