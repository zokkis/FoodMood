import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
	providedIn: 'root'
})
export abstract class AbstractRestConnectorService {

	private readonly baseUrl: string = 'https://foodmood.ddns.net/';

	private static httpOptions = { headers: {} };

	protected constructor(
		protected http: HttpClient,
	) {
	}

	protected get<T>(urlExtenstion: string, mapper?: (data: T) => T): Promise<T> {
		return new Promise((resolve, reject) => {
			this.http.get<T>(this.getFullUrl(urlExtenstion), AbstractRestConnectorService.httpOptions)
				.subscribe(
					response => resolve(mapper ? mapper(response) : response),
					err => reject(err)
				);
		});
	}

	protected post<T>(urlExtenstion: string, data: T): Promise<T> {
		return new Promise((resolve, reject) => {
			this.http.post<T>(this.getFullUrl(urlExtenstion), data, AbstractRestConnectorService.httpOptions)
				.subscribe(
					response => resolve(response),
					err => reject(err)
				);
		});
	}

	protected put<T>(urlExtenstion: string, data: any): Promise<T> {
		return new Promise((resolve, reject) => {
			this.http.post<T>(this.getFullUrl(urlExtenstion), data, AbstractRestConnectorService.httpOptions)
				.subscribe(
					response => resolve(response),
					err => reject(err)
				);
		});
	}

	protected delete<T>(urlExtenstion: string): Promise<T> {
		return new Promise((resolve, reject) => {
			this.http.post<T>(this.getFullUrl(urlExtenstion), AbstractRestConnectorService.httpOptions)
				.subscribe(
					response => resolve(response),
					err => reject(err)
				);
		});
	}

	protected static setAuthToHeader(auth: User) {
		AbstractRestConnectorService.httpOptions.headers = { 'Authorization': 'Basic ' + btoa(auth.username + ':' + auth.password) };
	}

	private getFullUrl(urlExtenstion: string) {
		return this.baseUrl + urlExtenstion;
	}
}

