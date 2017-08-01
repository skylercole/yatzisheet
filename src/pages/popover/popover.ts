import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { PlayersData } from '../../app/playersdata';
import { AlertController } from 'ionic-angular';

@Component({
	templateUrl: 'popover.html'
})

export class PopoverPage {
	players;
	playersClass;
	
	newPlayerName: string;
	
	constructor(public viewCtrl: ViewController, private alertCtrl: AlertController, public playersData: PlayersData) {
		this.players = playersData.players;
		this.playersClass = playersData;		
	}

	close() {
		this.viewCtrl.dismiss();
	}
	
	toGame(name, isInGame) {
		var index = this.playersClass.exists(name);
		this.players[index].isInGame = isInGame;
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
		
		this.playersClass.add(this.newPlayerName, true);
		
		this.newPlayerName = '';
	}
	
	reorderPlayers(indexes) {
		let element = this.players[indexes.from];
		this.players.splice(indexes.from, 1);
		this.players.splice(indexes.to, 0, element);
		this.playersClass.save();
	  }
}