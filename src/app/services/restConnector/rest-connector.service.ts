import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractRestConnectorService } from './abstract-rest-connector.service';
import { ServerInfo } from 'src/app/models/server-info';
import { User } from 'src/app/models/user';

@Injectable({
	providedIn: 'root'
})
export class RestConnectorService extends AbstractRestConnectorService {

	constructor(
		protected http: HttpClient,
	) {
		super(http);
	}

	public getServerInfo(): Promise<ServerInfo> {
		return this.get<ServerInfo>('info');
	}

	public login(user: User): Promise<User> {
		AbstractRestConnectorService.setAuthToHeader(user);
		return this.get<User>('login',
			data => {
				data.permissions = data.permissions.map(perm => perm.id ? perm : { id: Number(perm) });
				return data;
			});
	}

	public register(user: User): Promise<User> {
		return this.post<User>('register', user);
	}

	public changeUsername(newUsername: string): Promise<unknown> {
		return this.put('changeusername', newUsername);
	}

}
