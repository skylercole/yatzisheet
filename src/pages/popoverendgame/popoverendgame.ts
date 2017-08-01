import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { PlayersData } from '../../app/playersdata';

@Component({
	templateUrl: 'popoverendgame.html'
})

export class PopoverEndGamePage {
	players;
	
	constructor(public viewCtrl: ViewController, public playersData: PlayersData) {
		this.players = playersData.players.filter(item => item.isInGame);
	}

	close() {
		this.viewCtrl.dismiss();
	}
}