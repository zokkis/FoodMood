import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { User } from 'src/app/models/user';
import { InfoControllerService } from 'src/app/services/infoController/info-controller.service';
import { RestConnectorService } from 'src/app/services/restConnector/rest-connector.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
	selector: 'register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

	@ViewChild('tooltip') tooltip: MatTooltip;

	constructor(
		private infoCtrl: InfoControllerService,
		private router: Router,
		private http: RestConnectorService,
		private fingerprint: FingerprintAIO,
	) {
	}

	register(formValue: User): void {
		this.infoCtrl.enableLoadingAnimation();

		this.http.post('register', formValue)
			.then(() => {
				this.saveSecret(formValue);
				this.infoCtrl.showSimpleTopToast('Erfolgreich registriert!', 1000);
			})
			.catch(err => {
				console.error(err);
				this.infoCtrl.showSimpleTopToast('Es scheint ein Fehler aufgetreten zu sein!');
			})
			.finally(() => {
				this.router.navigate(['login'], { state: { user: formValue } });
				this.infoCtrl.disableLoadingAnimation();
			});
	}

	private async saveSecret(formValue: User): Promise<void> {
		await this.fingerprint.registerBiometricSecret({ secret: JSON.stringify(formValue) })
			.catch(err => {
				if (err.code === this.fingerprint.BIOMETRIC_AUTHENTICATION_FAILED) {
					this.saveSecret(formValue);
				} else {
					console.error(err);
				}
			})
	}
}
