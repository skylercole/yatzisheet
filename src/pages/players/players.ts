import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayersData } from '../../app/playersdata';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-players',
  templateUrl: 'players.html'
})

export class PlayersPage {
	players;
	playersClass;
	newPlayerName: string;
	isRenaming: string;
	copyName: string;

	constructor(public navCtrl: NavController, private alertCtrl: AlertController, public playersData: PlayersData) {
		// Attempt to load data if players array is empty.
		if (playersData.players.length == 0)
			this.playersData.load();
		
		this.players = playersData.players;		
		this.playersClass = playersData;	
		this.isRenaming = '';
	}	
	
	createPlayer() {
		if (this.newPlayerName == undefined || this.newPlayerName.trim() == '')
			return;
		
		if (this.playersClass.exists(this.newPlayerName) > -1) {
			let alert = this.alertCtrl.create({
				subTitle: 'Player name already exists',
				buttons: ['Dismiss']
			  });
			alert.present();
			
			return;
		}
		
		this.playersClass.add(this.newPlayerName, false);
		this.newPlayerName = '';
	}
	
	deletePlayer(name) {
		let alert = this.alertCtrl.create({
			title: 'Confirm permanent delete',
			message: 'Do you want to delete player ' + name + ' permanently?',
			buttons: [
			  {
				text: 'Cancel',
				role: 'cancel',
				handler: () => { }
			  },
			  {
				text: 'Delete',
				handler: () => {
				  this.playersClass.deletePlayer(name);
				}
			  }
			]
		  });
	  alert.present();
	}
	
	renamePlayer(name) {
		this.copyName = this.isRenaming = name;
	}
	
	onRename(data, name){
		if (data == undefined || data.trim() == '')
			return;		
		
		if (this.playersClass.exists(data) > -1) {
			let alert = this.alertCtrl.create({
				subTitle: 'Player name already exists',
				buttons: ['Dismiss']
			  });
			alert.present();
			
			return;
		}
		
		this.playersClass.renamePlayer(name, data);
		this.isRenaming = '';
	}
}