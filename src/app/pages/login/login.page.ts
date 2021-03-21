import { Component } from '@angular/core';
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
export class LoginPage {

	constructor(
		private http: RestConnectorService,
		private router: Router,
		private route: ActivatedRoute,
		private infoCtrl: InfoControllerService,
		private fingerprint: FingerprintAIO,
	) {

		this.route.queryParams.subscribe(() => {
			const user = this.router.getCurrentNavigation()?.extras?.state?.user;
			user ? this.setFormAndLogin(user) : this.searchForSecret();
		});
	}

	login(formValue: User) {
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

	private searchForSecret() {
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

	private setFormAndLogin(data: User) {
		document.getElementsByName('username')[0]['value'] = data.username;
		document.getElementsByName('password')[0]['value'] = data.password;
		//this.login(data);
	}
}
