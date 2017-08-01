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

	constructor(public navCtrl: NavController, private alertCtrl: AlertController, public playersGame: PlayersData) {
		this.players = playersGame.players;		
		this.playersClass = playersGame;	
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
		this.isRenaming = name;
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