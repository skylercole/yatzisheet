import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { PlayersBase } from '../../app/playersdata';
import { PlayersData } from '../../app/playersdata';
import { AlertController } from 'ionic-angular';

@Component({
	templateUrl: 'popover.html'
})

export class PopoverPage {
	playersInGame;
	playersInGameClass;
	playersInBase;
	playersInBaseClass;
	
	newPlayerName: string;
	
	constructor(public viewCtrl: ViewController, private alertCtrl: AlertController, public playersBase: PlayersBase, public playersData: PlayersData) {
		this.playersInBase = playersBase.players;
		this.playersInGame = playersData.players;
		
		this.playersInBaseClass = playersBase;		
		this.playersInGameClass = playersData;
	}

	close() {
		this.viewCtrl.dismiss();
	}
	
	toGame(name, isInGame) {
		this.playersInGameClass.addNew(name, isInGame);
	}

	createPlayer() {
		if (this.newPlayerName == undefined || this.newPlayerName == '')
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
		this.playersInGameClass.addNew(this.newPlayerName, true);
		
		this.newPlayerName = '';
	}
}