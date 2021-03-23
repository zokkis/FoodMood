import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class RestConnectorService {

	private readonly baseUrl: string = 'https://foodmood.ddns.net/';

	private static httpOptions: any = {
		responseType: 'text',
	};

	constructor(
		private http: HttpClient,
	) {
	}

	public get(urlExtenstion: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(this.getFullUrl(urlExtenstion), RestConnectorService.httpOptions)
				.subscribe(data => this.parser(resolve, reject, data));
		});
	}

	public post(urlExtenstion: string, data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.post(this.getFullUrl(urlExtenstion), data, RestConnectorService.httpOptions)
				.subscribe(data => this.parser(resolve, reject, data));
		});
	}

	public put(urlExtenstion: string, data: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.post(this.getFullUrl(urlExtenstion), data, RestConnectorService.httpOptions)
				.subscribe(data => this.parser(resolve, reject, data));
		});
	}

	public delete(urlExtenstion: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.post(this.getFullUrl(urlExtenstion), RestConnectorService.httpOptions)
				.subscribe(data => this.parser(resolve, reject, data));
		});
	}

	public static setAuthToHeader(auth: { username: string, password: string }) {
		RestConnectorService.httpOptions.headers = { 'Authorization': 'Basic ' + btoa(auth.username + ':' + auth.password) };
	}

	private parser(resolve, reject, data) {
		try {
			resolve(JSON.parse(new String(data || '[]').toString()))
		} catch (err) {
			console.error(err);
			reject(err);
		}
	}

	private getFullUrl(urlExtenstion: string) {
		return this.baseUrl + urlExtenstion;
	}
}
