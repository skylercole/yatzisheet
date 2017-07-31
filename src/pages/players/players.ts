import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayersBase } from '../../app/playersdata';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-players',
  templateUrl: 'players.html'
})

export class PlayersPage {
	playersInBase;
	playersInBaseClass;
	newPlayerName: string;
	isRenaming: string;

	constructor(public navCtrl: NavController, private alertCtrl: AlertController, public playersBase: PlayersBase) {
		this.playersInBase = playersBase.players;		
		this.playersInBaseClass = playersBase;	
		this.isRenaming = '';
	}	
	
	createPlayer() {
		if (this.newPlayerName == undefined || this.newPlayerName.trim() == '')
			return;
		
		if (this.playersInBaseClass.exists(this.newPlayerName) > -1) {
			let alert = this.alertCtrl.create({
				subTitle: 'Player name already exists',
				buttons: ['Dismiss']
			  });
			alert.present();
			
			return;
		}
		
		this.playersInBaseClass.addNew(this.newPlayerName);
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
				  this.playersInBaseClass.deletePlayer(name);
				}
			  }
			]
		  });
	  alert.present();
	}
	
	renamePlayer(name) {
		this.isRenaming = name;
	}
	
	onRename(data, name){
		if (data == undefined || data.trim() == '')
			return;		
		
		if (this.playersInBaseClass.exists(data) > -1) {
			let alert = this.alertCtrl.create({
				subTitle: 'Player name already exists',
				buttons: ['Dismiss']
			  });
			alert.present();
			
			return;
		}
		
		this.playersInBaseClass.renamePlayer(name, data);
		this.isRenaming = '';
	}
}