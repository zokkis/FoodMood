import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { User } from 'src/app/models/user';
import { InfoControllerService } from 'src/app/services/infoController/info-controller.service';
import { RestConnectorService } from 'src/app/services/restConnector/rest-connector.service';

@Component({
	selector: 'login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	constructor(
		private http: RestConnectorService,
		private router: Router,
		private route: ActivatedRoute,
		private infoCtrl: InfoControllerService,
		private fingerprint: FingerprintAIO,
	) {
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe(() => {
			const user = this.router.getCurrentNavigation()?.extras?.state?.user;
			user ? setTimeout(() => this.setFormAndLogin(user), 250) : this.searchForSecret();
		});

		if (!sessionStorage.getItem('firstLogin')) {
			sessionStorage.setItem('firstLogin', 'false');
			this.http.get('info')
				.then(data => {
					if (data.isDev) {
						this.infoCtrl.showSimpleAlert('!ACHTUNG! - DEV-MODE\n\nDer Server ist im Test-Modus gestartet! \nAlle Daten die gespeichert werden könnten ohne Grund beim nächsten mal einfach weg sein! \nZudem sind Fehler aller Art nicht auszuschließen!')
					}
				});
		}
	}

	login(formValue: User): void {
		this.infoCtrl.enableLoadingAnimation();

		RestConnectorService.setAuthToHeader(formValue);
		this.http.post('login', formValue)
			.then(() => {
				this.infoCtrl.showSimpleTopToast('Erfolgreich eingeloggt!');
				this.router.navigate(['home'], { replaceUrl: true });
			})
			.catch(err => {
				console.error(err);
				this.infoCtrl.showSimpleTopToast('Bitte überprüfen sie ihre Daten!');
			})
			.finally(() => this.infoCtrl.disableLoadingAnimation());
	}

	private searchForSecret(): void {
		this.fingerprint.loadBiometricSecret({})
			.then(data => this.setFormAndLogin(JSON.parse(data)))
			.catch(err => {
				if (err.code === this.fingerprint.BIOMETRIC_AUTHENTICATION_FAILED) {
					this.searchForSecret();
				} else {
					console.error(err);
				}
			});
	}

	private setFormAndLogin(data: User): void {
		document.getElementsByName('username')[0]['value'] = data.username;
		document.getElementsByName('password')[0]['value'] = data.password;
		this.login(data);
	}
}
