import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFireDatabase } from '@angular/fire/database';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

		// Declaration :
	
	dataUser = {
		email: '',
		password: ''
	};
	connected: boolean;

	userId: string;
	mail: string;
	method: any;

	constructor(
		//public toastController: ToastController,
		//public afDB: AngularFireDatabase,
		public afAuth: AngularFireAuth
	) { 
		this.afAuth.authState.subscribe(auth => {
			if (!auth) {
				console.log('non connecté');
				this.connected = false;
			} else {
				console.log('connecté: ' + auth.uid);
				this.connected = true;
				this.userId = auth.uid;
				this.mail = auth.email;
				this.method = auth.providerData[0].providerId;
			}
		});
	}

	ngOnInit() {
	}

		// Connection

	login() {
		this.afAuth.auth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
		 this.dataUser = {
		   email: '',
		   password: ''
		 };
	}

		// Inscription

	signUp() {
		this.afAuth.auth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
		this.dataUser = {
		  email: '',
		  password: ''
		};
	}

	// Deconnection

	logout() {
		this.afAuth.auth.signOut();
	}
	
}
