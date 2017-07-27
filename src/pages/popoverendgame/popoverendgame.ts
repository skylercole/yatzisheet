import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { PlayersData } from '../../app/playersdata';

@Component({
	templateUrl: 'popoverendgame.html'
})

export class PopoverEndGamePage {
	playersInGame;
	
	constructor(public viewCtrl: ViewController, public playersData: PlayersData) {
		this.playersInGame = playersData.players;
	}

	close() {
		this.viewCtrl.dismiss();
	}
}