import { Injectable } from '@angular/core';
import { ToastController, PopoverController, LoadingController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class InfoControllerService {

	private loading: HTMLIonLoadingElement;

	constructor(
		private toastCtrl: ToastController,
		private popoverCtrl: PopoverController,
		private loadingCtrl: LoadingController,
	) {
		this.createLoading();
	}

	public showSimpleTopToast(message: string, duration: number = 2000): void {
		this.toastCtrl.create({
			message: message,
			position: 'top',
			duration: duration
		})
			.then(toast => toast.present());
	}

	public showSimplePopover(component): void {
		this.popoverCtrl.create({
			component: component
		})
			.then(popover => popover.present());
	}

	public enableLoadingAnimation(message: string = 'Warten auf Server!'): void {
		this.loading.message = message;
		this.loading.present();
	}

	public disableLoadingAnimation(): void {
		this.loading.remove();
		this.createLoading();
	}

	private createLoading(): void {
		this.loadingCtrl.create({
			message: this.loading?.message ?? 'DEFAULT MESSAGE',
		})
			.then(load => this.loading = load);
	}
}
