import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

	public get(urlExtenstion: string): Promise<ArrayBuffer> {
		return this.http.get(this.getFullUrl(urlExtenstion), RestConnectorService.httpOptions).toPromise();
	}

	public post(urlExtenstion: string, data: any): Promise<ArrayBuffer> {
		console.log(RestConnectorService.httpOptions)
		return this.http.post(this.getFullUrl(urlExtenstion), data, RestConnectorService.httpOptions).toPromise();
	}

	public put(urlExtenstion: string, data: any): Promise<ArrayBuffer> {
		return this.http.put(this.getFullUrl(urlExtenstion), data, RestConnectorService.httpOptions).toPromise();
	}

	public delete(urlExtenstion: string): Promise<ArrayBuffer> {
		return this.http.delete(this.getFullUrl(urlExtenstion), RestConnectorService.httpOptions).toPromise();
	}

	public static setAuthToHeader(auth: { username: string, password: string }) {
		RestConnectorService.httpOptions.headers = { 'Authorization': 'Basic ' + btoa(auth.username + ':' + auth.password) };
	}

	private getFullUrl(urlExtenstion: string) {
		return this.baseUrl + urlExtenstion;
	}
}
