import { Component } from '@angular/core';
import { 
	ActionSheetController,
	Platform,
	AlertController
} from '@ionic/angular';

import {
	GoogleMaps,
	GoogleMap,
	GoogleMapsMapTypeId,
	GoogleMapsEvent,
	GoogleMapOptions,
	CameraPosition,
	MarkerOptions,
	Marker,
	Environment
} from '@ionic-native/google-maps';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
	map: GoogleMap;

	constructor(
		public alertController: AlertController,
		public actionCtrl: ActionSheetController,
		private platform: Platform
		
	) {
		if (this.platform.is('cordova')) {
			this.loadMap();
		}
	}

	loadMap() {
		Environment.setEnv({
			API_KEY_FOR_BROWSER_RELEASE: 'YOUR API KEY',
			API_KEY_FOR_BROWSER_DEBUG: 'YOU API KEY',
		});
		this.map = GoogleMaps.create('map_canvas', {
			camera: {
				target: {
					lat: 45.1853683,
					lng: 5.7369379
				},
				zoom: 12,
				tilt: 30
			}	
		});
	}

	async mapOptions() {
		const actionSheet = await this.actionCtrl.create({
		  buttons: [{
			text: 'Satellite View',
			handler: () => {
			  console.log('Satellite clicked');
			  this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
			}
		  }, {
			text: 'Plan View',
			handler: () => {
			  console.log('Plan clicked');
			  this.map.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
			}
		  }, {
			text: 'Cancel',
			role: 'cancel',
			handler: () => {
			  console.log('Cancel clicked');
			}
		  }]
		});
		await actionSheet.present();
	}

	async addMarker() {
		const alert = await this.alertController.create({
		  header: 'Add place',
		  inputs: [
			{
			  name: 'title',
			  type: 'text',
			  placeholder: 'Title'
			}
		  ],
		  buttons: [
			{
			  text: 'Cancel',
			  role: 'cancel',
			  cssClass: 'secondary',
			  handler: () => {
				console.log('Confirm Cancel');
			  }
			}, {
			  text: 'Add',
			  handler: data => {
				console.log('Title: ' + data.title);
				this.placeMarker(data.title);
			  }
			}
		  ]
		});
		await alert.present();
	}

	placeMarker(markerTitle: string) {
		const marker: Marker = this.map.addMarkerSync({
			title: markerTitle,
			icon: 'red',
			animation: 'DROP',
			position: this.map.getCameraPosition().target
		});
	}

}
