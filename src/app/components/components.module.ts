import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';

const PAGES = [
	MenuComponent,
	HeaderComponent,
]

@NgModule({
	declarations: PAGES,
	exports: PAGES,
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
	]
})
export class ComponentsModule { }
