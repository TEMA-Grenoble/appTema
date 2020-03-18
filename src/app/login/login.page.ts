import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	constructor(
		public AfDB: AngularFireDatabase
	) { }

	add() {
		this.AfDB.list('User/').push({
			pseudo: 'okboomer'
		});
		console.log("fdp");
		}

	ngOnInit() {
	}

}
