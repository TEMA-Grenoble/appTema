import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	constructor(
		public AfDB: AngularFireDatabase
	) {}
	
	add() {
		this.AfDB.list('User/').push({
			pseudo: 'drissas'
		});
	}
}