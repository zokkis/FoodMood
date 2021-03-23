export interface ServerInfo {
	isOnline: boolean;
	version?: string;
	isDev?: boolean;
}

let info: ServerInfo;
export const getInfo = () => info;
export const setInfo = (newInfo: ServerInfo) => info = newInfo;